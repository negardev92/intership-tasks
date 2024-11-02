const inputUserforget = document.getElementById("uname");
const updatebtn = document.getElementById("updatebtn");

updatebtn.addEventListener("click", function (e) {
    e.preventDefault();
    const username = inputUserforget.value.trim();

    function validateInputs() {
        const usernamePatternemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const usernamePattermobaile = /^(\+98|0)?9\d{9}$/;
        inputUserforget.style.border = "";
    
        //check number &email
        if (!isNaN(username)) {
            
            if (!usernamePattermobaile.test(username) && username !== "") {
                inputUserforget.style.border = "2px solid red";
                alert("شماره همراه نامعتبر است ");
                return false;
            }
        }
        else {
             if (!usernamePatternemail.test(username) && username !== "") {
                inputUserforget.style.border = "2px solid red";
                alert("ایمیل شما نامعتبر است ");
                return false;
            }
    
            
        }
    
        return true;
    
    }
    if(validateInputs()){
        const result = searchInLocalStorage(username);
        alert(result);
    }

    function searchInLocalStorage(username) {
        // دریافت داده‌ها از localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        // جستجو در داده‌ها
         const foundUser = users.find(user => user.username === username);
        
        if (foundUser) {
            return `کاربر پیدا شد: ${JSON.stringify(foundUser)}`;

        } else {
            return "کاربر مورد نظر یافت نشد.";
        }
    }

});
   
