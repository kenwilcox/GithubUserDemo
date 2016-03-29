angular.module('app')
.factory('GithubSvc', function ($http) {
  return {
    fetchUsers: function () {
      return $http.get('https://api.github.com/users?since=4298694')
    }   
  }
})