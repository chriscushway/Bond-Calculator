<?php

    $link = mysqli_connect("localhost", "root", "", "users");

    if (mysqli_connect_errno()) {
        
        print_r(mysqli_connect_error());
        exit();
        
    }
    
    function displayCalculations(){
        
        global $link;
        $query = "SELECT * FROM `users`";
        $result = mysqli_query($link, $query);
        if(mysqli_num_rows($result) == 0){
            echo "<h1>You have no saved calculations</h1>";
        }else{
            while($row = mysqli_fetch_assoc($result)){
                echo "<div class='template'>".$row['name']."</div><div class='template'>".$row['name']."</div><div class='template'>".$row['name']."</div><div class='template'>".$row['name']."</div>";
            }
        }
        
        
    }

?>