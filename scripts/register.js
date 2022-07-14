'use strict';

const inputFirstname = document.getElementById('input-firstname');
const inputLastname = document.getElementById('input-lastname');
const inputUsername = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password')
const inputPasswordconfirm = document.getElementById('input-password-confirm');
const btnSubmit = document.getElementById('btn-submit');

//Bat su kien vao nut Register

btnSubmit.addEventListener("click", function () {
    const user = new User(
        inputFirstname.value,
        inputLastname.value,
        inputUsername.value,
        inputPassword.value
    );

    const isvalidate = validate(user);

    if (isvalidate) {
        ///// Thêm user vào hàm userArr
        userArr.push(user);
        /// Lưu userArr vào LocalStorage
        saveToStorage("userArr", userArr);
        ///// Thông báo đăng kí thành công
        alert(' The account has already !');

        window.location.assign("../pages/login.html"); /// Chuyển hướng sang trang đăng nhập
    }
});


function validate(user) {
    let isvalidate = true;

    if (user.firstname.trim().length === 0) {
        alert('Please type First Name');  /// Nhập tên
        isvalidate = false;
    } else if (user.lastname.trim().length === 0) {  
        alert('Please type last Name');   //// Nhập họ
        isvalidate = false;
    } else if (user.username.trim().length === 0) {
        alert('Please type User name'); // Tên đăng nhập
        isvalidate = false;
    } else if (user.password === "") {
        alert('please type password');  //// Nhập mật khẩu
        isvalidate = false;
    } else if (inputPasswordconfirm.value === "") {
        alert('please type again confirm password');  /// Nhập lại mật khẩu
        isvalidate = false;
    } else if (!userArr.every((Item) => (Item.username !== user.username ? true : false))) {
        alert('Username has available, please try another username');  //// Thông báo tên đăng nhập trùng lặp
        isvalidate = false;
    } else if (user.password !== inputPasswordconfirm.value) {
        alert('password is not corrected, please try again'); //// Thông báo tên mật khẩu trùng lặp
        isvalidate = false;
    } else if (user.password.length <= 8) {
        alert('Password no any than 8 letter'); //// Mật khẩu ít hơ 8 kí tự
        isvalidate = false;
    }
    return isvalidate;
}