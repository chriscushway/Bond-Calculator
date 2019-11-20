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
                echo "<div class='template'>
                
                            <div class='row'><span class='name'>".$row['name']."</span><button class='delete'><span>Delete</span><span>&times;</span></button><hr></div>
                            
                            <div class='row'>
                            <span>Interest Rate</span><span>".$row['rate']."%</span>
                            </div>
                            
                            <div class='row'>
                                <span>Period</span><span>".$row['period']." years</span>
                            </div>
                            
                            <div class='row'>
                                <span>Down Payment</span><span>R".$row['initial_payment']."</span>
                            </div>
                            
                            <div class='row'>
                                <span>Amount</span><span>R".$row['PV']."</span>
                            </div>
                            
                            <hr>
                            
                            <div class='row total'>
                                <span >Monthly payment</span><span>R".$row['total']."</span>
                            </div>
                    </div>";
            }
        }
        
        
    }

?>