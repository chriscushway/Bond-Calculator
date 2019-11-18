
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
    assert.equal(calcPMT(6.5,200000,30,0),"1264.14");
    assert.equal(calcPMT(6.5,200000,30,10000),"1200.93");
    assert.equal(calcPMT(0,0,0,0),"NaN");
    
});

QUnit.test( "Validate numeric input", function( assert ) {
    assert.equal(onlyNumbers("111"),true);
    assert.equal(onlyNumbers("1aaaa1"),false);
    assert.equal(onlyNumbers("72.1ab"),false);
    assert.equal(onlyNumbers("hello world"),false);
});

QUnit.test( "Validate non negative input", function( assert ) {
    assert.equal(validateInput(1),true);
    assert.equal(validateInput(-1),false);
    assert.equal(validateInput(0),false);
});

QUnit.test( "Validate payment", function( assert ) {
    assert.equal(validatePayment(1),true);
    assert.equal(validatePayment(-1),false);
    assert.equal(validatePayment(0),true);
    assert.equal(validatePayment(36000),true);
});

