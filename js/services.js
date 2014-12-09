'use strict';

/* Services */



var app = angular.module('myApp.services', ['ngStorage', 'ngCordova']);

// reusable constants

// urls

.value('urlService', {
    apiCallsUrl: "http://xxx.xxx.xxx.xxx",
    imagesUrl: "http://yyy.yyy.yyy.yyy"
});

//options lists

.value('constantsService', {
	categoriesRange: ["food", "hotels", "attractions", /* ... */ ],

	/* and more and more ... */
});

// common functions 


// networking

.factory('networkService', function( $http, $q, $log, urlService, stateService){

  // common error and success functions
  function handleError( response ) {
    // weird format, must be an error
    if (!angular.isObject( response.data ) || !response.data.message)      
    	  return( $q.reject( "An unknown error occurred." ) );
    return( $q.reject( response.data.message ) );
  }
  function handleSuccess( response ) {
    if (response.data.code)
    	    return( $q.reject(response.data.message) );
	    return(response.data.data);
  }

    return ({

	    createReservation: function(latitude, longitude){
		    var request = $http({
    		    method: "post",
    		    url: urlService.apiCallsUrl + "reservation/create",
    		    data: {
    			    latitude: latitude,
           longitude: longitude
    		    }
    	    });
    	    return( request.then( handleSuccess, handleError ) );
	    },
    
	  	/* and more and more ... */

  	});
});

// device capabilities

.factory('geoLocationService', function($log, $cordovaGeolocation)  {
    var geoLocationWatch = null;

    return {
	    startLocationTracking: function() {
		  if (!geoLocationWatch){
			  var options = {
		  	    enableHighAccuracy: true,
		  		  frequency: 1000,
		  		  maximumAge: 3000, 
		  		  timeout: 5000,
			  };
			  // begin watching
			  geoLocationWatch = $cordovaGeolocation.watchPosition(options);
	    	  geoLocationWatch.promise.then(
		      function() { /* Not  used */ }, 
			    
			    function(err) { /* An error occurred */ }, 

			    function(position) {
			      // Active updates of the position here
			      // position.coords.[ latitude / longitude ]
			    }
		    );
		  }
    },

  /* ... */

  });
});

// app-wide context

// persistent state

.factory('stateService', function($log, $localStorage){
	
	
 	return ({

	    setUserIdentification: function(userId, token) {
		     $localStorage.userId = userId;
		     $localStorage.token = token;
	     },

	    getUserIdentification: function() {
		    return ({ 
			    userId: $localStorage.userId, 
			    token: $localStorage.token
		    });
	    },

		eraseUserIdentification: function() {
	      delete $localStorage.userId;
		    delete $localStorage.token;
	    },

	    /* ... */
});

// non-persistent context for screen transitions 

.factory('filterService', function($log){
    var friendId = null;
    var imageData = null;
    var filterCondition = null;

    return ({
	    setFriend: function(id) {
		    friendId = id;
	    },
	    getFriend: function() {
		    return friendId;
	    },
	    setFilterCondition: function(condition) {
		    filterCondition = condition;
	    },

    	/*...*/
	    
	    getImage: function() {
		    return imageData;
        }
    });
});

// database/list service

.factory('dbService', function($log){

    var favorites = TAFFY();
    var taxis = TAFFY();

    return ({
	    eraseDb: function(dbName, value) {
		    switch(dbName)
		    {
			    case "favorites":
				    favorites().remove();				
			    break;
			    ...
		    }
	    },

	    fillDb: function(dbName, data) {
		    switch(dbName)
		    {
			    case "favorites":					
				    taxis.insert(data);
			    break;
		      ...
		    }
	    },

	    
	    getItemFromDb: function(dbName, itemId) { // select row by id
		    switch(dbName)
		    {
			    case "favorites":
				    return favorites({ "id" : itemId }).first();
			    break;
			    
			    /*...*/
       		}
	    }
    });
});

// paging/batch service

.value('batchService', {
    
    favoritesListOffset: 0,
    taxisListOffset: 0,
   	
   	/*...*/
	
	sizeTaxisBatch: 8
});

