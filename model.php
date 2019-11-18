<?php 
    include("controller.php");

    if($_GET['action']=="save"){
        print_r($_POST);
       $query = "INSERT INTO `users`(`name`,`rate`,`period`,`PV`,`initial_payment`,`total`) VALUES ('".mysqli_real_escape_string($link,$_POST['name'])."',
       '".mysqli_real_escape_string($link,$_POST['rate'])."',
       '".mysqli_real_escape_string($link,$_POST['period'])."',
       '".mysqli_real_escape_string($link,$_POST['PV'])."',
       '".mysqli_real_escape_string($link,$_POST['initial_payment'])."',
       '".mysqli_real_escape_string($link,$_POST['total'])."')";
            
        $result = mysqli_query($link, $query);
        if($result){
            echo "success";
        }else{
            echo "fail";
        }
    }
?>