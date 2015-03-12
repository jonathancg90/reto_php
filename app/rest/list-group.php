<?php 

require("../controllers/GroupCtrl.php");

$groupCtrl = new Group($conn);
echo $groupCtrl->allGroup();