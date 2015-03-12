<?php

require("../util/connection.php");

class User{
	private $conn;

	function __construct($conn) {
   		$this->conn = $conn;
   	}

	function allUser(){
		$data = array();
		$query = "select u.id, u.email, u.address,  u.password, u.name, u.last_name, u.photo, g.id as group_id, g.name as group_name from user u inner join UserGroup g on u.group_id = g.id";
		$result = $this->conn->query($query);
		if(!$result){
			die('There was an error running the query [' . $this->conn->error . ']');
		} else {
			while($row = $result->fetch_assoc()){
    			$tmp = array(
					"Id" => $row['id'],
					"Name" => $row['name'],
					"Email" => $row['email'],
					"Password" => $row['password'],
					"LastName" => $row['last_name'],
					"Address" => $row['address'],
					"Photo" => $row['photo'],
					"Group" => array(
						"Id" => $row['group_id'],
						"Name" => $row['group_name'],
					)
				);
				array_push($data, $tmp);
			}
		}

		return json_encode($data);
	}

	function getUser($id) {
		$data = array();
		$query = "select * from user where id="+$id;
		$result = $this->conn->query($query);
		if(!$result){
			die('There was an error running the query [' . $this->conn->error . ']');
		} else {
			while($row = $result->fetch_assoc()){
    			$tmp = array(
					"Id" => $row['Id'],
					"Name" => $row['name'],
					"LastName" => $row['last_name'],
					"Address" => $row['address'],
					"Photo" => $row['photo'],
					"Group" => array(
						"Id" => $row['group_id'],
						"Name" => $row['group_name'],
					)
				);
				array_push($data, $tmp);
			}
		}

		return json_encode($data);
	}

	function login($email, $password){
		$status = "fail";
		$msg = "Athentication fail";
		if($email != '' and $password != '') {
			$query = "select * from User where email='".$email."' and password='".$password."'";
			$result = $this->conn->query($query);
			// $get_total_rows = $result->fetch_row(); 
			if($result->num_rows > 0){
				$status = "ok";
				$msg = "login: ";
			} else {
				$status = "fail";
				$msg = "User not exists" ;
			}

		} 

		$data = array("status"=>$status, "message"=>$msg);
		return json_encode($data);
	}

	function saveUser($data){
		try {
				$insert_row = $this->conn->query("INSERT INTO user(email, password, name, last_name, address, photo, group_id ) values('".$data->email."','".$data->password."','".$data->name."','".$data->last_name."','".$data->address."','".$data->photo."','".$data->group_id."')");
				if($insert_row) {
				    $status = "ok";
					$msg = "user inserted"; 
					$id = $this->conn->insert_id;
				}else{
					$status = "fail";
					$msg = "insert fail";
				}
		} catch (Exception $e) {
		    $status = "fail";
			$msg = "save error";
		}
		$data = array("status"=>$status, "message"=>$msg,  "id"=>$id);
		return json_encode($data);

	}

	function deleteUser($data){
		try {
			$delete_row = $this->conn->query("DELETE FROM user where id=".$data->id);
			if($delete_row) {
				$status = "ok";
				$msg = "user deleted"; 
			}else{
				$status = "fail";
				$msg = "delete fail";
			}
		} catch (Exception $e) {
		    $status = "fail";
			$msg = "delete error";
		}
		$data = array("status"=>$status, "message"=>$msg);
		return json_encode($data);
	}

	function updateUser($data){
		try {
				// $save = $this->conn->prepare("UPDATE user set email = ? , password = ?, name = ?, last_name = ?, address=?, photo=?, group_id=? WHERE id=?");
				// $save->bind_param('ssssssii', $data->email, $data->password, $data->name, $data->last_name, $data->address, $data->photo, $data->group_id, $data->id);
				// $save->execute();
				// $save->close();
				$query = "Update user set email='".$data->email."',password='".$data->password."',name='".$data->name."',last_name='".$data->last_name."',address='".$data->address."',photo='".$data->photo."',group_id='".$data->group_id."' where id=".$data->id;
				$update_row = $this->conn->query($query);
				if($update_row){
				    $status = "ok";
					$msg = "user updated"; 
				}else{
					$status = "fail";
					$msg = "update fail".$query;
				    // die('Error : ('. $this->conn->errno .') '. $this->conn->error);
				}

		} catch (Exception $e) {
		    $status = "fail";
			$msg = "update error";
		}
		$data = array("status"=>$status, "message"=>$msg);
		return json_encode($data);
	}

}
