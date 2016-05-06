angular.module('app')
.factory('GithubSvc', function ($http) {
  return {
    fetchUserData: function (githubUsername) {
      return $http.get('https://api.github.com/users/' + githubUsername);
    },
    fetchRepoData: function (repos_url, per_page, page) {
        return $http.get(repos_url + '?per_page='+per_page + '&page='+ page);
    },
    fetchJson: function (url) {
        return $http.get(url);
    }
  };
});