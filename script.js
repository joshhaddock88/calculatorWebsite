//These are all the math functions for my calculator.
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
//this function will call and execute the arithmatic function.
const operate = (operator, a, b) => operator(a, b);

//Used these two arrays in order to loop through and compare/assign value;
const arithmaticOperators = [add, subtract, multiply, divide, power, factorial]
const arithmaticInnerText = ["+", "-", "*", "/", "x^", "x!"]

//the vars num1 & num2 will stand in for (a, b) in ^ math functions.
let num1 = 0;
let num2 = 0;
let operatorDisplay = null;
let operator = null;
//tempNum1&2 used to concat strings with +=, so input 5 & 5 = 55, not 10.
let tempNum1 = '';
let tempNum2 = '';
const buttons = document.querySelectorAll('button');
const input = document.getElementById('input');
const output = document.getElementById('output');
//this button is seperate
const clear = document.getElementById('clear')


//adds evenlisteners to all buttons.
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(button.classList.contains('digit') && operator === null) {
            //tempNum1 exists to concat the string before turning it into a number so that an input
            // of 5 & 5 will output 55 instead of 10.
            tempNum1 += button.innerText;
            num1 = Number(tempNum1);
            input.innerText = `${tempNum1}`
            output.innerText = '';
        } else if (button.classList.contains('operator')) {
            operatorDisplay = button.innerText;
            if(num2 !== 0 && num1 !== 0) {
                output.innerText = operate(operator, num1, num2);
                num1 = Number(output.innerText);
                tempNum2 = '';
                input.innerText = `${num1} ${operatorDisplay}`
            }
            for(i = 0; i < arithmaticOperators.length; i++) {
                if(operatorDisplay === arithmaticInnerText[i]){
                    operator = arithmaticOperators[i];
                    break;
                }
            }
            //this should make it so that pressing an operator twice is like
            //pressing the = sign. It doesn't work perfectly yet though.
            //This needs to be tweaked.
            input.innerText = `${num1} ${operatorDisplay}`;
        //to solve the problem of the numbers I used a little variable I'm calling tempNum2 so that I can retain the value of the
        //new number post operator while keeping the input screen looking unchanged.
        } else if (button.classList.contains('digit') && operator !== null) {
            tempNum2 += button.innerText;
            num2 = Number(tempNum2);
            input.innerText = `${num1} ${operatorDisplay} ${tempNum2}`
            output.innerText = operate(operator, num1, num2);

        } else if (button.classList.contains('equals')) {
            output.innerText = operate(operator, num1, num2);
            num1 = Number(output.innerText);
            input.innerText = `${num1}`
            operator = null;
            num2 = 0;
            tempNum2 = '';
            tempNum1 = num1.toString();
        }
    })
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