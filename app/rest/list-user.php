<?php 

require("../controllers/UserCtrl.php");

$userCtrl = new User($conn);
echo $userCtrl->allUser();