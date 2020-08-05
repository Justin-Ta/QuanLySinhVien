var svService = new SinhVienService();
// Giao tiếp với api thông qua axios
var getApiSinhVien = function () {
  var objectAPI = {
    // đường dẫn đi đến dile hoặc link do backend cung cấp
    url: "http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien",
    method: "GET", // Phương thức backend cung cấp
  };

  // Gửi yêu cầu dữ liệu đến backend và trả về promise
  var promise = axios(objectAPI);

  // Xử lý thành công
  var funcSuccess = function (result) {
    console.log(result.data);
    renderTableSinhVien(result.data);
  };

  // Xử lý thất bại
  var funcFail = function (error) {
    console.log(error);
  };

  // then(): hàm nhận vào giá trị là 1 hàm xử lý thành công
  // catch(): hàm nhận vào giá trị là 1 hàm xử lý thất bại

  promise.then(funcSuccess).catch(funcFail);
};

// Lưu ý: ajax là hàm xử lý bất đồng bộ (Do trong thời gian lấy dữ liệu từ sever thì sẽ thực thi những hàm khác)
getApiSinhVien();
var renderTableSinhVien = function (mangSinhVien) {
  var contentTable = "";
  // sau khi lấy được data từ backend >> tạo bảng giao diện
  for (var i = 0; i < mangSinhVien.length; i++) {
    // lấy ra từng sinh viên trong dữ liệu
    var sinhVien = mangSinhVien[i];
    // Tạo ra 1 sv từ prototype sinh vien
    var sv = new SinhVien();
    sv.maSV = sinhVien.MaSV;
    sv.tenSV = sinhVien.HoTen;
    sv.email = sinhVien.Email;
    sv.diemToan = sinhVien.DiemToan;
    sv.diemLy = sinhVien.DiemLy;
    sv.diemHoa = sinhVien.DiemHoa;
    sv.diemRenLuyen = 5;

    contentTable += `
        <tr>
        <td>${sv.maSV}</td>
        <td>${sv.tenSV}</td>
        <td>${sv.email}</td>
        <td>${sv.xepLoai()}</td>
        <td>${sv.tinhDiemTrungBinh().toFixed(2)}</td>
        <td>${sv.diemRenLuyen}</td>
        <td>
        <button class="btn btn-primary" onclick=chinhSuaSinhVien('${sv.maSV}')>Chinh Sua</button>
        <button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSV}')" >Xóa</button></td>
        </tr>
        `;
  }
  document.querySelector("#tableSinhVien").innerHTML = contentTable;
};

// Chinh sua sinh vien
var chinhSuaSinhVien= function(maSV){
  var promise= svService.layThongTinSinhVien(maSV);
  promise.then(function(result){
    console.log(result.data);
    var sinhVienEdit= result.data;
    document.getElementById('maSV').value= sinhVienEdit.MaSV;
    document.getElementById('tenSV').value= sinhVienEdit.HoTen;
    document.getElementById('email').value= sinhVienEdit.Email;
    document.getElementById('diemToan').value=sinhVienEdit.DiemToan;
    document.getElementById('diemLy').value=sinhVienEdit.DiemLy;
    document.getElementById('diemHoa').value=sinhVienEdit.DiemHoa;

    // Khoa ma lai khong cho chinh sua
    document.getElementById('maSV').disabled=true;
    document.getElementById('themSinhVien').style.display='none';
  }).catch(function(error){console.log(error);})
}

// Lưu Thông Tin Sinh Vien
document.getElementById('luuThongTinSinhVien').onclick= function(){
  // Lấy thông tin sinh viên gán vào data
  var sinhVienCapNhat= {
    "MaSV": document.getElementById("maSV").value,
    "HoTen": document.getElementById("tenSV").value,
    "Email": document.getElementById("email").value,
    "SoDT": 12345,
    "CMND": 12345,
    "DiemToan": document.getElementById("diemToan").value,
    "DiemLy": document.getElementById("diemLy").value,
    "DiemHoa": document.getElementById("diemHoa").value,
  }
  // Gọi service cập nhật sever
  var promise= svService.capNhatSinhVien(maSV);
  promise.then(function(result){
    console.log(result.data);
    // Load lại sever
    getApiSinhVien();
    document.getElementById('maSV').disabled=false;
    document.getElementById('themSinhVien').style.display='block';
    document.getElementById('luuThongTinSinhVien').disabled= true;
    // Khoa ma lai khong cho chinh sua
    document.getElementById('maSV').disabled=true;
    document.getElementById('themSinhVien').style.display='none';
  }).catch(function(error){console.log(error);})
  console.log(sinhVienCapNhat);

}

// Them dữ liệu lên server qua api post
document.getElementById("themSinhVien").onclick = function () {
  // Lấy thông tin gán vào thông tin yêu cầu
  var objectData = {
    MaSV: document.getElementById("maSV").value,
    HoTen: document.getElementById("tenSV").value,
    Email: document.getElementById("email").value,
    SoDT: 12345,
    CMND: 12345,
    DiemToan: document.getElementById("diemToan").value,
    DiemLy: document.getElementById("diemLy").value,
    DiemHoa: document.getElementById("diemHoa").value,
  };
  console.log(objectData);
  // dùng Axios thêm dữ liệu đưa lên backend xử lý
  var objectAxios = {
    url: "http://svcy.myclass.vn/api/SinhVien/ThemSinhVien",
    method: "POST",
    data: objectData,
  };

  var promise = axios(objectAxios);
  getApiSinhVien();
  promise
    .then(function (result) {
      console.log(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

var xoaSinhVien = function (maSV) {
  var promise = svService.xoaSinhVien(maSV);
  promise
    .then(function (result) {
      getApiSinhVien();
      console.log(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
