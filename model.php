<?php 
    include("controller.php");

    if($_GET['action']=="save"){
        print_r($_POST);
       /* $query = "INSERT INTO `users`(`name`,`rate`,`period`,`PV`,`initial_payment`,`total`) VALUES ('".mysqli_real_escape_string($link,$_POST['name'])."','".."','".."','".."','".."','".."')";
            */
    }
?>