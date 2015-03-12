<?php

require("../util/connection.php");

class Group{
	private $conn;

	function __construct($conn) {
   		$this->conn = $conn;
   	}

	function allGroup() {
		$data = array();
		$query = "SELECT * FROM UserGroup";
		$result = $this->conn->query($query);
		if(!$result){
			die('There was an error running the query [' . $this->conn->error . ']');
		} else {
			while($row = $result->fetch_assoc()){
    			$tmp = array(
					"Id" => $row['id'],
					"Name" => $row['name'],
				);
				array_push($data, $tmp);
			}
		}

		return json_encode($data);
	}

	function saveGroup($data){
		try {
				$insert_row = $this->conn->query("INSERT INTO UserGroup(name) values('".$data->name."')");
				if($insert_row) {
				    $status = "ok";
					$msg = "group inserted"; 
					$id = $this->conn->insert_id;
				}else{
					$status = "fail";
					$msg = "groip fail";
				}
		} catch (Exception $e) {
		    $status = "fail";
			$msg = "save error";
		}
		$data = array("status"=>$status, "message"=>$msg,  "id"=>$id);
		return json_encode($data);
	}

	// 	function updateUser($data){
	// 	try {
	// 			$query = "Update UserGroup set name='".$data->name."',password='".$data->password."',name='".$data->name."',last_name='".$data->last_name."',address='".$data->address."',photo='".$data->photo."',group_id='".$data->group_id."' where id=".$data->id;
	// 			$update_row = $this->conn->query($query);
	// 			if($update_row){
	// 			    $status = "ok";
	// 				$msg = "user updated"; 
	// 			}else{
	// 				$status = "fail";
	// 				$msg = "update fail".$query;
	// 			}

	// 	} catch (Exception $e) {
	// 	    $status = "fail";
	// 		$msg = "update error";
	// 	}
	// 	$data = array("status"=>$status, "message"=>$msg);
	// 	return json_encode($data);
	// }

}