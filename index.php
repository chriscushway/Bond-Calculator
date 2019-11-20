<?php 
    include('controller.php');
    include('views/header.php');

    if($_GET['page']=="calculations"){
        
        include('views/calculations.php');
        
    }else{
        
        include('views/calculator.php');
    }
    
    include('views/footer.php');
?>