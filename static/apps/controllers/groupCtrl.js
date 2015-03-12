function groupCtrl ($scope, requestService) {
	var urlGroups = "http://localhost/setour/app/rest/list-group.php";
	var urlSaveGroup = "http://localhost/setour/app/rest/save-group.php";
	var urlUpdateGroup = "http://localhost/setour/app/rest/update-group.php";
	var urlDeleteGroup = "http://localhost/setour/app/rest/delete-group.php";

	$scope.register_group = {};
	$scope.modal_save = true;

    var group_response = requestService.get(urlGroups);
    group_response.success(function(data) {
    	$scope.groups = data;
    });

    $scope.open_save = function(){
    	$scope.modal_save = true;
    }

    $scope.save = function(){
    	if ($scope.registerForm.$valid ){
    		var data = {
    			"name": $scope.register_group.Name,
    		}

			var response = requestService.post(urlSaveGroup, data);
	        response.success(function(res) {
	            if(res.status == "ok"){
	                alert(res.message);
	                $scope.register_group.Id = res.id;
	                $scope.groups.push($scope.register_group);
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

}
angular
  .module('mainApp')
  .controller('groupCtrl', groupCtrl);
