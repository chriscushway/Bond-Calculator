var inputs = [];


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



$("#calc-button").click(function(){
    var flag = true;
    //Validate inputs
    //if inputs valid add them to associative array
    //Want to use associative array so we can retrieve item by key (id) value in O(1) time
    $("#calculator input").each(function(){
        if(!validateInput($(this).val())){
            reportInputError($(this));
        }else if($(this).attr('id')=="rate"){
            if(!validateRate($(this).val())){
                reportInputError($(this));
            }else{
                inputs[''+$(this).attr("id")] = $(this).val();
            }
        }else{
            inputs[''+$(this).attr("id")+''] = $(this).val();
            
        }
    });
    if(flag){
        displayOutput();
    }
    
});

function displayOutput(){
    $("#output #total span:last-child").html("R "+calcPMT(inputs['rate'],inputs['PV'],inputs['period'],inputs['initial_payment'])+"");
    for(key in inputs){
        $("#output #"+key).children("span").eq(1).html("hello");
    }
       
    $("#output").fadeIn(1000);
}