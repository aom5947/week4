document.getElementById("changeColorBtn").addEventListener("click", function() {
    document.body.style.backgroundColor = getRandomColor();
});

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// ตรวจสอบอายุ
function checkAge() {
    let ageInput = document.getElementById("ageInput").value.trim(); // ตัดช่องว่างออก
    let age = parseInt(ageInput, 10);
    let result = "";

    // ตรวจสอบว่าเป็นตัวเลขที่ถูกต้อง
    if (isNaN(age) || age < 0) {
        alert("กรุณากรอกอายุที่ถูกต้อง (ต้องเป็นตัวเลขที่มากกว่าหรือเท่ากับ 0)");
        return;
    }

    // จัดกลุ่มอายุตามช่วงชีวิตจริง
    if (age >= 0 && age <= 2) {
        result = "ทารก";
    } else if (age <= 12) {
        result = "เด็ก";
    } else if (age <= 19) {
        result = "วัยรุ่น";
    } else if (age <= 35) {
        result = "วัยหนุ่มสาว";
    } else if (age <= 50) {
        result = "วัยกลางคน";
    } else if (age <= 65) {
        result = "วัยทอง";
    } else {
        result = "ผู้สูงอายุ";
    }

    document.getElementById("ageResult").textContent = `คุณเป็น: ${result}`;
}


// โหลด To-Do List จาก LocalStorage
document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify([]));
}

// เพิ่มงาน
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `${taskText} <button class="delete-btn">ลบ</button>`;

    taskList.appendChild(taskItem);
    saveTask(taskText);
    taskInput.value = "";

    taskItem.querySelector(".delete-btn").addEventListener("click", function() {
        taskItem.remove();
        removeTask(taskText);
    });
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `${task} <button class="delete-btn">ลบ</button>`;
        taskList.appendChild(taskItem);

        taskItem.querySelector(".delete-btn").addEventListener("click", function() {
            taskItem.remove();
            removeTask(task);
        });
    });
}

function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
if (tasks.includes(taskText)) {
    alert("งานนี้มีอยู่แล้ว!");
    return;
}


// คำนวณพื้นที่วงกลม
function calculateCircleArea() {
    let radius = parseFloat(prompt("กรุณากรอกค่า radius ของวงกลม:"));
    if (isNaN(radius) || radius <= 0) {
        alert("กรุณากรอกค่า radius ที่ถูกต้อง");
        return;
    }
    let area = Math.PI * Math.pow(radius, 2);
    alert("พื้นที่ของวงกลมคือ: " + area);
}

// ตรวจสอบเลขคู่/คี่
function checkEvenOdd() {
    let number;
    
    while (true) {
        let input = prompt("กรุณากรอกตัวเลข:");

        // เช็คว่าผู้ใช้กด Cancel หรือไม่
        if (input === null) {
            alert("ยกเลิกการทำงาน");
            return;
        }

        // แปลงค่าเป็นตัวเลข
        number = parseInt(input);

        // ตรวจสอบว่าค่าที่รับมาถูกต้องหรือไม่
        if (!isNaN(number)) {
            break;
        }

        // แจ้งเตือนให้กรอกค่าใหม่
        let retry = confirm("กรุณากรอกตัวเลขที่ถูกต้อง! ต้องการลองอีกครั้งหรือไม่?");
        if (!retry) {
            return;
        }
    }

    // ตรวจสอบเลขคู่/คี่
    let result = (number % 2 === 0) ? "เลขนี้เป็นเลขคู่" : "เลขนี้เป็นเลขคี่";
    
    // แสดงผลลัพธ์
    alert(result);
}


// ระบบสุ่มเลขหวย
let lotteryNumber = "";
let userGuess = "";

document.getElementById("generateLotteryBtn").addEventListener("click", function() {
    lotteryNumber = generateLotteryNumber();
    document.getElementById("lotteryNumber").textContent = "เลขที่ออก: " + lotteryNumber;
});

document.getElementById("checkGuessBtn").addEventListener("click", function() {
    userGuess = document.getElementById("userGuess").value;
    if (userGuess === lotteryNumber) {
        document.getElementById("result").textContent = "คุณทายถูก!";
    } else {
        document.getElementById("result").textContent = "คุณทายผิด! เลขที่ออกคือ: " + lotteryNumber;
    }
});

function generateLotteryNumber() {
    let number = "";
    for (let i = 0; i < 6; i++) {
        number += Math.floor(Math.random() * 10);
    }
    return number;
}

// คำนวณ GPA
function calculateGPA() {
    let subjects = [
        { code: "CSI203", credits: 3 },
        { code: "CSI204", credits: 3 },
        { code: "CSI206", credits: 3 },
        { code: "CSI401", credits: 3 },
        { code: "CSI402", credits: 3 }
    ];

    let totalCredits = 0;
    let totalGradePoints = 0;
    let gradeDetails = [];

    // ฟังก์ชันแปลงคะแนนเป็นเกรดและค่า GPA
    function getGradePoint(score) {
        if (score >= 80) return { grade: "A", gpa: 4.0 };
        if (score >= 75) return { grade: "B+", gpa: 3.5 };
        if (score >= 70) return { grade: "B", gpa: 3.0 };
        if (score >= 65) return { grade: "C+", gpa: 2.5 };
        if (score >= 60) return { grade: "C", gpa: 2.0 };
        if (score >= 55) return { grade: "D+", gpa: 1.5 };
        if (score >= 50) return { grade: "D", gpa: 1.0 };
        return { grade: "F", gpa: 0.0 };
    }

    subjects.forEach(function(subject) {
        let score = parseFloat(prompt(`กรุณากรอกคะแนนวิชา ${subject.code} (0-100):`));
        while (score < 0 || score > 100 || isNaN(score)) {
            score = parseFloat(prompt(`กรุณากรอกคะแนนวิชา ${subject.code} (0-100):`));
        }

        let { grade, gpa } = getGradePoint(score);
        totalCredits += subject.credits;
        totalGradePoints += gpa * subject.credits;
        gradeDetails.push(`${subject.code}: คะแนน ${score} → เกรด ${grade} (GPA: ${gpa})`);
    });

    let GPA = totalGradePoints / totalCredits;
    
    alert(`🔹 รายละเอียดเกรด 🔹\n\n${gradeDetails.join("\n")}\n\n📌 เกรดเฉลี่ยรวม (GPA): ${GPA.toFixed(2)}`);
}


// ดึงข้อมูลจาก API และแสดงผล
async function fetchUsers() {
    try {
        const response = await fetch("users.json"); // ใช้ไฟล์ JSON แทน API จริง
        const users = await response.json();

        const userList = document.getElementById("userList");
        userList.innerHTML = ""; // ล้างข้อมูลเก่าออกก่อน

        users.forEach(user => {
            const userDiv = document.createElement("div");
            userDiv.classList.add("user-card");

            userDiv.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>ที่อยู่:</strong> ${user.address.street}, ${user.address.city}</p>
                <hr>
            `;

            userList.appendChild(userDiv);
        });
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
}