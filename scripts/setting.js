'use strict';

if (userActive) {
    ///// Đăng nhập để sử dụng app
    const inputPageSize = document.getElementById("input-page-size");
    const inputCategory = document.getElementById("input-category");
    const btnSubmit = document.getElementById("btn-submit");

    /// Ấn nút để cài đặt
    btnSubmit.addEventListener("click", function () {
        ///// Kiểm tra input
        if (validate()) {

            //// Thay đổi pagesize và category sau khi nhập
            userActive.pagesize = Number.parseInt(inputPageSize.value);
            userActive.category = inputCategory.value;

            //// Lưu vào local Storage
            saveToStorage("userActive", userActive);

            /// Tìm username trong mảng, trả về số thứ tự bằng độ dài của mảng mà mình tìm được
            const index = userArr.findIndex(
                userItem => userItem.username === userActive.username  // Index trả về bằng 0
            );
            //// Thay đổi phần tử đối tượng trong mảng useArr giống với useractive
            userArr[index] = userActive;
            saveToStorage("userArr",userArr); /// Lưu kết quả 

            alert("You are setting succesful !"); /// Thông báo cho người dung biết thành công
            /// Trả về input rỗng ban đầu
            inputPageSize.value = ""; 
            inputCategory.value = "General";
        }
    });
    /// Hàm lọc dữ liệu đầu vào
    function validate() {
        let isValidate = true;
        //// Số không phù hợp
        if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
            alert("Number page not Reasonable");
            isValidate = false;
        }  /// User để trống ô category
        if (inputCategory.value === "") {
            alert("You do not type Category !");
            isValidate = false;
        }
        //// Biến so sánh để trả về kết quả cho nút submi
        return isValidate;
    }
} else {
    alert("please Login your account or register"); /// Người dùng chưa đăng nhập
    window.location.assign("../index.html");
}