<?php 
    include("controller.php");

    if($_GET['action']=="save"){
       // print_r($_POST);
        $error="";
        
        $query = "SELECT * FROM `users` WHERE name = '". mysqli_real_escape_string($link, $_POST['name'])."' LIMIT 1";
        
        $result = mysqli_query($link, $query);
        if(mysqli_num_rows($result) > 0){
            $error = "A calculation with that name already exists";
        }else{
            $query = "INSERT INTO `users`(`name`,`rate`,`period`,`PV`,`initial_payment`,`total`) VALUES ('".mysqli_real_escape_string($link,$_POST['name'])."',
           '".mysqli_real_escape_string($link,$_POST['rate'])."',
           '".mysqli_real_escape_string($link,$_POST['period'])."',
           '".mysqli_real_escape_string($link,$_POST['PV'])."',
           '".mysqli_real_escape_string($link,$_POST['initial_payment'])."',
           '".mysqli_real_escape_string($link,$_POST['total'])."')";

            $result = mysqli_query($link, $query);
            if($result){
                echo "1";
            }else{
                echo "0";
            }
        }
        
        if($error!=""){
            echo $error;
            exit();
        }
       
    }
?>