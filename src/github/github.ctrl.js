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
        $scope.languages = StorageSvc.getItem("languages");
        var tmp = StorageSvc.getItem("loaded");
        if (Object.keys(tmp).length === 0) {
            $scope.loaded = [];
        } else {
            $scope.loaded = tmp;
        }
        
        for(var i = 0; i < $scope.repos.length; i++) {       
            var r = $scope.repos[i];
            if ($scope.loaded.indexOf(r.name) < 0) {
                GithubSvc.fetchJson(r.languages_url).then(parseReturnedData, logError);
            }
        }
    };
    
    function logError(val) {
        console.log(val);
    }
    
    function parseReturnedData(result){
        var data = result.data;        
        var parts = result.config.url.split('/');
        var repo = parts[parts.length -2];
        console.log("Repo:", repo);
        $scope.loaded.push(repo);
        StorageSvc.setItem("loaded", $scope.loaded);

        Object.keys(data).forEach(function (lang) {
            console.log(lang + ":" + data[lang]);
            if ($scope.languages[lang] === undefined) {
                $scope.languages[lang] = data[lang];
            } else {
                $scope.languages[lang] += data[lang];
            }
        });
        StorageSvc.setItem("languages", $scope.languages);
    }
    
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
