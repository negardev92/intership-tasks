const inputUser = document.getElementById("uname");
const inputPas = document.getElementById("psw");
const btnSubmit = document.getElementById("submitbtn");
const btnSignIn = document.getElementById("singup");
const forgotPasswordLink = document.getElementById("forgotPassword");


btnSubmit.addEventListener("click", function(e) {
    e.preventDefault();
    const username = inputUser.value;
    const password = inputPas.value;
    const users = JSON.parse(localStorage.getItem('users')) || [];        
    const foundUser = users.find(user => user.username === username && user.password === password);
    
    if (foundUser) {
        alert(`خوش آمدید ${foundUser.username}!`);
        window.location.href = "welcome.html"; 
    } else {
        alert('نام کاربری یا رمز عبور نادرست است.');
    }
       
    }
);


btnSignIn.addEventListener("click",function(e){
    e.preventDefault();
    window.location.href = "singup.html";
});


forgotPasswordLink.addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "forget.html";
    
});