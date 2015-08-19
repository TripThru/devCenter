angular
.module("devCenter")
.controller("MainCtrl", ['$scope', '$state', '$rootScope', '$location', '$timeout', '$mdSidenav', '$window', 'menu',
  function($scope, $state, $rootScope, $location, $timeout, $mdSidenav, $window, menu) {
    var self = this;
    document.title = 'TripThru Dev Center';

    $scope.menu = menu;
    $scope.path = path;
    $scope.goHome = goHome;
    $scope.openMenu = openMenu;
    $scope.closeMenu = closeMenu;
    $scope.isSectionSelected = isSectionSelected;

    $rootScope.$on('$locationChangeSuccess', openPage);
    $scope.focusMainContent = focusMainContent;

    //-- Define a fake model for the related page selector
    Object.defineProperty($rootScope, "relatedPage", {
      get: function () { return null; },
      set: angular.noop,
      enumerable: true,
      configurable: true
    });
    $rootScope.redirectToUrl = function (url) {
      $window.location.hash = url;
      $timeout(function () { $rootScope.relatedPage = null; }, 100);
    };

    // Methods used by menuLink and menuToggle directives
    this.isOpen = isOpen;
    this.isSelected = isSelected;
    this.toggleOpen = toggleOpen;
    this.autoFocusContent = false;


    var mainContentArea = document.querySelector("[role='main']");

    // *********************
    // Internal methods
    // *********************

    function closeMenu() {
      $timeout(function() { $mdSidenav('left').close(); });
    }

    function openMenu() {
      $timeout(function() { $mdSidenav('left').open(); });
    }

    function path() {
      return $location.path();
    }

    function goHome($event) {
      menu.selectPage(null, null);
      $location.path( '/' );
    }

    function openPage() {
      $scope.closeMenu();

      if (self.autoFocusContent) {
        focusMainContent();
        self.autoFocusContent = false;
      }
    }

    function focusMainContent($event) {
      // prevent skip link from redirecting
      if ($event) { $event.preventDefault(); }

      $timeout(function(){
        mainContentArea.focus();
      },90);

    }

    function isSelected(page) {
      return menu.isPageSelected(page);
    }

    function isSectionSelected(section) {
      var selected = false;
      var openedSection = menu.openedSection;
      if(openedSection === section){
        selected = true;
      }
      else if(section.children) {
        section.children.forEach(function(childSection) {
          if(childSection === openedSection){
            selected = true;
          }
        });
      }
      return selected;
    }

    function isOpen(section) {
      return menu.isSectionSelected(section);
    }

    function toggleOpen(section) {
      menu.toggleSelectSection(section);
    }

    // First page load
    menu.setToCurrentPath();
  }
]);