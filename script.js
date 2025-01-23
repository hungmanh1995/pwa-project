// Lưu giờ tăng ca
document.getElementById("save-overtime").addEventListener("click", function() {
    const overtimeDate = document.getElementById("overtime-date").value;
    const weekday1 = document.getElementById("weekday1").value || "-";
    const weekday2 = document.getElementById("weekday2").value || "-";
    const holiday1 = document.getElementById("holiday1").value || "-";
    const holiday2 = document.getElementById("holiday2").value || "-";
    const holiday3 = document.getElementById("holiday3").value || "-";
    const holiday4 = document.getElementById("holiday4").value || "-";

    // Kiểm tra xem có ngày tăng ca đã được chọn không
    if (!overtimeDate) {
        alert("Vui lòng chọn ngày để lưu giờ tăng ca.");
        return;
    }

    const tableBody = document.getElementById("attendance-body");
    const rows = tableBody.getElementsByTagName("tr");

    let rowExists = false;

    // Kiểm tra ngày đã tồn tại trong bảng chấm công
    for (let row of rows) {
        const dateCell = row.cells[0];
        if (dateCell.textContent === overtimeDate) {
            // Nếu ngày đã có trong bảng, cập nhật thông tin giờ tăng ca vào dòng hiện tại
            row.cells[3].textContent = weekday1;
            row.cells[4].textContent = weekday2;
            row.cells[5].textContent = holiday1;
            row.cells[6].textContent = holiday2;
            row.cells[7].textContent = holiday3;
            row.cells[8].textContent = holiday4;
            rowExists = true;
            break;
        }
    }

    // Nếu ngày chưa có trong bảng, tạo một dòng mới
    if (!rowExists) {
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${overtimeDate}</td>
            <td>-</td> <!-- Giờ vào không có trong giờ tăng ca -->
            <td>-</td> <!-- Giờ ra không có trong giờ tăng ca -->
            <td>${weekday1}</td>
            <td>${weekday2}</td>
            <td>${holiday1}</td>
            <td>${holiday2}</td>
            <td>${holiday3}</td>
            <td>${holiday4}</td>
        `;

        tableBody.appendChild(newRow);
    }

    // Lưu dữ liệu bảng vào localStorage
    saveTableDataToLocalStorage();

    // Xóa dữ liệu trong các ô nhập giờ tăng ca
    document.querySelectorAll(".overtime input").forEach(input => input.value = "");
});

// Lưu điểm danh
document.getElementById("save-attendance").addEventListener("click", function() {
    const date = document.getElementById("date").value;
    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const weekday1 = document.getElementById("weekday1").value || "-";
    const weekday2 = document.getElementById("weekday2").value || "-";
    const holiday1 = document.getElementById("holiday1").value || "-";
    const holiday2 = document.getElementById("holiday2").value || "-";
    const holiday3 = document.getElementById("holiday3").value || "-";
    const holiday4 = document.getElementById("holiday4").value || "-";

    // Kiểm tra nếu ngày chưa được nhập
    if (!date) {
        alert("Vui lòng chọn ngày để lưu điểm danh.");
        return;
    }

    const tableBody = document.getElementById("attendance-body");
    const rows = tableBody.getElementsByTagName("tr");

    let rowExists = false;

    // Kiểm tra xem ngày đã có trong bảng chấm công chưa
    for (let row of rows) {
        const dateCell = row.cells[0];
        if (dateCell.textContent === date) {
            // Nếu ngày đã có, cập nhật thông tin điểm danh vào dòng đó
            row.cells[1].textContent = checkin;
            row.cells[2].textContent = checkout;
            row.cells[3].textContent = weekday1;
            row.cells[4].textContent = weekday2;
            row.cells[5].textContent = holiday1;
            row.cells[6].textContent = holiday2;
            row.cells[7].textContent = holiday3;
            row.cells[8].textContent = holiday4;
            rowExists = true;
            break;
        }
    }

    // Nếu không có dòng tương ứng cho ngày, tạo một dòng mới
    if (!rowExists) {
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${date}</td>
            <td>${checkin}</td>
            <td>${checkout}</td>
            <td>${weekday1}</td>
            <td>${weekday2}</td>
            <td>${holiday1}</td>
            <td>${holiday2}</td>
            <td>${holiday3}</td>
            <td>${holiday4}</td>
        `;

        tableBody.appendChild(newRow);
    }

    // Lưu dữ liệu bảng vào localStorage
    saveTableDataToLocalStorage();

    // Xóa dữ liệu trong form nhập điểm danh
    document.getElementById("attendance-form").reset();
    document.querySelectorAll(".overtime input").forEach(input => input.value = "");
});

// Lưu dữ liệu bảng vào localStorage
function saveTableDataToLocalStorage() {
    const tableBody = document.getElementById("attendance-body");
    const rows = tableBody.getElementsByTagName("tr");
    const data = [];

    for (let row of rows) {
        const rowData = {
            date: row.cells[0].textContent,
            checkin: row.cells[1].textContent,
            checkout: row.cells[2].textContent,
            weekday1: row.cells[3].textContent,
            weekday2: row.cells[4].textContent,
            holiday1: row.cells[5].textContent,
            holiday2: row.cells[6].textContent,
            holiday3: row.cells[7].textContent,
            holiday4: row.cells[8].textContent
        };
        data.push(rowData);
    }

    localStorage.setItem("attendanceData", JSON.stringify(data));
}
// Tải dữ liệu từ localStorage khi trang được tải
function loadTableDataFromLocalStorage() {
    const savedData = localStorage.getItem("attendanceData");
    if (savedData) {
        const data = JSON.parse(savedData);
        const tableBody = document.getElementById("attendance-body");

        data.forEach((rowData) => {
            const newRow = document.createElement("tr");

            newRow.innerHTML = `
                <td>${rowData.date}</td>
                <td>${rowData.checkin}</td>
                <td>${rowData.checkout}</td>
                <td>${rowData.weekday1}</td>
                <td>${rowData.weekday2}</td>
                <td>${rowData.holiday1}</td>
                <td>${rowData.holiday2}</td>
                <td>${rowData.holiday3}</td>
                <td>${rowData.holiday4}</td>
            `;

            tableBody.appendChild(newRow);
        });
    }
}

// Gọi hàm tải dữ liệu khi trang được tải
window.addEventListener('DOMContentLoaded', (event) => {
    loadTableDataFromLocalStorage();
});
document.getElementById("export-btn").addEventListener("click", function() {
    const tableBody = document.getElementById("attendance-body");
    const rows = tableBody.rows;
    let csvContent = "Date,Check-in,Check-out,Weekday 1,Weekday 2,Holiday 1,Holiday 2,Holiday 3,Holiday 4\n"; // Header CSV

    for (let row of rows) {
        let rowData = [];
        for (let cell of row.cells) {
            rowData.push(cell.textContent); // Lấy dữ liệu từ các ô trong hàng
        }
        csvContent += rowData.join(",") + "\n"; // Nối các ô trong hàng thành chuỗi CSV
    }

    // Tạo file CSV và tải về
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) { // Kiểm tra trình duyệt hỗ trợ download
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "attendance_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});
document.getElementById("import-btn").addEventListener("change", function(event) {
    const file = event.target.files[0]; // Lấy tệp người dùng chọn
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const csvContent = e.target.result;
            const rows = csvContent.split("\n"); // Tách các dòng trong tệp CSV
            const tableBody = document.getElementById("attendance-body");
            tableBody.innerHTML = ""; // Xóa bảng trước khi nhập lại dữ liệu

            for (let row of rows) {
                const rowData = row.split(","); // Tách các cột trong mỗi dòng
                if (rowData.length > 1) { // Kiểm tra nếu là dòng có dữ liệu
                    const newRow = document.createElement("tr");
                    rowData.forEach(cellData => {
                        const newCell = document.createElement("td");
                        newCell.textContent = cellData;
                        newRow.appendChild(newCell);
                    });
                    tableBody.appendChild(newRow);
                }
            }
        };
        reader.readAsText(file); // Đọc nội dung tệp CSV
    }
});