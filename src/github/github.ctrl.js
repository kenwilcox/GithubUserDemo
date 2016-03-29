angular.module('app')
.controller('GithubCtrl', function($scope, GithubSvc) {
  GithubSvc.fetchUsers().success(function (users) {
    $scope.users = users
  })
})