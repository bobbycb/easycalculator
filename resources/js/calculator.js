const buttons = document.querySelectorAll("button");
const currentResult = document.getElementById("currentResult");
const formerInput = document.getElementById("formerInput");

buttons.forEach( button => {
    button.addEventListener("click", input => {
        console.log(input.target.dataset.value);
    });
})

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

const deleteChar = (value) => {
    if(value) {
       return String(value).substring(0, value.length-1); 
    }return;
}

const change = (value) => {
    const valueStr = String(value);
    const lengthStr = valueStr.length;

    if(valueStr[lengthStr - 1] === ",") {
        return String(Number(deleteChar(valueStr)) * (-1)).concat(",");
    }
    
    return Number(valueStr) * (-1);
}