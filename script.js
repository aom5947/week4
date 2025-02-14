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
    let age = document.getElementById("ageInput").value;
    let result = "";

    if (age < 13) {
        result = "เด็ก";
    } else if (age < 20) {
        result = "วัยรุ่น";
    } else {
        result = "ผู้ใหญ่";
    }

    document.getElementById("ageResult").textContent = `คุณเป็น: ${result}`;
}

// ตรวจสอบฟอร์ม
document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let email = document.getElementById("email").value;
    if (!email.includes("@") || !email.endsWith(".com")) {
        alert("กรุณาใส่อีเมลให้ถูกต้อง");
        return;
    }
    
    alert("ส่งข้อมูลสำเร็จ!");
});

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
    let number = parseInt(prompt("กรุณากรอกตัวเลข:"));
    if (number % 2 === 0) {
        alert("เลขนี้เป็นเลขคู่");
    } else {
        alert("เลขนี้เป็นเลขคี่");
    }
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

    subjects.forEach(function(subject) {
        let grade = parseFloat(prompt(`กรุณากรอกคะแนนวิชา ${subject.code}:`));
        while (grade < 0 || grade > 100 || isNaN(grade)) {
            grade = parseFloat(prompt(`กรุณากรอกคะแนนวิชา ${subject.code} (0-100):`));
        }
        totalCredits += subject.credits;
        totalGradePoints += grade * subject.credits;
    });

    let GPA = totalGradePoints / totalCredits;
    alert("เกรดเฉลี่ย (GPA) ของคุณคือ: " + GPA.toFixed(2));
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