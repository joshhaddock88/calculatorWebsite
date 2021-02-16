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

//the vars num1 & num2 will stand in for (a, b) in ^ math functions.
let num1 = 0;
let num2 = 0;
//need to make operator equal to ^ of the above functions when the corresponding button is clicked
let operator = null;
let operatorDisplay = null;
let tempNum = '';

const buttons = document.querySelectorAll('button');
const input = document.getElementById('input');
const output = document.getElementById('output');
//this function will call and execute the arithmatic function.
const operate = (someOperator, a, b) => someOperator(a, b);

//loop through all buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        //if the button contains the class of digit (see the HTML) and an operator hasn't been used,
        //we change the text to the digit as a string, then convert that string into a number for our variable.
        if(button.classList.contains('digit') && operator === null) {
            input.innerText += button.innerText;
            num1 = Number(input.innerText);
        //this bit doesn't precisely work yet. operator = button.value technically gives the right asnwer but as a string.
        //So if I console log operator it might say "add" as the value, but it won't call the add function. See?
        } else if (button.classList.contains('operator')) {
            operatorDisplay = button.innerText;
            operator = button.value;
            input.innerText = `${num1} ${operatorDisplay}`;
        //to solve the problem of the numbers I used a little variable I'm calling tempNum so that I can retain the value of the
        //new number post operator while keeping the input screen looking unchanged.
        } else if (button.classList.contains('digit') && operator !== null) {
            tempNum += button.innerText;
            num2 = Number(tempNum);
            input.innerText = `${num1} ${operatorDisplay} ${num2}`
            console.log(num1);
            console.log(operator);
            console.log(num2);
        } else if (button.classList.contains('equals')) {
        //have to figure out how to make this part work. Right now if I punched in "2 + 3" on my calculator
        //console log would show (num1 = 2) (operator = add) (num2 = 3) but unfortunately operator = "add" not the const add. See?
        //So it's unable to execute. Will solce this tomorrow.
        }
    })
})