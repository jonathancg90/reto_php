
(function() {

    function config($routeProvider) {
      $routeProvider
          .when('/', {
            templateUrl: 'static/apps/views/home.html',
          })
          .when('/user', {
            templateUrl: 'static/apps/views/user/list.html',
            controller: 'userCtrl',
            controllerAs: 'list'
          })
          .when('/group', {
            templateUrl: 'static/apps/views/group/list.html',
            controller: 'groupCtrl',
            controllerAs: 'group'
          });
    }


    angular.module('mainApp', [
        'requestApp',
        'ngRoute'
    ])
    .config(config);

})();