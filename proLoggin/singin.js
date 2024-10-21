const btnSubmitForm = document.getElementById("btnsubmitform");
const btnLogin = document.getElementById("btnlogin");
const inputUser = document.getElementById("uname");
const inputPas = document.getElementById("psw");
const inputemail = document.getElementById("email");


btnSubmitForm.addEventListener("click", function(e) {
    e.preventDefault();
    const username = inputUser.value;
    const password = inputPas.value;
    const email = inputemail.value;
    if ( username !== "" && password !== "" && email !== ""){
        const user = { username, password, email };
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert("ثبت نام انجام شد ");
       
        console.log(users)
        console.log(user)

    }else{
        alert("تمام فیلد ها اجباری است ")
    }
       
       
});
btnLogin.addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "index.html";
    // const users = JSON.parse(localStorage.getItem('users')) || [];
            
    // const foundUser = users.find(user => user.username === username && user.password === password);
    
    // if (foundUser) {
    //     alert(`خوش آمدید ${foundUser.username}!`);
    // } else {
    //     alert('نام کاربری یا رمز عبور نادرست است.');
    // }
});
    
       

