var crypto = Npm.require('crypto');
var db = Mysql.createConnection({
  host: 'localhost',
  user: 'vagrant',
  password: 'vagrant',
  database: 'tripthru_v2'
});
db.connect();

var closeAndExit = function() {
  db.destroy();
  process.exit();
};
// Close connections on hot code push
process.on('SIGTERM', closeAndExit);
// Close connections on exit (ctrl + c)
process.on('SIGINT', closeAndExit);

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function createMysqlUserIfNotExists(user) {
  var email = user.emails && user.emails.length > 0 ? user.emails[0].address : null;
  if(email) {
    db.query('SELECT id FROM users WHERE username = ?', [email],
      function(err, res){
        if(res.length === 0) {
          db.query("insert into users (username, role) values (?, 'network')", [user.emails[0].address],
            function(err, res){
              if(res && res.insertId) {
                db.query("insert into clients (user_id, name, client_id, client_secret) values (?, ?, ?, ?)",
                  [res.insertId, email, user.profile.clientId, user.profile.clientSecret]);
              }
            });
        }
      });
  }
}

Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Accounts.onCreateUser(function(options, user){
  if(options.profile) {
    user.profile = options.profile;
    user.profile.clientId = generateToken();
    user.profile.clientSecret = generateToken();
  }
  createMysqlUserIfNotExists(user);
  return user;
});