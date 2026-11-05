const form = document.getElementById("studentForm");
const list = document.getElementById("studentList");

// Display student records
async function loadStudents() {

    const response = await fetch("/api/students");
    const students = await response.json();

    list.innerHTML = "";

    students.forEach(student => {

        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${student.name}</h3>
            <p>Roll No: ${student.rollNumber}</p>
            <p>Department: ${student.department}</p>
            <p>Email: ${student.email}</p>
            <hr>
        `;

        list.appendChild(div);
    });
}

// Save student details
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        rollNumber: document.getElementById("rollNumber").value,
        department: document.getElementById("department").value,
        email: document.getElementById("email").value
    };

    const response = await fetch("/api/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    if (!response.ok) {
        alert("Unable to save student");
        return;
    }

    alert("Student Registered Successfully!");

    form.reset();
    loadStudents();
});

loadStudents();