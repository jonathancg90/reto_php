<?php 

require("../controllers/UserCtrl.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$userCtrl = new User($conn);
echo $userCtrl->updateUser($request);
