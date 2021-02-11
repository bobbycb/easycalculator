const buttons = document.querySelectorAll("button");
const currentResult = document.getElementById("currentResult");
const formerInput = document.getElementById("formerInput");

buttons.forEach( button => {
    button.addEventListener("click", input => {
        calculator(input.target.dataset.value);
    });
})

const calculator = (value) => {
    // needed for check the length
    const displayStr = String(currentResult.innerHTML);

    // check for number-buttons
    if(!isNaN(value)) {
        if((displayStr.length === 1) && (displayStr === "0") ) {
            currentResult.innerHTML = value;
        } else {
            currentResult.innerHTML += value;
        }
    // check for comma-button
    } else if (value === ",") {
        if (!currentResult.innerHTML.includes(",")) {
            currentResult.innerHTML += value;
        }  
    // check for functions-buttons
    } else {

        switch (value) {
            case 'clearAll':
                clearAll(value);
                break;
            case 'del':
                deleteChar();
                break;
            case 'change':
                alterSign();
                break;
            default:
                return;
        }
    }
    
}

const add = (a, b) => { 
    return a + b;
};

const substract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
};

const addComma = (value) => {
    return value + ",";
}

const clearCurrentResult = () => {
    currentResult.innerHTML = 0;
}

const clearAll = () => {
    formerInput.innerHTML = "";
    currentResult.innerHTML = "0";
}

const deleteChar = () => {
    let displayStr = currentResult.innerHTML;

    if(displayStr !== "0") {
        const newStr = displayStr.substring(0, displayStr.length-1);
        if(newStr.length === 0) {
            currentResult.innerHTML = "0";
        } else {
        currentResult.innerHTML = newStr;
        }
    } else {
        currentResult.innerHTML = "0";
    }
}

 /* parseFloat doesn't works with comma (,), so we need to replace it with a point (.) and vice versa */
const alterSign = () => {
    const displayStr = currentResult.innerHTML

    const alteredFloat = parseFloat(displayStr.replace(',', '.')) * -1;

    const alteredStr = String(alteredFloat).replace('.', ',');

    currentResult.innerHTML = alteredStr;
}