<?php
?>
<div id="bg">
    
</div>
<div class="container">
    <div class="segment">
        <div id="calculator">
            <div><span>Bond Calculator</span></div>
            <hr>
            <div>
                <label>Interest Rate</label>
                <input id="rate" type="text" placeholder="Enter rate as %">
            </div>
            <div>
                <label>Loan Term</label>
                <input id="period" type="text" placeholder="Enter period in years">
            </div>
            <div>
                <label>Deposit</label>
                <input id="initial_payment" type="text" placeholder="Enter payment">
            </div>
            <div>
                <label>Purchase Price</label>
                <input id="PV" type="text" placeholder="Enter loan amount">
            </div>
            
            <button id=calc-button>Calculate</button>
        </div>
        
    </div>
    <div class="segment" >
        
        <div class="hidden-container" id="output">
            <div id="total" class="row"><span>Payment per month</span><span>R1435</span></div>
            <br>
            <hr>
            <div id="rate" class="row"><span>Interest Rate</span><span><span class="value"></span><span> %</span></span></div>
            <div id="period" class="row"><span>Loan Term</span><span><span class="value"></span><span> yrs</span></span></div>
            <div id="initial_payment" class="row"><span>Deposit</span><span><span>R </span><span class="value"></span></span></div>
            <div id="PV" class="row"><span>Purchase Price</span><span><span>R </span><span class="value"></span></span></div>
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
        <div class="scrollBox">
            <table id="table">
                <thead>
                    <th>Year</th>
                    <th>Interest %</th>
                    <th>Capital %</th>
                </thead>
                
                <tbody>
                
                </tbody>
           
        </table>
        </div>
        
    </div>
    <div class="segment" id="graph-container">
        
            <div id="graph-info">
                <div id="graph-heading">
                    Graph showing the percentage of monthly payments that pay for interest vs capital
                </div>
                <div id="key">
                    <div class="row"><span>Interest</span><span style="background-color:#59CD90;"></span></div>
                    <div class="row"><span>Capital</span><span style="background-color:#FF5964;"></span></div>
                </div>
            </div>
            <div id="graph">

                <div id="y-axis">
                    <div class="col-50">
                        <div class="y-label"><span class="label">100</span></div>
                        <div class="y-label"><span class="label">90</span></div>
                        <div class="y-label"><span class="label">80</span></div>
                        <div class="y-label"><span class="label">70</span></div>
                        <div class="y-label"><span class="label">60</span></div>
                        <div class="y-label"><span class="label">50</span></div>
                        <div class="y-label"><span class="label">40</span></div>
                        <div class="y-label"><span class="label">30</span></div>
                        <div class="y-label"><span class="label">20</span></div>
                        <div class="y-label"><span class="label">10</span></div>

                    </div>
                    <div class="col-50">
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                    </div>
                </div>
                <div id="bar-container">

                </div>

            </div>
        
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

