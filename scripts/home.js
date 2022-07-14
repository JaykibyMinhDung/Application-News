"use strict";

///// Các biến và thông báo ban đầu khi vào Webapp
const loginModal = document.getElementById("login-modal");
const maincontent =document.getElementById("main-content");

//// Các biến và thông báo khi đăng nhập thành công
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

/// Hiển thị giao diện đăng nhập và đăng kí
displayHome();

function displayHome() {
    if (userActive) {
        /// Nếu đăng nhập thành công : Giao diện ban đầu ẩn đi, giao diện đăng nhập thành công hiện lên
        loginModal.style.display = "none";
        maincontent.style.display = "block";

        /// Đoạn text chào mừng khi đăng nhập thành công
        welcomeMessage.textContent = `Welcome ${userActive.firstname}`;

    } else {
        // Nếu đăng nhập fail thì giao diện ban đầu không thay đổi, giao diện đăng nhập thành công bị ẩn đi
        loginModal.style.display = "block";
        maincontent.style.display = "none";
    }
}

/////// Nút đăng xuất
btnLogout.addEventListener("click", function () {
    ///// Thông báo cho người dùng khi ấn nút
    const isLogout = confirm('Are you sure Logout ?');
    if (isLogout) {
        /// Nếu true thì xóa dữ liệu khỏi local storage, 
        userActive = null;

        saveToStorage("userActive", userActive);

        /// HIển thi lại trang thái đăng nhập ban đầu
        displayHome();
    }
})