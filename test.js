QUnit.test( "Rate conversion calculation", function( assert ) {
    assert.equal(rateAsDecimal(6,12),"0.005");
    assert.equal(rateAsDecimal(6,0),Infinity);
    assert.equal(rateAsDecimal(0,12),"0");
    assert.equal(rateAsDecimal(12,12),"0.01");
    assert.equal(rateAsDecimal(12,6),"0.02");
});

QUnit.test( "Validate inputted rate", function( assert ) {
    assert.equal(validateRate(-1),false);
    assert.equal(validateRate(101),false);
    assert.equal(validateRate(0.00001),true);
    assert.equal(validateRate(99.999),true);
    assert.equal(validateRate(100.00),true);
    assert.equal(validateRate(6.5),true);
    assert.equal(validateRate(45.56),true);
});

QUnit.test( "Payment calculation", function( assert ) {
    assert.equal(calcPMT(6.5,200000,30,0).toFixed(2),"1264.14");
    assert.equal(calcPMT(6.5,200000,30,10000).toFixed(2),"1200.93");
    assert.equal(calcPMT(0,0,0,0).toFixed(2),"NaN");
    
});

QUnit.test( "Validate numeric input", function( assert ) {
    assert.equal(onlyNumbers("111"),true);
    assert.equal(onlyNumbers("1aaaa1"),false);
    assert.equal(onlyNumbers("72.1ab"),false);
    assert.equal(onlyNumbers("hello world"),false);
});

QUnit.test( "Validate input", function( assert ) {
    assert.equal(validateInput(1,"rate"),true);
    assert.equal(validateInput(-1,"rate"),false);
    assert.equal(validateInput(0,"rate"),false);
    assert.equal(validateInput(100,"rate"),true);
    assert.equal(validateInput(-100,"rate"),false);
    assert.equal(validateInput(101,"rate"),false);
    assert.equal(validateInput(1,"period"),true);
    assert.equal(validateInput(-1,"period"),false);
    assert.equal(validateInput(0,"period"),false);
    assert.equal(validateInput(30,"period"),true);
    assert.equal(validateInput(35,"period"),false);
    assert.equal(validateInput(10,"period"),true);
    assert.equal(validateInput(1,"PV"),true);
    assert.equal(validateInput(-1,"PV"),false);
    assert.equal(validateInput(0,"PV"),false);
    assert.equal(validateInput(30,"initial_payment"),true);
    assert.equal(validateInput(0,"initial_payment"),true);
    assert.equal(validateInput(-1,"initial_payment"),false);
    assert.equal(validateInput(-1,"initi_payment"),false);
    assert.equal(validateInput(100,"initi_payment"),false);
    assert.equal(validateInput(1,"PW"),false);
});

QUnit.test( "Validate payment", function( assert ) {
    assert.equal(validatePayment(1),true);
    assert.equal(validatePayment(-1),false);
    assert.equal(validatePayment(0),true);
    assert.equal(validatePayment(36000),true);
});

QUnit.test( "test flags", function( assert ) {
    assert.equal(checkFlags({rate:1,PV:0,period:1,initial_payment:1}),false);
    assert.equal(checkFlags({rate:0,PV:0,period:0,initial_payment:0}),false);
    assert.equal(checkFlags({rate:1,PV:1,period:1,initial_payment:1}),true);
    assert.equal(checkFlags({rate:1,PV:1,period:1,initial_payment:0}),false);
    assert.equal(checkFlags({rate:1,PV:0,period:0,initial_payment:0}),false);
    
});

QUnit.test( "test name of calculation", function( assert ) {
    assert.equal(validateCalcName(""),false);
    assert.equal(validateCalcName("aaa"),true);
    assert.equal(validateCalcName("calc 1"),true);
    assert.equal(validateCalcName("1212"),true);
    assert.equal(validateCalcName("-1"),true);
    
});


QUnit.test( "test data string creation", function( assert ) {
     assert.equal(createDataString({rate:1,PV:1000,period:1,initial_payment:0}),"&rate=1&PV=1000&period=1&initial_payment=0");
    assert.equal(createDataString({rate:10,PV:1000,period:1,initial_payment:0}),"&rate=10&PV=1000&period=1&initial_payment=0");
    assert.equal(createDataString({rate:10,PV:1000,period:15,initial_payment:1000}),"&rate=10&PV=1000&period=15&initial_payment=1000");
});

QUnit.test( "Outstanding balance calculation", function( assert ) {
    assert.equal(calcOutstBal(4219.28414,500000,6,15).toFixed(2),"0.00");
    assert.equal(calcOutstBal(4219.28414,500000,6,179/12).toFixed(2),"4198.29");
    assert.equal(calcOutstBal(4219.28414,500000,6,1/12).toFixed(2),"498280.72");
    assert.equal(calcOutstBal(532,30000,8.4,1/12).toFixed(2),"29678.00");
    assert.equal(calcOutstBal(532,30000,8.4,2/12).toFixed(2),"29353.75");
    
});

QUnit.test( "Calculation of interest accrued", function( assert ) {
    assert.equal(calcInterest(500000,6,1/12).toFixed(2),"2500.00");
    assert.equal(calcInterest(500000,6,1).toFixed(2),"30838.91");
    assert.equal(calcInterest(500000,6,2).toFixed(2),"63579.89");
    assert.equal(calcInterest(30000,8.4,1/12).toFixed(2),"210.00");
});

QUnit.test( "Calculation of percent paid as interest", function( assert ) {
    assert.equal(calcInterestPaid(2500.00*12,4219.28414).toFixed(2),"59.25");
    assert.equal(calcInterestPaid(0,100).toFixed(2),"0.00");
    assert.equal(calcInterestPaid(100*12,100).toFixed(2),"100.00");
    assert.equal(calcInterestPaid(120*12,100).toFixed(2),"100.00");
    assert.equal(calcInterestPaid(-10*12,100).toFixed(2),"-10.00");
    assert.equal(calcInterestPaid(25*12,50).toFixed(2),"50.00");
});


