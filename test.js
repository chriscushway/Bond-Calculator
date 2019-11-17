
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