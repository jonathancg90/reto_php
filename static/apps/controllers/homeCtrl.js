function homeCtrl ($scope, requestService) {
	$scope.user = {};

	$scope.login = function(){
		if ($scope.loginForm.$valid ){
			var urlLogin = "http://localhost/setour/app/rest/login.php";
			debugger
			var response = requestService.post(urlLogin, $scope.user);
	        response.success(function(res) {
	        	debugger
	            if(res.status == "ok"){
	                window.location.href = "#/user";
	                $('#myModal').modal('hide')
	            } else {
	                alert(res.message)
	            }
	        });

	        response.error(function (err, status) {
	           	alert("ocurrio un error");
	        });
		} else {
			alert("Formulario invalido");
		}

	}
}
angular
  .module('mainApp')
  .controller('homeCtrl', homeCtrl);
