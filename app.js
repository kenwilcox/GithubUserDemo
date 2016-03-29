angular.module('app', [])
// This is totally cool!

angular.module('app')
.controller('GithubCtrl', function($scope, GithubSvc) {
  GithubSvc.fetchUsers().success(function (users) {
    $scope.users = users
  })
})
angular.module('app')
.factory('GithubSvc', function ($http) {
  return {
    fetchUsers: function () {
      return $http.get('https://api.github.com/users?since=4298694')
    }   
  }
})