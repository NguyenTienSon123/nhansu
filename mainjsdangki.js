// hàm kiểm tra định dạng của email
function emailcheck(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function save() {
    //tạo biến, lấy biến qua ID bằng phương thức DOM
    let fullName = document.getElementById('fullName').value;
    let date = document.getElementById('date').value;
    let numberPhone = document.getElementById('numberPhone').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let gender = '';
        // nếu chọn giới tính nam
        if (document.getElementById('male').checked) {
            // thì gán gender = document.getElementById('male').value
            gender = document.getElementById('male').value;
        // nếu chọn giới tính nữ 
        } else if (document.getElementById('female').checked) {
            // thì gán gender = document.getElementById('female').value
            gender = document.getElementById('female').value;
        } else if (document.getElementById('another').checked) {
            gender = document.getElementById('another').value;
        }
    
    // validate
    if (_.isEmpty(fullName)) {
        document.getElementById('fullName-error').innerHTML = 'Vui lòng nhập họ và tên';
    } else if (fullName.trim().length <= 6) {
        document.getElementById('fullName-error').innerHTML = 'Họ và tên không được nhỏ hơn 6 ký tự';
    } else {
        document.getElementById('fullName-error').innerHTML = '';
    }

    if (_.isEmpty(date)) {
        document.getElementById('date-error').innerHTML = 'Vui lòng nhập ngày sinh';
    } else {
        document.getElementById('date-error').innerHTML = '';
    }

    if (_.isEmpty(numberPhone)) {
        document.getElementById('phone-error').innerHTML = 'Vui lòng nhập số điện thoại';
    } else if (numberPhone.trim().length < 10) {
        document.getElementById('phone-error').innerHTML = 'Số điện thoại không được dưới 10 só';
    } else {
        document.getElementById('phone-error').innerHTML = '';
    }

    if (_.isEmpty(email)) {
        document.getElementById('email-error').innerHTML = 'Vui lòng nhập email';
    } else if (!emailcheck(email)) {
        document.getElementById('email-error').innerHTML = 'Email không đúng vui lòng nhập lại';
    } else {
        document.getElementById('email-error').innerHTML = '';
    }

    if (_.isEmpty(address)) {
        document.getElementById('address-error').innerHTML = 'Vui lòng nhập địa chỉ';
    } else {
        document.getElementById('address-error').innerHTML = '';
    }

    if (_.isEmpty(gender)) {
        document.getElementById('gender-error').innerHTML = 'Vui lòng chọn giới tính';
    } else {
        document.getElementById('gender-error').innerHTML = '';
    }

    if (fullName && date && numberPhone && email && address && gender) {
        // Lưu vào trong danh sách nhân viên\
        let employee = localStorage.getItem('employee') ? JSON.parse(localStorage.getItem('employee')) : [];
        employee.push({
            fullName: fullName,
            date: date,
            numberPhone: numberPhone,
            email: email,
            address: address,
            gender: gender,
        });

        localStorage.setItem('employee', JSON.stringify(employee));  

        this.printList();
    }       
}

// hàm in danh sách
function printList() {
    // câu lệnh let employee: lấy ra storage employee nếu mà nó rỗng thì gán bằng kiểu mảng còn trái lại thì lấy ra và parse nó sang kiểu JSON về Array
    let employee = localStorage.getItem('employee') ? JSON.parse(localStorage.getItem('employee')) : [];
    if (employee.length === 0) {
        document.getElementById('employee-list').style.display = 'none';
        return false;  
    } 
        document.getElementById('employee-list').style.display = 'block';

    let tablecontent = `            
        <tr>
            <td>Mã NV</td>
            <td>Tên NV</td>
            <td>Ngày sinh</td>
            <td>Giới Tính</td>
            <td>Sđt</td>
            <td>Địa chỉ</td>
            <td>Email</td>
            <td>Hành Động</td>
        </tr>`;
        
        // hàm forEach 
        employee.forEach((employee, manv) => {
            let employeeId = manv;
            manv++;
            tablecontent += `
            <tr>
                <td>${manv}</td>
                <td>${employee.fullName}</td>
                <td>${employee.date}</td>
                <td>${employee.gender}</td>
                <td>${employee.numberPhone}</td>
                <td>${employee.address}</td>
                <td>${employee.email}</td>
                <td><a href='#' onclick='deleteEmployee()'>Xóa</a></td>
            </tr>`;
        })
    
        document.getElementById('list-employee').innerHTML = tablecontent;
}

// hàm xóa thông tin nhân viên
function deleteEmployee(id) {
    let employee = localStorage.getItem('employee') ? JSON.parse(localStorage.getItem('employee')) : [];
    employee.splice(id, 1);
    localStorage.setItem('employee', JSON.stringify(employee));
    printList();
}