

class Parent {
    constructor(a, b) {
        this.a = a;
        this.b = b;
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

class Builder {
    constructor(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }

    build() {
        return { a: this.num1,
                 b: this.num2 
            };
    }
}

function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value)
    const builder = new Builder(num1, num2);
    const inputs = builder.build();

    
    const operations = {
        add: () => new Add(inputs.a, inputs.b).calculate(),
        sub: () => new Subtract(inputs.a, inputs.b).calculate(),
        mult: () => new Multiply(inputs.a, inputs.b).calculate(),
        divi: () => new Divide(inputs.a, inputs.b).calculate()
    };
    const result = (operations[operation])
    document.getElementById('result').innerText = `نتیجه: ${result}`;
    console.log(result);
}