angular.module('ProfileCtrl',[]).controller('ProfileController',['$scope','$sessionStorage','$location','$http',function(scope,session,location,http){

	scope.test = function(){
		http({
			method: 'GET',
			url: '/api/agents'
		}).success(function(data){
			console.log(data);
		})
	};
	// window.onbeforeunload = function() {
 //        return "Data will be lost if you leave the page, are you sure?";
 //    };

	// scope.logout = function(){
	// 	session.username = null;
	// 	session.clientname = null;
	// 	location.path('login');
	// }

	// //initializing the viewed 
	// scope.showScriptNotes = true;

 //    //seetting up the screen functions
 //    scope.clearScreenFunc = function(){
	// 	scope.showScriptNotes = false;
	// 	scope.showStats = false;
	// 	scope.showAppointments = false;
	// }

 //    scope.showStatsFunc = function(){
	// 	scope.clearScreenFunc();
	// 	scope.showStats = true;
	// 	console.log("Stats" + scope.showStats);
	// };

	// scope.showScriptNotesFunc = function(){
	// 	scope.clearScreenFunc();
	// 	scope.showScriptNotes = true;
	// 	console.log("Notes");
	// };

	// scope.showAppointmentsFunc = function(){
	// 	scope.clearScreenFunc();
	// 	scope.showAppointments = true;
	// 	console.log("Appointment");
	// };

 //    //function for saving the script notes
 //    scope.saveScriptNotes = function(){
 //    	var params = {
 //    		scriptNotes: scope.scriptNotes,
 //    		agentname: session.username,
 //    		clientname: session.clientname
 //    	};

 //    	http({
	//             method :'POST',
	//             url:'endpoints/saveScriptNotes.php',
	//             data: params,
	//             headers: {'Content-Type': 'application/json'}
	//         }).success(function (data, status, headers, config) {
	//             console.log('status',status);
	//             console.log('data',status);
	//             console.log('headers',status);
	//         });
 //    }

}]);