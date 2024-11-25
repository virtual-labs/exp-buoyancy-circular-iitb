let maindiv = document.getElementById('pannelcreate');
function activity1() {
    let text = `
    <div class='divide'>
    <div style='margin-top: 2vw;'>
        <br>
        <h4 class="center-text fs-20px fw-600"></h4>

        <div class="fs-16px">
        <h5>Center of Buoyancy of Circular Log</h5>
        <p>Learning Objective: Buoyancy and Floatation of Submerged Log</p>
        </div>

        <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act1();' id='temp-btn-1' >Next</button>
    </div>
    </div>
    `;
    maindiv.innerHTML = text;
    setTimeout(() => { MathJax.typeset(); }, 300);
}
//for starting first activity
function start_act1() {
    let temp_btn = document.getElementById('temp-btn-1');
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text("Caculate", "tb1-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='tb1-box'>

        <h5>A wooden log of diameter ${diamter}m and lenght ${l}m float in water. Find the depth of the wooden log submerged in water. The density of wooden log is ${den} kg/m<sup>3</sup></h5>
        <br>

        <div style='text-align: center;'><img style='width: 50%;' src='./images/dia.png'></div>


        <p style='text-align: center; font-size: 18px;'>
        Weight of wooden block =
            <span style='display: inline-block;' >
                $$ \\frac{\\pi}{4} \\times d^2 \\times length  \\times \\rho \\times g $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal0-inp' > <span id='cal0-val-sp'></span> N
            <br>
            <span style='display: inline-block;' >
                $$ \\rho  = ${den} kg/m^3 $$
            </span>
            <br>
            <span style='display: inline-block;' >
                $$ g  = 9.81 m/s^2 $$
            </span>
        </p>

        <h5>For Equilibrium, weight of the wooden log = weight of the water displaced </h5>
        <br>
        <p style='text-align: center;'> W = volume of water displaced x &rho_w; x g </p>
        <p style='text-align: center;'> 
        Volume of water displaced V =
            <span style='display: inline-block;' >
            $$ \\frac{W}{\\rho_w \\times g} $$
            </span> 

            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='v-inp' > <span id='v-val-sp'></span> m<sup>3</sup>
            <br>
        </p>


        <h5> Volume of log inside water = Area of ADCA x length = volume of water displaced  </h5>
        <br>
        <p style='text-align: center;'> 
        Area (A) of ADCA =
            <span style='display: inline-block;' >
            $$ \\frac{V}{length} $$
            </span> 

            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='a-inp' > <span id='a-val-sp'></span> m<sup>2</sup>
            <br>
        </p>


        <h5> From dimensions of wooden block  </h5>
        <br>
        <p style='text-align: center;'> Area of ADCA = Area of ADCOA + Area of triangle AOC </p>


        <p style='text-align: center; font-size: 18px;'>
            <span style='display: inline-block;' >
                $$ A = \\pi r^2 (\\frac{360 - 2\\theta}{360}) + \\frac{1}{2} r cos(\\theta) \\times 2sin(\\theta) $$
            </span>

            <br>

            <span style='display: inline-block;' >
            $$ \\theta = \\frac{180}{\\pi r^2} [\\pi r^2 + r^2cos(\\theta)sin(\\theta) - A] $$
            </span>

            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal1-inp' > <span id='cal1-val-sp'></span> degree
            <br>

        </p>


        <p id='show-actual' style='text-align: center; font-size: 18px;; display: none;'>
           More accurate value of &theta; is <span id='dsp-acc-value'></span>
        </p>

        <div id='last-cal' style='display: none;'>
            <p  style='text-align: center; font-size: 18px;'>
                <span style='display: inline-block;' >
                    $$ h = r + rcos(\\theta) $$
                </span>

                = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal2-inp' > <span id='cal2-val-sp'></span> degree
                <br>

            </p>

            <div style='text-align: center;'><button class='btn btn-info std-btn' onclick='verify2();'  id='temp-btn-12' >Verify</button></div>

        </div>


       
        <div style='text-align: center;'><button class='btn btn-info std-btn' onclick='verify_a1();'  id='temp-btn-120' >Verify</button></div>
        

    
        <br> 

        <div id='nxt' style='display: none;'>
            <div id='tab-1'></div>
        </div>
    </div>

    `;
    maindiv.innerHTML += text;
    hide_all_steps();
    setTimeout(() => { show_step('tb1-box'); }, 150);
    setTimeout(() => { MathJax.typeset(); }, 300);
    internal_calculations();
}
function internal_calculations() {
    weight = (Math.PI / 4) * (Math.pow(diamter, 2)) * l * den * 9.81;
    v = weight / (1000 * 9.81);
    A = v / l;
    for (let i = 0; i < 100; i++) {
        theta = 180 / (Math.PI * (Math.pow(radius, 2))) * (Math.PI * (Math.pow(radius, 2)) + (Math.pow(radius, 2)) * Math.cos(theta * Math.PI / 180) * Math.sin(theta * Math.PI / 180) - A);
    }
    theta = theta % 360;
    h = radius + radius * Math.cos(theta);
}
function verify_a1() {
    let btn = document.getElementById('temp-btn-120');
    console.log(`weigth = ${weight}, v => ${v}, area => ${A} theta => ${theta}, h => ${h}`);
    let inp0 = document.getElementById('cal0-inp');
    let sp0 = document.getElementById('cal0-val-sp');
    let v_val = document.getElementById('v-inp');
    let sp_v = document.getElementById('v-val-sp');
    let a_val = document.getElementById('a-inp');
    let sp_a = document.getElementById('a-val-sp');
    let inp1 = document.getElementById('cal1-inp');
    let sp1 = document.getElementById('cal1-val-sp');
    if (!verify_values(parseFloat(inp0.value), weight)) {
        alert('weight is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(v_val.value), v)) {
        alert('weight is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(a_val.value), A)) {
        alert('weight is incorrect, calculate again.');
        return;
    }
    if (!verify_values(parseFloat(inp1.value), theta)) {
        alert('theta is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp0.remove();
    sp0.innerText = `${(weight).toFixed(4)}`;
    v_val.remove();
    sp_v.innerText = `${(v).toFixed(4)}`;
    a_val.remove();
    sp_a.innerText = `${(A).toFixed(4)}`;
    inp1.remove();
    sp1.innerText = `${(theta).toFixed(4)}`;
    alert('Your entered values are correct!!');
    let ele0 = document.getElementById('show-actual');
    ele0.style.display = 'block';
    let v1 = document.getElementById('dsp-acc-value');
    v1.innerText = theta.toString();
    let ele = document.getElementById('last-cal');
    ele.style.display = 'block';
}
function verify2() {
    let inp2 = document.getElementById('cal2-inp');
    let sp2 = document.getElementById('cal2-val-sp');
    let btn = document.getElementById('temp-btn-12');
    if (!verify_values(parseFloat(inp2.value), h)) {
        alert('depth (h) is incorrect, calculate again.');
        return;
    }
    inp2.remove();
    btn.remove();
    sp2.innerText = `${h.toFixed(4)}`;
}
activity1();
//# sourceMappingURL=activity1.js.map