const buttons = document.querySelectorAll("button");
const currentResult = document.getElementById("currentResult");
const formerInput = document.getElementById("formerInput");

buttons.forEach( button => {
    button.addEventListener("click", input => {
        calculator(input.target.dataset.value);
    });
})

const calculator = (value) => {
    console.log(value);

    const displayStr = String(currentResult.innerHTML);
    console.log(displayStr);

    if(!isNaN(value)) {
        if((displayStr.length === 1) && (displayStr === "0") ) {
            console.log("AND");
            currentResult.innerHTML = value;
        } else {
            console.log("ADD");
            currentResult.innerHTML += value;
        }

    } else if (value === ",") {

        currentResult.innerHTML += value;

    } else {

        switch (value) {
            case (Number(value)):
                currentResult.innerHTML =+ value;
                break;
            case 'clearAll':
                clearAll(value);
                break;
            case 'del':
                deleteChar();
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

const clearAll = () => {
    formerInput.innerHTML = "";
    currentResult.innerHTML = "0";
}

const deleteChar = () => {
    let displayStr = currentResult.innerHTML;

    if(displayStr !== "0") {
        displayStr = displayStr.substring(0, displayStr.length-1);
        if(displayStr.length === 0) {
            currentResult.innerHTML = "0";
        } else {
        currentResult.innerHTML = displayStr;
        }
    } else {
        console.log("else")
        currentResult.innerHTML = "0";
    }
}

const alterSign = () => {
    const displayStr = currentResult.innerHTML;
    const displayLength = displayStr.length;

    if(displayStr[displayLength - 1] === ",") {
        // deleteChar erfordert kein Argument mehr 
        return String(Number(deleteChar(displayStr)) * (-1)).concat(",");
    }
    
    return Number(displayStr) * (-1);
}