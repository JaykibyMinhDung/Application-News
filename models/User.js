'use strict';

// Class user để đại diện cho thông tin của người dùng
class User {
constructor(
    firstname,
    lastname,
    username,
    password,
/// Số trang và nội dung của new
    pagesize = 5,
    category = "technology"
) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
/// Bất kì object con nào kế thừa sẽ có sẵn 2 thuộc tính trên
    this.pagesize = pagesize;
    this.category = category;
    }
}

//// Tạo một thông tin liên quan đến các nhiệm vụ của người dùng
class Task {
    constructor(task, owner, isDone) {
        this.task = task;
        this.owner = owner;
        this.isDone = isDone;
    }
}