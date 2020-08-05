// mảng sinh viên chứa tất cả sinh vên được thêm từ form
var mangSinhVien = [];
var validate= new validation();




document.querySelector('#themSinhVien').onclick = function () {
    // Lấy thông tin sinh viên
    var sinhVien = new SinhVien();
    sinhVien.maSV = document.querySelector('#maSV').value;
    sinhVien.tenSV = document.querySelector('#tenSV').value;
    sinhVien.email = document.querySelector('#email').value;
    sinhVien.loaiSV = document.querySelector('#loaiSV').value;
    sinhVien.diemToan = document.querySelector('#diemToan').value;
    sinhVien.diemLy = document.querySelector('#diemLy').value;
    sinhVien.diemHoa = document.querySelector('#diemHoa').value;
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;

// Kiem tra du lieu hop le truoc khi dua vao mang
// .trim(): Loại bỏ khoảng trống đầu cuối của chuỗi
var valid= validate.kiemTraRong(sinhVien.maSV,'#error__maSinhVien') & validate.kiemTraRong(sinhVien.tenSV,'#error__tenSinhVien') & validate.kiemTraRong(sinhVien.email,'#error__emailSinhVien') & validate.kiemTraRong(sinhVien.loaiSV,'#error__xepLoai') & validate.kiemTraTatCaLaChuoi(sinhVien.tenSV, '#error__all__letter__tenSinhVien') & validate.kiemTraEmail(sinhVien.email, '#error__all__letter__emailSinhVien') & validate.kiemTraSo(sinhVien.diemToan,'#error__diemToan') & validate.kiemTraSo(sinhVien.diemLy,'#error__diemLy') & validate.kiemTraSo(sinhVien.diemHoa,'#error__diemHoa') & validate.kiemTraSo(sinhVien.diemRenLuyen,'#error__diemRenLuyen');

    if (!valid){
        return;
    }


    // Phương thức thêm 1 phần tử vào mảng mangSinhVien
    mangSinhVien.push(sinhVien);
    renderTableSinhVien(mangSinhVien);
    luuLocalStorage();
    // Tạo nội dung TR thẻ Sinh viên
    // var trSinhVien = document.createElement('tr');

    // // Tạo nội dung các thẻ TD
    // var tdMaSinhVien = document.createElement('td');
    // tdMaSinhVien.innerHTML = sinhVien.maSV;

    // var tdTenSinhVien = document.createElement('td');
    // tdTenSinhVien.innerHTML = sinhVien.tenSV;

    // var tdEmail = document.createElement('td');
    // tdEmail.innerHTML = sinhVien.email;

    // var tdLoaiSV = document.createElement('td');
    // tdLoaiSV.innerHTML = sinhVien.xepLoai();

    // var tdDiemTrungBinh = document.createElement('td');
    // tdDiemTrungBinh.innerHTML = sinhVien.tinhDiemTrungBinh().toFixed(2);

    // var tdDiemRenLuyen = document.createElement('td');
    // tdDiemRenLuyen.innerHTML = sinhVien.diemRenLuyen;

    // // thêm 1 trường td dành cho button xóa
    // var tdAction = document.createElement('td');
    // var btnXoa = document.createElement('td');
    // btnXoa.className = 'btn btn-danger';
    // btnXoa.innerHTML = 'Xóa';
    // btnXoa.id = 'btnXoa';

    // btnXoa.onclick = function () {
    //     btnXoa.parentElement.parentElement.remove();
    // };
    // tdAction.appendChild(btnXoa);

    // // Đưa thẻ td vào tr
    // trSinhVien.appendChild(tdMaSinhVien);
    // trSinhVien.appendChild(tdTenSinhVien);
    // trSinhVien.appendChild(tdEmail);
    // trSinhVien.appendChild(tdLoaiSV);
    // trSinhVien.appendChild(tdDiemTrungBinh);
    // trSinhVien.appendChild(tdDiemRenLuyen);
    // trSinhVien.appendChild(tdAction);


    // // Dom Đến Thẻ TB
    // document.getElementById('tableSinhVien').appendChild(trSinhVien);
}

var renderTableSinhVien = function (mangSV) {
    var chuoiTr = '';
    for (var i = 0; i < mangSV.length; i++) {
        var sinhVien = mangSV[i];
        var sv= new SinhVien();
        sv.maSV= sinhVien.maSV;
        sv.tenSV= sinhVien.tenSV;
        sv.email= sinhVien.email;
        sv.diemHoa= sinhVien.diemHoa;
        sv.diemToan= sinhVien.diemToan;
        sv.diemLy= sinhVien.diemLy;
        sv.diemRenLuyen= sinhVien.diemRenLuyen;

        // Dữ liệu sinh viên tạo ra từng dòng <tr></tr> tương ứng
        chuoiTr += `
        <tr>
        <td>${sv.maSV}</td>
        <td>${sv.tenSV}</td>
        <td>${sv.email}</td>
        <td>${sv.xepLoai()}</td>
        <td>${sv.tinhDiemTrungBinh().toFixed(2)}</td>
        <td>${sv.diemRenLuyen}</td>
        <td><button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSV}')" >Xóa</button></td>
        </tr>
        `
    }
    document.getElementById('tableSinhVien').innerHTML = chuoiTr;
}

var xoaSinhVien = function (maSV) {
    // từ mã sinh viên sẽ tìm ra sinh viên cần xóa
    for (var i = mangSinhVien.length -1; i >=0; i--) {
        // lấy ra một sinh viên
        var sinhVien = mangSinhVien[i];
        if (sinhVien.maSV === maSV) {
            mangSinhVien.splice(i, 1);
            // Xóa phần tử tại i, 1 phần tử
        }
        renderTableSinhVien(mangSinhVien);
        luuLocalStorage();
        console.lo(mangSinhVien);
    }
    renderTableSinhVien(mangSinhVien);
}
 var luuLocalStorage= function(){
    //  Bien mang sinh vien thanh chuoi
     var sMangSinhVien= JSON.stringify(mangSinhVien);
    //  luu vao local storage, set la phuong thuc luu vao manga
    localStorage.setItem('mangSinhVien',sMangSinhVien);
 }

 var layDuLieuLocalStorage= function(){

    if (localStorage.getItem('mangSinhVien')){
    //  Lay du lieu tu local storage
        var sMangSinhVien= localStorage.getItem('mangSinhVien');
        // Chuyen chuoi local storage ve mang (object) va gan cho mangSinhVien
        mangSinhVien= JSON.parse(sMangSinhVien);
        // Goi ham renderStableSinhVien 
        renderTableSinhVien(mangSinhVien);
        // console.log(sMangSinhVien);
    }
 }
 layDuLieuLocalStorage();
