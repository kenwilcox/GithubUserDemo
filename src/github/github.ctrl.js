angular.module('app')
.controller('GithubCtrl', function($scope, GithubSvc, StorageSvc) {
    $scope.userData = {};
    $scope.repos = [];
    $scope.username = "kenwilcox";
    $scope.perPage = 100;    
    $scope.useCache = true;
    
    $scope.getRepoData = function() {
        $scope.repos = [];
        if ($scope.useCache) {
            console.log("getting cache");
            $scope.repos = StorageSvc.getItem("repos");            
        } else {
            console.log("getting http");
            GithubSvc.fetchUserData($scope.username).success(function (data) {
                $scope.userData = data;
                getRepoPage(data.repos_url, $scope.perPage, 1);
            });
        }
    };
    
    $scope.getLanguageData = function() {        
        $scope.languages = {};
        //$scope.repos.forEach(function(r) {
            //console.log(r.languages_url);
            GithubSvc.fetchJson($scope.repos[0].languages_url).success(function (data) {
                console.log(data);
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
        //});
    };
    
    function getRepoPage(repo_url, per_page, page) {
        GithubSvc.fetchRepoData(repo_url, per_page, page).success(function (repos) {
            repos.forEach(function(r) {
            // create a dictionary of the repo name
            // and the keys fork and language_url
            var repo = {
                name: r.name,
                url: r.url,
                fork: r.fork,
                languages_url: r.languages_url,
                html_url: r.html_url,
                language: r.language,
            };            
            $scope.repos.push(repo);
          });
          
          if (repos.length === per_page) {
              page = page + 1;
              // console.log("getting page " + page)
              getRepoPage(repo_url, per_page, page);
          } else {
              StorageSvc.setItem("repos", $scope.repos);
          }
        });
    }
});
