angular.module('ScriptNotesCtrl',[]).controller('ScriptNotesController',['$scope','$http','$sessionStorage',function(scope,http,session){

	scope.updateScriptNotes = function(){
		var data = {
			'scriptNotes':scope.scriptNotes,
			'agentname':session.username,
			'clientname':session.clientname
		};
		http({
			method:'POST',
			data: data,
			url:'endpoints/updateScriptNotes.php',
			cache:false
		}).success(function(data){
			console.log(data);
		});
	};

	scope.getScriptNotes = function(){
		http({
			method:'GET',
			url:'endpoints/getScriptNotes.php',
			params:{'agentname':session.username,'clientname':session.clientname},
			cache: false
		}).success(function(data){
			scope.scriptNotes = data[0].scriptNotes;
		});
	};

	scope.getScriptNotes();

}]);