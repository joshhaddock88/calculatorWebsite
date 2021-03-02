//Fix divide by 0 'DEL' button issue LINE 147
//Add keyboard functionality.
//Calculator functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const power = (a, b) => a ** b;
const factorial = number => {
    if(number === 0) return 1;
    let product = 1;
    for(i = number; i > 0; i--) {
        product *= i;
    } return product;
};
//function to execute calculator functions
const operate = (operator, a, b) => operator(a, b);

//Two arrays of the same index, one for functions, one for that functions symbol as a string
const arithmaticOperators = [add, subtract, multiply, divide, power, factorial]
const arithmaticInnerText = ["+", "-", "*", "/", "x^", "x!"]

//global variables
let num1 = 0;
let num2 = 0;
let operatorDisplay = null;
let operator = null;
let storeNum1 = 0;
let storeNum2 = 0;
let storeOperator = null;
let tempNum1 = '';
let tempNum2 = '';
const buttons = document.querySelectorAll('button');
const input = document.getElementById('input');
const output = document.getElementById('output');
const clear = document.getElementById('clear');
const equals = document.getElementById('equal');
const deleteItem = document.getElementById('delete');


//Loops through and adds function on click to all buttons.
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(button.classList.contains('digit') && operator === null) {
            assignNum1(button.innerText);
        } else if (button.classList.contains('operator')) {
            assignOperator(button.innerText);
        } else if (button.classList.contains('digit') && operator !== null) {
            assignNum2(button.innerText);
        }
    });
});

equals.addEventListener('click', () => {
    if(num1 !== 0 && operator !== null && num2 !== 0 || num1 !== 0 && operator === factorial){
        storeOperator = operator;
        storeNum1 = num1;
        storeNum2 = num2;
        num1 = Number(output.innerText);
        tempNum1 = num1.toString();
        input.innerText = `${tempNum1}`
        operator = null;
        num2 = 0;
        tempNum2 = '';
        tempNum1 = '';
        output.innerText = '';
    }
    if(num1 !== 0 && operator === null && num2 === 0) {
        storeNum1 = operate(storeOperator, storeNum1, storeNum2);
        input.innerText = `${storeNum1}`
        num1 = storeNum1;
    }
})

clear.addEventListener('click', () => {
    num1 = 0;
    num2 = 0;
    tempNum1 = '';
    tempNum2 = '';
    operator = null;
    operatorDisplay = null;
    input.innerText = '';
    output.innerText = '';
})

const assignNum1 = innerText => {
    //in case equal button pushed twice.
    if(storeNum1 !== 0) {
        tempNum1 = '';
        storeNum1 = 0;
    }
    if(innerText === '.' && tempNum1.includes('.')){
        return input.innerText = `${tempNum1}`
    } else {
        tempNum1 += innerText;
        if(tempNum1 === '.') {
            tempNum1 = '0.';
        }
        num1 = Number(tempNum1);
        input.innerText = `${tempNum1}`
        output.innerText = '';
    }
}

const assignOperator = innerText => {
    operatorDisplay = innerText;
    if(num2 !== 0 && num1 !== 0) {
        output.innerText = operate(operator, num1, num2);
        tempNum1 = output.innerText;
        tempNum2 = '';
        num1 = Number(tempNum1);
        num2 = 0;
        input.innerText = `${tempNum1} ${operatorDisplay}`
    }
    for(i = 0; i < arithmaticOperators.length; i++) {
        if(operatorDisplay === arithmaticInnerText[i]){
            operator = arithmaticOperators[i];
            break;
        }
    }
    input.innerText = `${num1} ${operatorDisplay}`;
}

const assignNum2 = innerText => {
    let storeOutput = ''
    if(innerText === '.' && tempNum2.includes('.')){
        return input.innerText = `${num} ${operatorDisplay} ${tempNum2}`
    } else {
        tempNum2 += innerText;
        if(tempNum2 === '.') {
            tempNum2 = '0.';
        }
        num2 = Number(tempNum2);
        input.innerText = `${num1} ${operatorDisplay} ${tempNum2}`
        storeOutput = operate(operator, num1, num2);
        storeOutput = storeOutput.toFixed(10);
        storeOutput = Number(storeOutput);
        if(operatorDisplay === '/' && tempNum2 === '0') {
            output.innerText = 'ERROR'
        } else {
            output.innerText = storeOutput;
        }
    }
}

deleteItem.addEventListener('click', () => {
    //when dividing by zero, if I hit 'DEL' it deletes the zero and the division sign. Not sure why.
    //fix this!
    if(num2 !== 0 || tempNum2 !== '') {
        console.log(tempNum2);
        tempNum2 = tempNum2.slice(0, -1);
        if(tempNum2 === '0.' || tempNum2 === '0') {
            tempNum2 = '';
        }
        num2 = Number(tempNum2);
        input.innerText = `${num1} ${operatorDisplay} ${tempNum2}`
        if(num2 === 0) {
            output.innerText = ``
        } else {
            storeOutput = operate(operator, num1, num2);
            storeOutput = storeOutput.toFixed(10);
            storeOutput = Number(storeOutput);
            output.innerText = storeOutput;
        }
    }else if(operator !== null) {
        operator = null;
        input.innerText = `${num1}`;
        output.innerText = '';
    } else if(num1 !== 0 && tempNum1 !== '0') {
        tempNum1 = tempNum1.slice(0, -1);
        if(tempNum1 === '0.') {
            tempNum1 = '0';
        }
        num1 = Number(tempNum1);
        input.innerText = `${tempNum1}`;
        output.innerText = '';
    }
})