angular.module('AppointmentsCtrl',[]).controller('AppointmentsController',['$scope','$interval','$http','$sessionStorage',function(scope,interval,http,session){

	// update = interval(scope.getAppointments, 5000);
	scope._id = 0;
	scope.appointments = [];
	scope.number = "";
	scope.address = "";
	scope.business = "";

	scope.addAppointment = function(){
		var appointment = {
			'number':scope.number,
			'business':scope.business,
			'address':scope.address,
			'_id':scope._id
		};
		scope._id += 1;
		scope.number = "";
		scope.address = "";
		scope.business = "";
		scope.appointments.push(appointment);
	}

	scope.takeAppointment = function(appointment){
		// var r = confirm("Are you aure you want to take this appointment?");
		var a = scope.appointments.filter(function(entry){
			return entry._id === appointment;
		})[0];
		var i = scope.appointments.indexOf(a);

		scope.appointments.splice(i, 1);;
	}

}]);