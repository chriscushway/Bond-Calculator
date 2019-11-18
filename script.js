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
    rate = ((rate/12)/100); //Get rate as decimal value
    PV = PV - initial_payment;
    var PMT = (PV * rate)/(1-Math.pow((1+rate),-(years*12)));
    return PMT.toFixed(2);
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