'use strict';
/// Biến trong Login
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");
/// Đăng nhập tài khoản
btnSubmit.addEventListener("click", function () {
    const isvalidate = validate(); 
    if (isvalidate) {
        const user = userArr.find( /// Trả về mảng có chứa đúng thông tin đăng nhập
            item =>
            item.username === inputUsername.value &&
            item.password === inputPassword.value
        );
        //// user là đã có thì sẽ thông báo đăng nhập thành công
        if (user) {
            alert("Login successful")
            saveToStorage("userActive", user); /// Lưu vào Useractive để kích hoạt các chức năng
            window.location.assign("../index.html"); /// Trở về trang 
        } else {
            alert('Information error, check your password or user name'); /// Hàm trả lại kết quả sai
        }
    } 
});

function validate() {
    let isvalidate = true;
    if (inputUsername.value === "") {
        alert("please type username !"); /// Không để trống username
        isvalidate = false;
    } 
    if (inputPassword.value === "") {
        alert("please type  password"); //// Không để trống password
        isvalidate = false;
    }
    return isvalidate;
}