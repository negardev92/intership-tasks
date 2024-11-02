const btnSubmitForm = document.getElementById("btnsubmitform");
const btnLogin = document.getElementById("btnlogin");
const inputUser = document.getElementById("uname");
const inputPas = document.getElementById("psw");

btnSubmitForm.addEventListener("click", function (e) {
    e.preventDefault();
    const username = inputUser.value;
    const password = inputPas.value;

    function validateInputs() {
        const usernamePatternemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const usernamePattermobaile = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
        const passwordPattern = /^.{6,}$/;

        inputUser.style.border = "";
        inputPas.style.border = "";

        //check number &email
        if (!isNaN(username)) {
            console.log('عدد وارد شده ')
            if (!usernamePattermobaile.test(username) && username !== "") {
                inputUser.style.border = "2px solid red";
                alert("شماره همراه نامعتبر است ");

                return false;
            }
        }
        else {
            if (!usernamePatternemail.test(username) && username !== "") {
                inputUser.style.border = "2px solid red";
                alert("ایمیل نامعتبر است ");

                return false;
            }


        }
        //check password lenght
        if (!passwordPattern.test(password) && password !== "") {
            inputPas.style.border = "2px solid red";
            alert("رمز عبور باید حداقل 6 کاراکتر و شامل حداقل یک عدد باشد.");

            return false;
        }

        return true;

    }
    if (username !== "" && password !== "" && validateInputs()) {

        const user = { username, password, email };

        let users = JSON.parse(localStorage.getItem('users')) || [];

        users.push(user);

        localStorage.setItem('users', JSON.stringify(users));
        alert("ثبت نام انجام شد ");

    } else {
        inputUser.style.border = "2px solid red";
        inputPas.style.border = "2px solid red";

        alert("تمام فیلد ها اجباری است ")
    }


});

btnLogin.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "index.html";

});



