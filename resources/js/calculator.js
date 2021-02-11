const buttons = document.querySelectorAll("button");

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

const deleteChar = (value) => {
    if(value) {
       return String(value).substring(0, value.length-1); 
    }return;
}