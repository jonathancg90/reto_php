<?php 

require("../controllers/GroupCtrl.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$groupCtrl = new Group($conn);
echo $groupCtrl->saveGroup($request);
