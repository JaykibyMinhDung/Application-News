'use strict'

////  Các biến liên quan đến New
if (userActive) {
    const newscontainer = document.getElementById("news-container");
    const btnPrev = document.getElementById("btn-prev");
    const pageNum = document.getElementById("page-num");
    const btnNext = document.getElementById("btn-next");

    
    let totalResults = 0; /// Tổng số kết quả các trang nhận từ API
    //// Dữ liệu truy suất từ API bằng fetch
    getDataNews("us", 1); // Khi vào page trang đầu tiên lúc nào cũng là trang 1 của API
    ///// Tạo một promise lấy data từ API trang tin tức
    async function getDataNews(country, page) {
        try {
            const res = await fetch(
                `https://newsapi.org/v2/top-headlines?country=${country}&category=${userActive.category}&pagesize=${userActive.pagesize}&page=${page}&apiKey=76e33dbc35f34a88b1cc87f540521a2d`
            );
                console.log(res)
            const data = await res.json();
                console.log(data.totalResults)
            if (data.status === "error" && data.code === "rateLimited") { /// Lỗi truy cập quá 100 lần/ ngày, lỗi này xảy ra khi ta kết nối quá nhều đến API trong 1 ngày
                throw new Error (data.message);
            }
            if (data.code === "corsNotAllowed") { /// Bắt lỗi khi tập tin không chạy qua sever => 
                throw new Error (data.message);
            }
            /// Hiển thị dữ liệu từ API gửi về
            displayNewList(data);
            ////  Bắt lỗi 
        } catch (err) {
            alert("Error: " + err.message);
        } 
    }


/////////////////// Các nút thay đổi trang 
// Chuyển về trang trước 
function checkBtnPrev() {
    if (pageNum.textContent == 1) {
        btnPrev.style.display = "none"; // Số trang bằng 1 thì nút sẽ ẩn
    } else {
        btnPrev.style.display = "block"; // Nếu không sẽ hiện
    }
}

function checkBtnNext() {
    if (pageNum.textContent == Math.ceil(totalResults/userActive.pagesize)) {  /// Nếu số của page = 0, thì ẩn nút next
        btnNext.style.display = "none"; //Số trang đã tối đa thì nút sẽ ẩn
    } else {
        btnNext.style.display = "block"; // Số trang chưa tối đa sẽ hiện
    }
}
//// Hiển thị số lần nhập trang bằng số nội dung hiện trên textcontent của li pagenumber ( theo chiều hướng giảm)
btnPrev.addEventListener("click", function () {
    getDataNews("us", -- pageNum.textContent);
});
//// Hiển thị số lần nhập trang bằng số nội dung hiện trên textcontent của li pagenumber (Theo chiều hướng tăng)
btnNext.addEventListener("click", function () {
    getDataNews("us", ++ pageNum.textContent);
})

function displayNewList(data) {
    
    totalResults = data.totalResults; //// Thay đổi từ 0 lên số trang của API
    ///// Kiểm tra mỗi lần hiện trang mới xem có cần ẩn nút pre hay next không 
    checkBtnNext();
    checkBtnPrev();
    //// Tạo khoảng trống để tránh nhân đôi số lượng dữ liệu mỗi khi tải
    let html = "";
    /// Hiển thị tất cả kết quả của yêu cầu nhưng trong giới hạn pagesize
    data.articles.forEach(function (article) {
        html += `
        <div class="card flex-row flex-wrap">
            <div class="card mb-3">
                <div div class="row no-gutters">
                <div class = "img-banner col-md-4">
                    <img src=${
                        article.urlToImage /// Hiển thị ảnh từ API
                        ? article.urlToImage
                        : "no_image_available.png"
                    } class="card-img" alt="img"/>
                </div>
                    <div class="col-md-8">
                        <div class= "card-body">
                        <h4 class="card-title"> ${article.title /*Hiển thị tiêu đề trùng với API*/} </h4> 
                        <p class = "card-text"> ${article.description /*Hiển thị mô tả nội dung trùng với API*/} </p>
                        <a href= ${article.url} class="btn btn-primary" target="_blank"> view </a>
                        </div>
                    </div>
                </div>    
            </div>        
        </div>
        `;
    });
    /// Hiện tin tức
    newscontainer.innerHTML = html;
    } 

} else {
    alert("please Login your account or register");
    window.location.assign("../index.html");
}