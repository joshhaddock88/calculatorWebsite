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
//function to execute calculator functions.
//makes sure that only two numbers are being evaluated at once.
const operate = (operator, a, b) => operator(a, b);

//Two arrays of the same index, one for functions, one of corresponding symbols as a string
//This exists to simplify comparing if things have perfect equality.
const arithmaticOperators = [add, subtract, multiply, divide, power, factorial]
const arithmaticInnerText = ["+", "-", "*", "/", "x^", "x!"]

//global variables
let num1 = 0;
let num2 = 0;
let operatorDisplay = null;
let operator = null;
//'store' variables are used so that equals can you be used multiple times
//ie 2*2 = 4 * 2 = 8 * 2 = 16. You can just keep hitting '=' after 2*2
let storeNum1 = 0;
let storeNum2 = 0;
let storeOperator = null;
//TempNum is used to store the information of num as a string
let tempNum1 = '';
let tempNum2 = '';
const buttons = document.querySelectorAll('button');
const input = document.getElementById('input');
const output = document.getElementById('output');


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
        if(button.classList.contains('equals')) {
            equals();
        }
        if(button.classList.contains('delete')) {
            deleteItem();
        }
        if(button.classList.contains('clear')) {
            clear();
        }
    });
});

//All 'button' loop functions, in order

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
    //This is here those two arrays from lines 21-22 come into play.
    //Because they have the same index, the same [i] can be used to assign a function,
    //and I don't have to look for strict equality. 
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

const equals = () => {
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
        output.innerText = '';
    }
    //this is where 'store' variables are used, ref line 31-33
    if(num1 !== 0 && operator === null && num2 === 0) {
        storeNum1 = operate(storeOperator, storeNum1, storeNum2);
        input.innerText = `${storeNum1}`
        num1 = storeNum1;
        tempNum1 = num1.toString();
    }
}

const deleteItem = () => {
    // this is || so that you can delete '0'
    if(num2 !== 0 || tempNum2 !== '') {
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
}

const clear = () => {
    num1 = 0;
    num2 = 0;
    tempNum1 = '';
    tempNum2 = '';
    operator = null;
    operatorDisplay = null;
    input.innerText = '';
    output.innerText = '';
}

//This is the simplest way I could see to do keyboard functionality.
//I looked at various solutions are this one was the most straightforward.
//It's a bit lengthy, but my code is still significantly shorter than most of the ones I looked at on Odin.
window.onkeydown = function(e) {
    let x = e.key;
    let choice
    switch(x) {
        case '1':
            choice = document.querySelector('#one');
            choice.click();
            break;
        case '2':
            choice = document.querySelector('#two');
            choice.click();
            break;
        case '3':
            choice = document.querySelector('#three');
            choice.click();
            break;
        case '4':
            choice = document.querySelector('#four');
            choice.click();
            break;
        case '5':
            choice = document.querySelector('#five');
            choice.click();
            break;
        case '6':
            choice = document.querySelector('#six');
            choice.click();
            break;
        case '7':
            choice = document.querySelector('#seven');
            choice.click();
            break;
        case '8':
            choice = document.querySelector('#eight');
            choice.click();
            break;
        case '9':
            choice = document.querySelector('#nine');
            choice.click();
            break;
        case '0':
            choice = document.querySelector('#zero');
            choice.click();
            break;
        case '.':
            choice = document.querySelector('#decimal');
            choice.click();
            break;
        case 'Backspace':
            choice = document.querySelector('#delete');
            choice.click();
            break;
        case 'Delete':
            choice = document.querySelector('#delete');
            choice.click();
            break;
        case '+':
            choice = document.querySelector('#add');
            choice.click();
            break;
        case '-':
            choice = document.querySelector('#subtract');
            choice.click();
            break;
        case '*':
            choice = document.querySelector('#multiply');
            choice.click();
            break;
        case '/':
            choice = document.querySelector('#divide');
            choice.click();
            break;
        case '=':
            choice = document.querySelector('#equal');
            choice.click();
            break;
        case 'Escape':
            choice = document.querySelector('#clear');
            choice.click();
            break;
        case '^':
            choice = document.querySelector('#powerOf');
            choice.click();
            break;
        case '!':
            choice = document.querySelector('#factorial');
            choice.click();
            break;
    }
}