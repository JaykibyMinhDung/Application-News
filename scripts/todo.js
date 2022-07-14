'use strict';

if (userActive) {
    /////// Nếu không đăng nhập sẽ không thể truy cập chức năng todo

    /// Một số biến trong chức năng todo
    const todoList = document.getElementById("todo-list");
    const btnAdd = document.getElementById("btn-add");
    const inputTask = document.getElementById("input-task");

    ///// Hiển thị các task khi bắt đầu đăng nhập browser
    displayTodoList();

    /////  function hiển thị task
    function displayTodoList() {
        //// Tạo dạng trống để mỗi lần reset, hay tải lại trang sẽ không lặp lại task
        let html = "";

        todoArr
        ////  Lọc các task có cùng tên đăng nhập để tránh lấy nhầm dữ liệu ở các usename khác
        .filter((todo) => todo.owner === userActive.username)

        //// Hiển thị tất cả các sự kiện ra danh sách
        .forEach( function (todo) {
            /* 
            Nếu todo.isDone là true thì sẽ trả về class checked ( Nghĩa là đã hoàn thành), còn không thì sẽ là hàm trống
            (Tức là không có class nào). Với điều kiện này ta dễ dàng dùng câu điều kiện if để bật tắt class checked
            */
            html += `
            <li class = ${todo.isDone ? "checked" : ""} > ${
                todo.task
            } <span class = "close">×</span></li>
            `;
        });


        ///// Thay đổi các nội dung theo những gì mới cập nhật ở todoArr
        todoList.innerHTML=html;

        ////// Hiện thông tin đã hoàn thành hay chưa
        eventToggleTasks();
        eventDeleteTasks();
    }

    //// Thêm task vào danh sách
    btnAdd.addEventListener("click", function () {
        //// Lỗi chưa nhập dánh sách
        //// Trym để xóa các khoảng trắng
        if ( inputTask.value.trim().length === 0) {
            alert("You do not write Task");
        } else {
            ///// Tạo một object mới chứa thông tin vừa nhập
            const todo = new Task(inputTask.value, userActive.username, false);
            
            ///// Thêm task mới vào local
            todoArr.push(todo);

            saveToStorage("todoArr", todoArr);

            ///// Hiển thị danh sách ra bảng
            displayTodoList();

            //// Setup lại ô trống ghi
            inputTask.value = "";
        }
    });

    function eventToggleTasks() {

        ////// Gom tất cả li trong ul thành một danh sách
        document.querySelectorAll("#todo-list li").forEach( function (liEl) {
            liEl.addEventListener("click", function (e) {
/*  Nếu click vào mỗi task thì Js sẽ so sánh dữ liệu từng mảng gửi về có khác so với các dữ liệu lấy từ
    HTML hay không. e.target sẽ lấy các dữ liệu đã được click, LiEl.chilren sẽ là toàn bộ các task được lấy về từ HTML
*/
                if (e.target !== liEl.children[0]) {
                    /// Thay đổi css mỗi khi ấn, chuyển sang dạng css đã hoàn thành
                    liEl.classList.toggle("checked");
                    //// Trả về các task có cùng username và task
                    const todo = todoArr.find(
                        (i) =>
                        i.owner === userActive.username &&  
                        i.task === liEl.textContent.slice(1,-2)                      
                    );                        
                    // console.log(todoArr[1].task)
                    /// Trả về task đã lọc, nếu task đang lọc chứa css checked là đúng thì trả về true
                    todo.isDone = liEl.classList.contains("checked") ? true : false;
                    /// Lưu vào todoAr cho các lần khởi động tiếp theo
                    saveToStorage("todoArr", todoArr);

                }
            });
        });
    }

    /// Sự kiện xóa task khi có task hoàn thành
    function eventDeleteTasks() {
        /* Gọi tất cả các task chứa class close thành một mảng, sau đó triệu tập tất cả chúng để thực hiện trình xử lý 
        click. 
        */
        document.querySelectorAll("#todo-list .close").forEach( function (closeEl) {
            closeEl.addEventListener("click", function () {
                /// Hỏi lại người dùng về việc xóa bỏ task
                const isDelete = confirm("Do you want Delete ?")
                /// Nếu có sẽ xóa
                if (isDelete) {
                    /// finđInex sẽ trả về task có cả 2 yêu cầu đều true
                    const index = todoArr.findIndex(
                        (item) =>
                        item.owner === userActive.username && 
                        item.task === closeEl.parentElement.textContent.slice(0, -1)
                    );
                        //// Xóa task
                    todoArr.splice (index, 1);

                    ////Lưu vào localstorage
                    saveToStorage("todoArr", todoArr);

                    //// Hiển thị lại danh sách task
                    displayTodoList();
                }
            })
        }
    )}
} else {
    ///// Dành cho chưa đăng nhập
    alert("please Login your account or Register app");
    window.location.assign("../index.html");
}