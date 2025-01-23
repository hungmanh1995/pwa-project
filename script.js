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
// Xuất CSV
document.getElementById("export-csv").addEventListener("click", function() {
    const table = document.getElementById("attendance-table");
    const rows = table.rows;
    let csvContent = "Date,Check-in,Check-out,Weekday 1,Weekday 2,Holiday 1,Holiday 2,Holiday 3,Holiday 4\n";

    // Lặp qua từng dòng trong bảng và thêm vào nội dung CSV
    for (let i = 1; i < rows.length; i++) { // Bắt đầu từ i = 1 để bỏ qua header
        let row = rows[i];
        let rowData = [];
        
        for (let j = 0; j < row.cells.length; j++) {
            rowData.push(row.cells[j].textContent);
        }

        csvContent += rowData.join(",") + "\n";
    }

    // Tạo tệp CSV và tải về
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "attendance.csv");
        link.click();
    }
});

// Nhập CSV
document.getElementById("import-csv-btn").addEventListener("click", function() {
    document.getElementById("import-csv").click(); // Mở hộp thoại chọn tệp CSV
});

document.getElementById("import-csv").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const rows = content.split("\n");

            // Xóa tất cả các dòng trong bảng trước khi nhập
            const tableBody = document.getElementById("attendance-body");
            tableBody.innerHTML = "";

            // Lặp qua từng dòng trong tệp CSV và thêm vào bảng
            for (let i = 1; i < rows.length; i++) { // Bỏ qua header
                const row = rows[i].split(",");
                if (row.length === 9) { // Kiểm tra có đủ cột
                    const newRow = document.createElement("tr");
                    newRow.innerHTML = `
                        <td>${row[0]}</td>
                        <td>${row[1]}</td>
                        <td>${row[2]}</td>
                        <td>${row[3]}</td>
                        <td>${row[4]}</td>
                        <td>${row[5]}</td>
                        <td>${row[6]}</td>
                        <td>${row[7]}</td>
                        <td>${row[8]}</td>
                    `;
                    tableBody.appendChild(newRow);
                }
            }
        };

        reader.readAsText(file); // Đọc tệp CSV
    } else {
        alert("Vui lòng chọn tệp CSV hợp lệ.");
    }
});
document.getElementById("export-btn").addEventListener("click", function() {
    console.log("Export button clicked");
    exportToCSV();  // Đảm bảo rằng hàm exportToCSV được gọi
});

document.getElementById("import-btn").addEventListener("click", function() {
    console.log("Import button clicked");
    importFromCSV();  // Đảm bảo rằng hàm importFromCSV được gọi
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        console.log("Attempting to register Service Worker...");
        
        navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
    });
}