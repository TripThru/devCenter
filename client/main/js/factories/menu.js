angular
.module('devCenter')
.factory('menu', [
  '$location',
  '$rootScope',
  '$http',
  '$window',
function($location, $rootScope, $http, $window) {
  var sections = [];

  sections.push(
    {
      name: 'Welcome',
      url: '/',
      type: 'link'
    },
    {
      name: 'Register',
      url: '/register',
      type: 'link'
    },
    {
      name: 'Docs',
      type: 'toggle',
      pages: [
        {
          name: 'Authentication',
          url: '/docs/auth',
          id: 'link'
        },
        {
          name: 'Record roaming request',
          url: '/docs/recordroamingrequest',
          id: 'link'
        }
      ]
    },
    {
      name: 'Demo',
      url: '/docs/demo',
      type: 'link'
    }
  );

  function sortByName(a,b) {
    return a.name < b.name ? -1 : 1;
  }

  var self;

  $rootScope.$on('$locationChangeSuccess', onLocationChange);

  return self = {
    sections: sections,

    selectSection: function(section) {
      self.openedSection = section;
    },
    toggleSelectSection: function(section) {
      self.openedSection = (self.openedSection === section ? null : section);
    },
    isSectionSelected: function(section) {
      return self.openedSection === section;
    },

    selectPage: function(section, page) {
      self.currentSection = section;
      self.currentPage = page;
    },
    isPageSelected: function(page) {
      return self.currentPage === page;
    },
    setToCurrentPath: function() {
      onLocationChange();
    }
  };

  function sortByHumanName(a,b) {
    return (a.humanName < b.humanName) ? -1 :
      (a.humanName > b.humanName) ? 1 : 0;
  }

  function onLocationChange() {
    var path = $location.path();
    var introLink = {
      name: 'Welcome',
      url: '/',
      type: 'link'
    };

    if (path === '/') {
      self.selectSection(introLink);
      self.selectPage(introLink, introLink);
    }

    var matchPage = function(section, page) {
      if (path === page.url) {
        self.selectSection(section);
        self.selectPage(section, page);
      }
    };

    sections.forEach(function(section) {
      if(section.children) {
        // matches nested section toggles, such as API or Customization
        section.children.forEach(function(childSection){
          if(childSection.pages){
            childSection.pages.forEach(function(page){
              matchPage(childSection, page);
            });
          }
        });
      }
      else if(section.pages) {
        // matches top-level section toggles, such as Demos
        section.pages.forEach(function(page) {
          matchPage(section, page);
        });
      }
      else if (section.type === 'link') {
        // matches top-level links, such as "Getting Started"
        matchPage(section, section);
      }
    });
  }
}]);