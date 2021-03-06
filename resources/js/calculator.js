const buttons = document.querySelectorAll("button");
const mainInput = document.getElementById("mainInput");
const prevInput = document.getElementById("prevInput");

let tempFirstFloat, tempSecondFloat, lastOperation;
let isResult = false;

buttons.forEach( button => {
    button.addEventListener("click", input => {
        calculator(input.target.dataset.value);
    });
})

// Keydown doesn't recognize ESC or Back. Numbers are working
document.addEventListener('keypress', (e) => {
    const code = Number(e.which);
    console.log(code);
    // numbers
    if(code >= 48 && code <= 57 || code >= 96 && code <= 105) {
        calculator(String.fromCharCode(code));
    } else {
        console.log(String.fromCharCode(code));
    }
})


const calculator = (inputValue) => {
    // needed to check the length
    const displayStr = String(getInput(mainInput));

    // check for number-buttons
    if(!isNaN(inputValue)) {
        if(isResult) {
            clearVariables();
            setInput(mainInput,inputValue);
            setInput(prevInput, "");
        } else if((displayStr.length === 1) && (displayStr === "0") ) {
            setInput(mainInput,inputValue);
        } else {
            mainInput.innerHTML += inputValue;
        }
    // check for comma-button
    } else if (inputValue === ",") {
        if (!displayStr.includes(",")) {
            mainInput.innerHTML += inputValue;
        } return
    // check for functions-buttons
    } else {
        switch (inputValue) {
            case '/':
            case 'x':
            case '-':
            case '+':
                applyOperation(inputValue);
                break;
            case 'clearAll':
                clearAll();
                break;
            case 'del':
                deleteChar();
                break;
            case 'change':
                alterSign();
                break;
            case '=':
                calculate();
                break;   
            default:
                return;
        }
    }
    
}

const isPrevInputEmpty = () => {
    if(!getInput(prevInput)) {
        return true;
    } return false;
}

const applyOperation = (operation) => {
    const currentFloat = getInput(mainInput);
    
    if( isPrevInputEmpty() ) {
        tempFirstFloat = currentFloat;
        lastOperation = operation;
        addInput(prevInput, tempFirstFloat);
        addInput(prevInput, operation);
        setInput(mainInput, "0");
    } else if(isResult) {
        lastOperation = operation;
        tempFirstFloat = currentFloat;
        setInput(prevInput, currentFloat);
        addInput(prevInput, operation);
        setInput(mainInput, "0");
        isResult = false;
    } else {
        lastOperation = operation;
        setInput(prevInput, tempFirstFloat);
        addInput(prevInput, operation);
    }
}

const calculate = () => {
    const currentFloat = getInput(mainInput);
    let result; 

    if ( !isPrevInputEmpty() ) {
        tempSecondFloat = currentFloat;
        addInput(prevInput, currentFloat);
        addInput(prevInput, "=");
        result = doMathOperation(tempFirstFloat, tempSecondFloat, lastOperation);
        clearVariables();
        isResult = true;
        setInput(mainInput, result);
    } return;
}

const doMathOperation = (value1, value2, operation) => {
    const float1 = parseFloat(value1);
    const float2 = parseFloat(value2);

    switch (operation) {
        case '+': 
            return (float1 + float2);
        case '-':
            return (float1 - float2);
        case 'x':
            return (float1 * float2);
        case '/':
            return (float1 / float2);
        default:
            alert("Fehler in doMathOperation");
            break;
    }
}

const clearMainInput = () => {
    setInput(mainInput, 0);
}

const clearVariables = () => {
    tempFirstFloat = undefined;
    tempSecondFloat = undefined;
    lastOperation = undefined;
    isResult = false;
}

const clearAll = () => {
    setInput(prevInput, "");
    setInput(mainInput, "0");
    tempFirstFloat = undefined;
    tempSecondFloat = undefined;
    lastOperation = undefined;
    isResult = false;
}

const deleteChar = () => {
    let displayStr = getInput(mainInput);

    if(displayStr !== "0") {
        const newStr = displayStr.substring(0, displayStr.length-1);
        if(newStr.length === 0) {
            setInput(mainInput, "0");
        } else {
        setInput(mainInput, newStr);
        }
    } else {
        setInput(mainInput, "0");
    }
}

 /* parseFloat doesn't works with comma (,), so we need to replace it with a point (.) and vice versa */
const alterSign = () => {
    setInput(mainInput, getInput(mainInput) * -1);
}

const getInput = (field) => {
    return parseInput(field.innerHTML);
}

const setInput = (field, value) => {
    field.innerHTML = parseInput(value);
}

const addInput = (field, value) => {
    field.innerHTML += " " + parseInput(value);
} 

// returns a string-number with comma or a float-number with point for math-operations
const parseInput = (value) => {
    const valueStr = String(value);
    let newValue = "";

    if(valueStr.includes(",")) {
        newValue = parseFloat(valueStr.replace(',', '.'));
        return newValue;
    } else if(valueStr.includes(".")) {
        newValue = String(valueStr).replace('.', ',');
        return newValue;
    } else {
        return value;
    }
}