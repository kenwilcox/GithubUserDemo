angular.module('app')
.controller('GithubCtrl', function($scope, GithubSvc) {
    $scope.userData = {};
    $scope.repos = [];
    $scope.username = "kenwilcox";
    $scope.perPage = 100;    
    
    $scope.getRepoData = function() {
        $scope.repos = [];
        GithubSvc.fetchUserData($scope.username).success(function (data) {
            $scope.userData = data;
            getRepoPage(data.repos_url, $scope.perPage, 1);
        });
    };
    
    $scope.getLanguageData = function() {        
        $scope.languages = {};
        $scope.repos.forEach(function(r) {
            // console.log(r.languages_url);
            GithubSvc.fetchJson(r.languages_url).success(function (data) {
                data.forEach(function (lang) {
                    for(var l in lang) {
                        if ($scope[l] === undefined) {
                            $scope.languages = lang[l];
                        } else {
                            $scope.languages[l] += lang[l];
                        }
                    }
                });
            });
        });
    };
    
    function getRepoPage(repo_url, per_page, page) {
        GithubSvc.fetchRepoData(repo_url, per_page, page).success(function (repos) {
          repos.forEach(function(r) {
              $scope.repos.push(r);
          });
          
          if (repos.length === per_page) {
              page = page + 1;
              // console.log("getting page " + page)
              getRepoPage(repo_url, per_page, page);
          }
        });
    }
});
