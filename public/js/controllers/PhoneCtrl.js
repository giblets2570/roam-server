angular.module('PhoneCtrl',[]).controller('PhoneController',['$scope','$sessionStorage','$http',function(scope,session,http){

	scope.log='Setting up...';
	scope.id = session.id;

	var getToken = function(callback){
		http({
			method:'GET',
			url: '/api/twilio',
			cache: false
		}).success(callback);
	};

	getToken(function(data){
		Twilio.Device.setup(data.calltoken);
	});

	//initializing the phone number
	scope.phoneNumber = "";
	scope.business = "";
	scope.address = "";

	scope.called = true;
	scope.notesSubmitted = true;

	//initializing the radio buttons
	scope.pickedup = false;
	scope.enthusiasm = -1;
	scope.lead = false;
 
 	//making the phone call
    scope.call = function(){
        // get the phone number to connect the call to
        if(scope.phoneNumber!=""){
	        params = {"calledNumber": scope.phoneNumber,
	                "outgoingNumber": scope.outgoingNumber,
	            	"authorization": session.token};

	        Twilio.Device.connect(params);
	        scope.called = true;
	        scope.notesSubmitted = false;
	    }else{
	    	alert("Press the get next number button!");
	    }
    }
 	
 	//hanging up that phone call
    scope.hangUp = function() {
		Twilio.Device.disconnectAll();
    }

 	scope.addNotes = function(){
 		if(scope.called == true){
	 		http({
	 			method:'PUT',
	 			url:'/api/call/notes',
	 			data: {
	 				'notes' : scope.phoneCallNotes,
	 				'pickedup' : scope.pickedup,
	                'enthusiasm' : scope.enthusiasm,
	                'lead' : scope.lead
	 			},
	 			cache: false
	 		}).success(function(data){
	 			console.log(data);
	 			scope.notesSubmitted = true;
	 		});
	 	}else{
	 		alert("You need to make a call before submitting notes!");
	 	}
 	}

 	scope.getNotes = function(){
 		http({
 			method:'GET',
 			url:'/api/call/notes',
 			cache: false
 		}).success(function(data){
 			console.log(data);
 		});
 	}

 	//new business input
	scope.addNewNumber = function(phoneNumber,business,address){
		if(scope.notesSubmitted == true){
			http({
				method:'POST',
				url:'api/phoneNumber',
				data: {
					'number' : phoneNumber,
					'business' : business,
					'address' : address
				}
			}).success(function(data){
				console.log(data.message);
				scope.phone_number_id = data.numberData._id;
				scope.phoneNumber = data.numberData.number;
				scope.business = data.numberData.business;
				scope.address = data.numberData.address;
				scope.phoneCallNotes = "";
				scope.pickedup = false;
				scope.lead = false;
				scope.enthusiasm = -1;
			});
		}else{
	 		alert("Submit the notes on the call you just made first!");
	 	}
    };

    //get the next number
 	scope.getNextNumber = function(){
 		if(scope.called == true && scope.notesSubmitted == true){
	 		http({
	 			method:'GET',
	 			url:'/api/phoneNumber',
	 			cache: false
	 		}).success(function(data){
	 			if(data.error){
	 				console.log(data.error);
	 				return;
	 			}
	 			scope.phone_number_id = data.numberData._id;
				scope.phoneNumber = data.numberData.number;
				scope.business = data.numberData.business;
				scope.address = data.numberData.address;
				scope.phoneCallNotes = "";
				scope.pickedup = false;
				scope.lead = false;
				scope.enthusiasm = -1;
				scope.called = false;
	 		});
	 	}else{
	 		alert("Please make the call then submit the notes!")
	 	}
 	};

    //Twilio javascript
    Twilio.Device.ready(function (device) {
        scope.log = "Ready";
        console.log(scope.log);
        scope.$apply();
    });
 
    Twilio.Device.error(function (error) {
    	scope.log = "Error: " + error.message;
    	scope.$apply();
    });
 
    Twilio.Device.connect(function (conn) {
    	scope.log = "Successfully established call";
    	scope.$apply();
    });
 
    Twilio.Device.disconnect(function (conn) {
        scope.log = "Call ended";
    });
}]);