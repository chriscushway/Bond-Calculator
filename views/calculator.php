<div class="container">
    <div class="segment">
        <div id="calculator">
            <div><h2>Bond Calculator</h2></div>
            <div>
                <label>rate</label>
                <input id="rate" type="text">
            </div>
            <div>
                <label>Period</label>
                <input id="period" type="text">
            </div>
            <div>
                <label>Down payment</label>
                <input id="initial_payment" type="text">
            </div>
            <div>
                <label>Amount</label>
                <input id="PV" type="text">
            </div>
            
            <button id=calc-button>Calculate</button>
        </div>
        <div id="error">
            
        
        </div>
        <div id="output">
            <div id="total"><span>Payment per month</span><span>R1435</span></div>
            <br>
            <hr>
            <div id="rate"><span>Rate</span><span><span class="value"></span><span> %</span></span></div>
            <div id="period"><span>Period</span><span><span class="value"></span><span> yrs</span></span></div>
            <div id="initial_payment"><span>Down Payment</span><span><span>R </span><span class="value"></span></span></div>
            <div id="PV"><span>Loan amount</span><span><span>R </span><span class="value"></span></span></div>
            <br>
            <hr>
            <div>
                <label>Calculation Name</label>
                <input id="calc-name" type="text">
            </div>
            <div id="button-div">
                
                <button id="new">New Calculation</button>
                <button id="save">Save Calculation</button>
            </div>
        </div>
        
    </div>
    <div class="segment">
    
    </div>
</div>

