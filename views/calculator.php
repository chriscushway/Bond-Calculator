<div class="container">
    <div class="segment">
        <div id="calculator">
            <div><h2>Bond Calculator</h2></div>
            <div>
                <label>rate</label>
                <input id="rate" type="text" placeholder="Enter rate as %">
            </div>
            <div>
                <label>Period</label>
                <input id="period" type="text" placeholder="Enter period in years">
            </div>
            <div>
                <label>Down payment</label>
                <input id="initial_payment" type="text" placeholder="Enter payment">
            </div>
            <div>
                <label>Amount</label>
                <input id="PV" type="text" placeholder="Enter loan amount">
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
                <button id="save" action="save">Save Calculation</button>
            </div>
        </div>
        
    </div>
    <div class="segment">
        <table id="table">
            <tr>
                <th>Year</th>
                <th>Interest %</th>
                <th>Capital %</th>
            </tr>
        </table>
    </div>
  
</div>
  <div id="modal">
        <div class="content">
            <div class="modal-header">
                <span class="close">&times;</span>
            </div>
            <br>
            <hr>
            <div class="modal-body">
                <span id="modal-heading"></span>
                <p></p>
            </div>
            
        </div>
    </div>

