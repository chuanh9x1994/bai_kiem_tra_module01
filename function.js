// hàm tạo id ngẫu nhiên.
function uuid() {
    return Math.floor(Math.random() * 9999) + new Date().getMilliseconds();
}

// lấy dữ liệu mảng user trên local về
let students = JSON.parse(localStorage.getItem("users")) || [];

let check = -1;
// hàm lưu thông tin student.
function addDs() {
    let hoTen = document.getElementById("name").value;
    let eMal = document.getElementById("email").value;
    let soDT = document.getElementById("phone").value;
    let queQuan = document.getElementById("address").value;
    let gioiTinh = document.getElementsByName("gender");
    let gioiTinhValue = "";
    for (let i = 0; i < gioiTinh.length; i++) {
        if (gioiTinh.item(i).checked) {
            gioiTinhValue = gioiTinh.item(i).value;
        }
    }

    // Tạo đối tượng sinh viên.
    let sTDent = {
        name: hoTen,
        email: eMal,
        phone: soDT,
        address: queQuan,
        gender: gioiTinhValue,
        id: uuid(),
    }

    // kiểm tra xem khi bấm lưu sẽ thêm sv mới hay cập nhật
    if (check == -1) {
        students.push(sTDent);
        // sau khi push vào xong, thì lưu dữ liệu trên local lại.
        localStorage.setItem("users", JSON.stringify(students));

        // sau khi lưu dữ liệu xong thì gọi làm render.
        render(students);
    } else {
        let index = students.findIndex((item) => {
            return item.id == check;
        })
        students.splice(index, 1, sTDent);
        render(students);
    }
    // reset trống các ô input
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("Nam").checked = true;
    check = -1;
}

// Tạo hàm render
function render(data) {
    let elm = "";
    for (let i = 0; i < data.length; i++) {
        elm += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].email}</td>
                        <td>${data[i].phone}</td>
                        <td>${data[i].address}</td>
                        <td>${data[i].gender}</td>
                        <td>
                            <span onclick="edit(${data[i].id})" class="edit">edit</span> <span> | </span> <span onclick="del(${data[i].id})" class="delete">delete</span>
                        </td>
                        <td></td>
                    </tr>
                `
    }
    document.getElementById("tbody").innerHTML = elm;
}
render(students);

// tạo hàm xóa
function del(id) {
    // tìm vị trí phần tử  muốn xóa
    let index = students.findIndex((item) => {
        return item.id == id;
    })
    let xacNhan = confirm("bạn có muốn xóa hay không?");
    if (xacNhan == false) {
        return;
    } else {
        students.splice(index, 1)
        render(students);
    }
}

// tạo hàm edit
function edit(id) {
    // tìm vị trí phần tử cập nhật
    let index = students.findIndex((item) => {
        return item.id == id;
    })
    document.getElementById("name").value = students[index].name;
    document.getElementById("email").value = students[index].email;
    document.getElementById("phone").value = students[index].phone;
    document.getElementById("address").value = students[index].address;
    if (students[index].gender == "Nam") {
        document.getElementById("Nam").checked = true;
    } else if (students[index].gender == "Nữ") {
        document.getElementById("Nu").checked = true;
    }
    check = id;
}

// sắp xếp theo tên.
function soSanhTheoTen(a, b) {

    let tenA = a.name.toUpperCase();
    let tenB = b.name.toUpperCase();

    if (tenA < tenB) {
        return -1;
    } else if (tenA > tenB) {
        return 1;
    } else {
        return 0;
    }
}

function sapXep() {
    students.sort(soSanhTheoTen);
    render(students);
}

// tìm kiếm học viên
function search1() {
    console.log("asadsadas");
    let timSinhVien = [];
    let timTen = document.getElementById("search").value;
    let checkTen = -1;
    for (let i = 0; i < students.length; i++) {
        if (students[i].name === timTen) {
            checkTen = i;
            timSinhVien.push(students[i]);
        }
    }
    if (checkTen == -1) {
        console.log("không có sinh viên nào.");
    }
    console.log(timSinhVien);
    render(timSinhVien);
}

// cách 2
function search2() {
    let timTen = document.getElementById("search").value;
    let ketQua = students.filter((item) => {
        return item.name.indexOf(timTen) != -1;
    })
    render(ketQua);
}