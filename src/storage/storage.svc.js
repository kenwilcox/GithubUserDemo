angular.module('app')
.factory('StorageSvc', ['CONFIG', function (CONFIG) {    
  return {
    getItem: getItem,
    setItem: setItem,    
  };
  
  function getItem(item) {
      var temp = window.localStorage.getItem(CONFIG.prefix + item) || '';    
      return JSON.parse(temp);
  }
  
  function setItem(key, data) {
      window.localStorage.setItem(CONFIG.prefix + key, JSON.stringify(data));
  }
}]);