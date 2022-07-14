'use strict';

/// Chuyển dữ liệu từ local về dạng object
function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

/// Lưu dữ liệu từ dạng object sang dạng chuỗi 
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/// Tảo mảng user để chứa dữ liệu dạng object, nếu mảng dữ liệu đầu vào vào là undefined thì sẽ ra dữ liệu mảng trống
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];

///// Sau đó chuyển toàn bộ users thành class để dễ dàng truy suất dữ liệu thành phần trong local
const userArr = users.map((user) => parseUser(user)); /// Dùng map để sao chép từng dữ liệu của users thành dạng cấu trúc của class trong parseUser
/// Trả về mảng UserArr có chứa dữ liệu dạng object


//// Tạo biến để lưu dữ liệu người dùng sau đó trả về dạng object để thực hiện cho các chức năng khác của bài, mỗi một tài khoản 1 userActive
let userActive = getFromStorage('userActive') 
? parseUser(getFromStorage('userActive')) // Nếu không phải undefined, trả về object có cấu trúc class trong parseUser
: null;

////  Lấy dữ liệu từ todoArr nếu có sẵn từ local
const todos = getFromStorage("todoArr") ? getFromStorage('todoArr') : [];

//// Mảng lưu trữ dữ liệu việc cần làm của todo, todoArr sẽ được cấp dữ liệu từ ô input của người dùng
const todoArr = todos.map((todo) => parseTask(todo)); /// dữ liệu trả về là 1 mảng sao chép, ban đầu sẽ là []


//// Dữ liệu người dùng được kế thửa từ class User
function parseUser(userData) {
    const user = new User(
        userData.firstname,
        userData.lastname,
        userData.username,
        userData.password,
        userData.pagesize,
        userData.category
    );
    return user;
}

//// Dữ liệu người dùng được kế thửa từ class Task
function parseTask(taskData) {
    const task = new Task(taskData.task, taskData.owner, taskData.isDone);
    return task;
}