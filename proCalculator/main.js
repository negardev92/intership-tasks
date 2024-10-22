const inputNumber1 = document.getElementById('num1');
const inputNumber2 = document.getElementById('num2');
const addop = document.getElementById('add');
const minop = document.getElementById('min');
const multiplyop = document.getElementById('Multiply');
const divideop = document.getElementById('Divide');
const btnequal = document.getElementById('equal');

let operation; 

addop.addEventListener('click', () => operation = 'add');
minop.addEventListener('click', () => operation = 'sub');
multiplyop.addEventListener('click', () => operation = 'mult');
divideop.addEventListener('click', () => operation = 'divi');

btnequal.addEventListener('click', function(e) {
    e.preventDefault();

    class Parent {
        constructor(inputNumber1, inputNumber2) {
            this.a = parseFloat(inputNumber1.value);
            this.b = parseFloat(inputNumber2.value);
        }
    }

    class Add extends Parent {
        calculate() {
            return this.a + this.b;
        }
    }

    class Subtract extends Parent {
        calculate() {
            return this.a - this.b;
        }
    }

    class Multiply extends Parent {
        calculate() {
            return this.a * this.b;
        }
    }

    class Divide extends Parent {
        calculate() {
            if (this.b === 0) {
                return "خطا: تقسیم بر صفر مجاز نیست.";
            }
            return this.a / this.b;
        }
    }

    let result; 
    
    if (operation === 'add') {
        const addition = new Add(inputNumber1, inputNumber2);
        result = addition.calculate();
    } else if (operation === 'sub') {
        const subtraction = new Subtract(inputNumber1, inputNumber2);
        result = subtraction.calculate();
    } else if (operation === 'mult') {
        const multiplication = new Multiply(inputNumber1, inputNumber2);
        result = multiplication.calculate();
    } else if (operation === 'divi') {
        const division = new Divide(inputNumber1, inputNumber2);
        result = division.calculate();
    } else {
        result = "عملی انتخاب نشده است.";
    }
   
    document.getElementById('result').innerText = `نتیجه: ${result}`;
});