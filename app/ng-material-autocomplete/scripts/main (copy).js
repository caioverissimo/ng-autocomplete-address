(function () {
  'use strict';
  angular
      .module('autocompleteDemo', ['ngMaterial'])
      .controller('DemoCtrl', DemoCtrl);
  function DemoCtrl ($timeout, $q, $log, $http) {
  	var contador = 0;
    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    // list of `state` value/display objects
    // self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.newState = newState;

    function checkApi (addressValue, callback) {
      $http({
        method: 'GET',
        url: 'http://maps.googleapis.com/maps/api/geocode/json?address='+addressValue
      }).success(function (data, status, headers, config) {
        // $scope.resposta = data;
        console.log("###data: ");
        console.log(data.results);        
        callback(data.results);

      }).error(function(data, status, headers, config){
        // $scope.erro = data;
      });
    };


    function newState(state) {
      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
    }
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
    	self.states = loadAll();
      console.log(query)
      console.log("#######wowRes: ");
      checkApi( query, function(resultado) { return console.log('abii: '), console.log(resultado) } ) ;
      
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
    	contador++;
    	console.log(contador);
			console.log('loadAll');
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
  }
})();