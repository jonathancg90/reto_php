function userCtrl ($scope, requestService) {
	var urlUsers = "http://localhost/setour/app/rest/list-user.php",
		urlGroups = "http://localhost/setour/app/rest/list-group.php";

	$scope.users = [];
	$scope.groups = [];
	$scope.modal_save = true;

	var user_response = requestService.get(urlUsers);
    user_response.success(function(data) {
    	$scope.users = data;
    });

    var group_response = requestService.get(urlGroups);
    group_response.success(function(data) {
    	$scope.groups = data;
    });

    $scope.openSave = function() {
    	$scope.modal_save = true;
    	$scope.register_user = {};
    }

    $scope.openUpdate = function(index){
    	$scope.register_user = $scope.users[index];
    	$scope.modal_save = false;
    	$('#modalCreate').modal('show');
    	for(var i=0; i<$scope.groups.length; i++){
    		if($scope.groups[i].Id == $scope.register_user.Group.Id){
    			$scope.register_user.group = $scope.groups[i];
    		}
    	}
    }

    $scope.save = function(){
    	if ($scope.registerForm.$valid ){
    		var data = {
    			"email": $scope.register_user.Email,
    			"password": $scope.register_user.Password,
    			"name": $scope.register_user.Name,
    			"last_name": $scope.register_user.LastName,
    			"address": $scope.register_user.Address,
    			"photo": $scope.register_user.Photo,
    			"group_id": $scope.register_user.group.Id
    		}

    		var urlLogin = "http://localhost/setour/app/rest/save-user.php";

			var response = requestService.post(urlLogin, data);
	        response.success(function(res) {
	            if(res.status == "ok"){
	                alert(res.message);
	                debugger
	                $scope.register_user.Id = res.id;
	                $scope.users.push($scope.register_user);
	                $('#modalCreate').modal('hide');
	            } else {
	                alert(res.message)
	            }
	        });

	        response.error(function (err, status) {
	           	alert("ocurrio un error");
	        });
    	} else {
    		alert("formulario invalido");
    	}
    }

    $scope.update = function(){
    	if ($scope.registerForm.$valid ){
    		var data = {
    			"id": $scope.register_user.Id,
    			"email": $scope.register_user.Email,
    			"password": $scope.register_user.Password,
    			"name": $scope.register_user.Name,
    			"last_name": $scope.register_user.LastName,
    			"address": $scope.register_user.Address,
    			"photo": $scope.register_user.Photo,
    			"group_id": $scope.register_user.group.Id
    		}

    		var urlLogin = "http://localhost/setour/app/rest/update-user.php";

			var response = requestService.post(urlLogin, data);
	        response.success(function(res) {
	            if(res.status == "ok"){
	                alert(res.message);
	                $('#modalCreate').modal('hide');
	            } else {
	                alert(res.message)
	            }
	        });

	        response.error(function (err, status) {
	           	alert("ocurrio un error");
	        });
    	} else {
    		alert("formulario invalido");
    	}
    }

   $scope.delete = function(index){
   		if(index != undefined){
   			debugger
   			data = {
   				"id": $scope.users[index].Id,
   			}
   			var urlLogin = "http://localhost/setour/app/rest/delete-user.php";

			var response = requestService.post(urlLogin, data);
	        response.success(function(res) {
	            if(res.status == "ok"){
	                alert(res.message);
	                $('#modalCreate').modal('hide');
	                $scope.users.splice(index, 1);
	            } else {
	                alert(res.message)
	            }
	        });

	        response.error(function (err, status) {
	           	alert("ocurrio un error");
	        });
   		}
   }
}
angular
  .module('mainApp')
  .controller('userCtrl', userCtrl);
