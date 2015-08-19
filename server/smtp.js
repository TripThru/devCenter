Meteor.startup(function () {
  smtp = {
    username: 'tripthrusignup@gmail.com',
    password: 'optimize1234',
    server:   'smtp.gmail.com',
    port: 25
  };

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

  Accounts.emailTemplates.from = 'TripThru <tripthrusignup@gmail.com>';

  // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
  Accounts.emailTemplates.siteName = 'TripThru';

  // A Function that takes a user object and returns a String for the subject line of the email.
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Registration';
  };

  // A Function that takes a user object and a url, and returns the body text for the email.
  // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
  Accounts.emailTemplates.verifyEmail.html = function(user, url) {
    return '<h3>Thanks for registering, now you can connect using the following credentials:</h3>' +
            '<p>Client id: ' + user.profile.clientId + '</p>' +
            '<p>Client secret: ' + user.profile.clientSecret + '</p>';
  };
  Accounts.config({
    sendVerificationEmail: true
  });
});