function add(num1, num2) {
    return num1 + num2;
}

function sub(num1, num2) {
     
    return num1 - num2;
}

function mult(num1, num2) {
    return num1 * num2;
}

function divi(num1, num2) {
    if (num2 === 0) {
        return "خطا: تقسیم بر صفر مجاز نیست.";
        
    } else {
        return num1 / num2;
    }
}

function calculate(operation) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    const operations = {
        add: () => add(num1, num2),
        sub: () => sub(num1, num2),
        mult: () => mult(num1, num2),
        divi: () => divi(num1, num2),
        default: () => "عملیات نامعتبر."
    };

   
    const result = (operations[operation] || operations.default)();

    console.log (result)
    document.getElementById('result').innerText = `نتیجه: ${result}`;
}