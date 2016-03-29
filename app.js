var app = angular.module('app', [])

app.factory('GithubSvc', function ($http) {
  return {
    fetchUsers: function () {
      return $http.get('https://api.github.com/users?since=4298694')
    }   
  }
})

app.controller('GithubCtrl', function($scope, GithubSvc) {
  GithubSvc.fetchUsers().success(function (users) {
    $scope.users = users
  })
})
