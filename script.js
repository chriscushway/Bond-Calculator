var inputs = [];
var flags = {rate:0,PV:0,period:0,initial_payment:0}

/*
    rate - Fixed interest rate
    PV - present value or amount to be loaned
    years - bond term in years
    initial_payment - amount deposited or paid
    
    This function calculates the required monthly payment that would be needed to 
    pay a bond over x years with a particular interest rate such that both the interest accrued
    and the initial loan amount will reach 0 after x years.
    
    NB: Amount is rounded to 2 decimal places
*/
function calcPMT(rate,PV,years,initial_payment){
    rate = rateAsDecimal(rate,12); //Get rate as decimal value
    PV = PV - initial_payment;
    var PMT = (PV * rate)/(1-Math.pow((1+rate),-(years*12)));
    return PMT;
}

/*
    function that converts and inputted percent value to a decimal value
    returns float
*/
function rateAsDecimal(r,m){
    return ((r/m)/100);
}

/*
    function that calculates the outstanding balance after period_complete years of payments
    have been done
    returns float rounded to 2 decimal places
*/
function calcOutstBal(PMT,PV,rate,period_complete){
    rate = rateAsDecimal(rate,12);
    var power = period_complete*12;
    var balance = PV*(Math.pow((1+rate),power))-PMT*(((Math.pow((1+rate),power))-1)/rate);
    
    return balance;
}

/*

    function that determines how much interest has accrued after (period) years
    returns float rounded to 2 decimal places
*/

function calcInterest(balance,rate,period){
    rate = rateAsDecimal(rate,12);
    period *= 12; 
    var interest = balance*Math.pow((1+rate),period);
    interest-=balance;
    return interest;
}

/*

    function that calculates the percentage of the payment that pays of interest
    returns float rounded to 2 decimal places
*/
function calcInterestPaid(interest,PMT){
    return ((interest/(PMT*12)) * 100);
}

/*
    function to validate rate entered is greater than 0 and less than 100
    returns a boolean
*/
function validateRate(rate){
    return 0<rate && rate <= 100;
}

/*
    function to validate input entered is greater than 0
    returns a boolean
*/
function validateInput(input){
    return input>0;
}

/*
    function to validate initial payment entered is greater or equal to 0
    returns a boolean
*/

function validatePayment(payment){
    return payment>=0;
}

/*
    function to test if value inputted contains letters
    returns boolean
*/
function onlyNumbers(input){
    return /^\d+$/.test(input);
}

/*
    function that turns inputs and their corresponding labels red
*/
function reportInputError(input){
    input.css("border-color","#FF5964");
    input.siblings("label").css("color","#FF5964");
    input.siblings("small").show();
}

/*
    function that checks if all inputs have been validated
    retuns boolean
*/
function checkFlags(flags){
    for(key in flags){
        if(flags[key]==0){
            return false;
        }
    }
    return true;
}
/*
    function that resets the color of the input label to its original blue colour
*/
function removeErrors(){
    $("#calculator input").each(function(){
        $(this).css("border-color","#35A7FF");
        $(this).siblings("label").css("color","#35A7FF");
    });
}

/*
    function that validates the user has inputted a name 
    returns bool
*/
function validateCalcName(input){
    return input.length > 0;
}

/*
    sets value for flag in flags object and the value of the input in the inputs object
    by using id as the key
*/
function updateInputsAndFlags(input,id){
    inputs[id] = input.val();
    flags[id] = 1;
}

/*
    Controller for when user clicks calculate button on calculator
*/
$("#calc-button").click(function(){

    //Validate inputs
    //if inputs valid add them to associative array
    //Want to use associative array/ object so we can retrieve item by key (id) value in O(1) time
    $("#calculator input").each(function(){
        //initial_payment needs different validation
        if($(this).attr('id')=="initial_payment"){
            if(!validatePayment($(this).val())){
                reportInputError($(this));
                flags[$(this).attr("id")] = 0;
            }else{
                updateInputsAndFlags($(this),$(this).attr("id"));
            }   
            
        }
        //if there is an error in validating inputs
        else if(!validateInput($(this).val())){
            
            reportInputError($(this));
            flags[$(this).attr("id")] = 0;
            
        }
        //rate needs a different validation 
        else if($(this).attr('id')=="rate"){
            
            if(!validateRate($(this).val())){
                
                reportInputError($(this));
                flags[$(this).attr("id")] = 0;
                
            }else{
                updateInputsAndFlags($(this),$(this).attr("id"));
            }
          
        }else{
            updateInputsAndFlags($(this),$(this).attr("id"));
        }
    });
    if(checkFlags(flags)){
        
        generateOutputHTML();
        displayHTML();
        removeErrors();
        
    }else{
        clearOutputs();
    }
    
});

/*
    function that formats the values in the #output div and displays the #output box
*/
function displayHTML(){
    
    $("#table").css("display","table");
    $("#graph").show();
    shiftGraphLabels();
    $("#output").show();
    $("#welcome").hide();
    $("#output").fadeIn(1000);
    
}
/*
    function that calculates how much of the monthly payment is going toward the interest vs the capital
    the function then generates HTML based on these percent values in both the graph and table. Moreover, the amount of
    table rows and graph bars generated is determined by the period.

*/
function generateOutputHTML(){
    //call this function so stale data is removed
    clearOutputs();
    var rate = inputs['rate']; 
    var PV = inputs['PV'];
    var period = inputs['period'];
    var initial_payment = inputs['initial_payment'];
    var PMT = calcPMT(rate,PV,period,initial_payment);
    //Generate output for #output box
    $("#output #total span:last-child").html("R "+PMT.toFixed(2)+"");
    for(key in inputs){
        $("#output #"+key).children("span").eq(1).children(".value").html(" "+inputs[key]+" ");
    }
    
    //setting the number of bars in the graph
    $("#bar-container").css("grid-template-columns","repeat("+period+", 1fr)");
    var graphHTML = ""
    //generate HTML for graph and table
    for(var i = 1;i<=inputs['period'];i++){
        
        var balance = calcOutstBal(PMT,PV,rate,i);
        var interest = calcInterest(balance,rate,1);
        var interestPercent = calcInterestPaid(interest,PMT).toFixed(2);
        var capital = (100 - interestPercent).toFixed(2);
        $("#table tbody").append("<tr><td>"+i+"</td><td>"+interestPercent+"</td><td>"+capital+"</td></tr>");
        graphHTML+=addBar(interestPercent,capital);
        
    }
    $("#bar-container").html(graphHTML);
    
}

/* 
    function that adds bar to bar graph
*/
function addBar(height1,height2){
    return "<div class='bar'><div style='height:"+height1+"%' class='interest'></div><div class='capital' style='height:"+height2+"%'></div></div>";
}

/*
    function that removes stale data and hides html elements
*/
function clearOutputs(){
    $("#output").hide(); 
    $("#welcome").show();
    $("#table tbody").html("");
    $("#table").hide();
    $("#graph").hide();
}

/*
    controller for new calculation button
*/
$("#new").click(function(){
    clearOutputs();
    
});

/*
    function that creates GET data string such that data can be easily parsed by model
*/
function createDataString(inputs){
    var dataString ="";
    for(key in inputs){
        dataString+="&"+key+"="+inputs[key];
    }
    return dataString;
}

/*
    function that changes the content of the modal
*/
function changeModalContent(heading,message,color){
    $("#modal-heading").html(heading);
    if(color==0){
        $("#modal-heading").css("color","#FF5964"); 
    }else{
        $("#modal-heading").css("color","#59CD90"); 
    }
    $(".modal-body p").html(message);
}

/*
    function that posts data to the model when the save button is pressed
*/
$("#save").click(function(){
    if(validateCalcName($("#calc-name").val())){
        var dataString = createDataString(inputs);
        dataString+="&name="+$("#calc-name").val();
        dataString+="&total="+
        calcPMT(inputs['rate'],inputs['PV'],inputs['period'],inputs['initial_payment']);
          $.ajax({
            type: "POST",
            url: "model.php?action="+$(this).attr("action"),
            data:dataString,
            success: function(data){
                if(data=="1"){
                    changeModalContent("Success","Your calculation has been successfully saved",1);
                    displayModal();
                }else if(data=="0"){
                    changeModalContent("Error","Could not save your calculation please try again later",0);
                    displayModal();
                }else{
                    changeModalContent("Error",data+"",0);
                    displayModal();
                }

            }
        });                  

    }else{
        changeModalContent("Error","Please enter a name before saving a calculation","0")
    }
});

$(".close").click(function(){
    $("#modal").hide();
});

function displayModal(){
    $("#modal").show();
    $(".content").show();
}

/*

    function that shifts graph y-axis labels so they are centered

*/
function shiftGraphLabels(){

    var shift = -1*$(".y-label").outerHeight()/2;
    $(".col-50").eq(0).css("margin-top",shift+"px");
}


$("#nav-button").click(function(){
    window.location.assign("test.html");
});

$(".delete").click(function(){
    $(this).parents(".template").remove();
    var data = "&name="+$(this).siblings(".name").html();
     $.ajax({
            type: "POST",
            url: "model.php?action=delete",
            data:data,
            success: function(data){
                
            }
        });
                      
})

