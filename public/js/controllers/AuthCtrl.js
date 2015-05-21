angular.module('AuthCtrl',[]).controller('AuthController',['$scope','$sessionStorage','$location','$http',function(scope,session,location,http){
	scope.login = function(){
		http({
			method: 'POST',
			url: 'agent_authenticate',
			data: {name: scope.name, password: scope.password},
			cache: false
		}).success(function(data){
			console.log(data.message);

			if(data.token){
				session.token = data.token;
				location.path('/profile');
			}else{
				alert("Wrong username/password");
				scope.username = "";
				scope.password = "";
			}
		});
	};
}]);