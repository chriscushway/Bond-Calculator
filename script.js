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
    return PMT.toFixed(2);
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
    
    return balance.toFixed(2);
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
    return interest.toFixed(2);
}

/*

    function that calculates the percentage of the payment that pays of interest
    returns float rounded to 2 decimal places
*/
function calcInterestPaid(interest,PMT){
    return ((interest/PMT) * 100).toFixed(2);
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

function checkFlags(flags){
    for(key in flags){
        if(flags[key]==0){
            return false;
        }
    }
    return true;
}

function removeErrors(){
    $("#calculator input").each(function(){
        $(this).css("border-color","#35A7FF");
        $(this).siblings("label").css("color","#35A7FF");
    });
}

function validateCalcName(input){
    return input.length > 0;
}

function updateInputsAndFlags(input,id){
    inputs[id] = input.val();
    flags[id] = 1;
}

$("#calc-button").click(function(){

    //Validate inputs
    //if inputs valid add them to associative array
    //Want to use associative array so we can retrieve item by key (id) value in O(1) time
    $("#calculator input").each(function(){
        if($(this).attr('id')=="initial_payment"){
            if(!validatePayment($(this).val())){
                reportInputError($(this));
                flags[$(this).attr("id")] = 0;
            }else{
                updateInputsAndFlags($(this),$(this).attr("id"));
            }   
        }else if(!validateInput($(this).val())){
            reportInputError($(this));
            flags[$(this).attr("id")] = 0;
        }else if($(this).attr('id')=="rate"){
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
        displayOutput();
        removeErrors();
    }else{
        $("#output").hide();
    }
    
});

function editLabel(input,message){
    input.siblings("label").html("Calculation Name");
    input.siblings("label").append("<br><small>"+message+"</small>");
    input.siblings("label").css("color","#FF5964");
}

function displayOutput(){
    $("#output #total span:last-child").html("R "+calcPMT(inputs['rate'],inputs['PV'],inputs['period'],inputs['initial_payment'])+"");
    for(key in inputs){
        $("#output #"+key).children("span").eq(1).children(".value").html(" "+inputs[key]+" ");
    }
    $("#output").fadeIn(1000);
}

$("#new").click(function(){
   $("#output").hide(); 
});

function createDataString(inputs){
    var dataString ="";
    for(key in inputs){
        dataString+="&"+key+"="+inputs[key];
    }
    return dataString;
}

function changeModalContent(heading,message,color){
    $("#modal-heading").html(heading);
    if(color==0){
        $("#modal-heading").css("color","#FF5964"); 
    }else{
        $("#modal-heading").css("color","#59CD90"); 
    }
    $(".modal-body p").html(message);
}

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
                    $("#modal").show();
                    $(".content").show();
                }else if(data=="0"){
                    changeModalContent("Error","Could not save your calculation please try again later",0);
                    $("#modal").show();
                    $(".content").show();
                }else{
                    changeModalContent("Error",data+"",0);
                    $("#modal").show();
                    $(".content").show();
                }

            }
        });                  

    }else{
        editLabel($("#calc-name"),"*name required*"); 
    }
});

$(".close").click(function(){
    $("#modal").hide();
});