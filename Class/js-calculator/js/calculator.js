 // ==========================================
// 1. UI SELECTORS
// ==========================================
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate-btn');
const resultStatus = document.getElementById('result-status');

// ==========================================
// 2. TODO: BASIC CALLBACK MATH FUNCTIONS (Students write these)
// ==========================================

// TODO: Write "add" callback expression (a, b) => ...
const add = (a, b) => { return a+b; }

// TODO: Write "subtract" callback expression (a, b) => ...
const substract = (a, b) => { return a-b; }

// TODO: Write "multiply" callback expression (a, b) => ...
const multiply = (a, b) => { return a*b; }

// TODO: Write "divide" callback expression (a, b) => ...
// Rule: Guard against division-by-zero! Return an Error or string warning.
const divide = (a, b) => {
    /*try {
        return a/b;
    } catch(error) {
        return -1;
    }*/

    if(b==0) throw new Error("Can't divide by zero");
    return a/b;
}


// ==========================================
// 3. TODO: HIGHER-ORDER FUNCTION ENGINE (Students write this)
// ==========================================

// TODO: Write the "calculator" orchestrator function
// Arguments: valA (number), valB (number), callback (Function)
// Checks:
//   - Is valA and valB actually valid numbers?
//   - Is callback actually a function?
// Execution: Returns callback(valA, valB)
const calculator = (valA, valB, callback) => {
    return callback(valA, valB);
};

const sayHello = (name) => {
    return `Hello ${name}`;
};


// ==========================================
// 4. TODO: EVENT OBSERVER & INTEGRATION WIRING (Students write this)
// ==========================================
calculateBtn.addEventListener('click', () => {
    //alert('click');
    try {
        // TODO: Extract values from the inputs and parse them as floats.
        const valA = parseFloat(num1Input.value);
        const valB = parseFloat(num2Input.value);

        // TODO: Retrieve the selected operation string value.
        const oper = operationSelect.value;
        if(num1Input.value === "" || num2Input.value === "")
            throw new Error("Introduce a number");
        if(!oper)
            throw new Error("Select an operation");

        // TODO: Match the selected operation string to its corresponding function reference.
        let targetCallback;
        switch(oper) {
            case "add": targetCallback = add; break;
            case "substract": targetCallback = substract; break;
            case "multiply": targetCallback = multiply; break;
            case "divide": targetCallback = divide; break;
            default: throw new Error("Operation not defined"); break;
            
        }

        // TODO: Execute the higher-order 'calculator' function with input values and the matched function reference.
        const res = calculator(valA, valB, targetCallback);

        // TODO: Update resultStatus text, toggling classes (e.g., alert-success vs alert-danger) based on outcomes!
        resultStatus.className = "alert alert-success text-center";
        resultStatus.textContent = `Result: ${res}`;
    } catch(error) {
        resultStatus.className = "alert alert-danger text-center";
        resultStatus.textContent = `Error: ${error.message}`;
    }
});