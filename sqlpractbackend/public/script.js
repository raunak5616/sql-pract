const studentList = document.getElementById('studentList');
const studentForm = document.getElementById('studentForm');
const formMessage = document.getElementById('formMessage');
const submitButton = studentForm.querySelector('button');

const renderStudents = (students) => {
    if (!students.length) {
        studentList.innerHTML = '<p class="empty-state">No students added yet.</p>';
        return;
    }

    studentList.innerHTML = students
        .map(
            (student) => `
                <article class="student-card">
                    <h3>${student.name}</h3>
                    <div class="student-meta">
                        <span>Email: ${student.email}</span>
                        <span>Course: ${student.course}</span>
                        <span>Age: ${student.age}</span>
                    </div>
                </article>
            `
        )
        .join('');
};

const loadStudents = async () => {
    try {
        const response = await fetch('/api/students');
        if (!response.ok) {
            throw new Error('Unable to fetch students');
        }

        const students = await response.json();
        renderStudents(students);
    } catch (error) {
        studentList.innerHTML = `<p class="empty-state">${error.message}</p>`;
    }
};

studentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(studentForm);
    const payload = {
        name: formData.get('name')?.trim(),
        email: formData.get('email')?.trim(),
        course: formData.get('course')?.trim(),
        age: Number(formData.get('age'))
    };

    submitButton.disabled = true;
    formMessage.textContent = 'Saving student...';

    try {
        const response = await fetch('/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to save student');
        }

        studentForm.reset();
        formMessage.textContent = result.message;
        await loadStudents();
    } catch (error) {
        formMessage.textContent = error.message;
    } finally {
        submitButton.disabled = false;
    }
});

loadStudents();
setInterval(loadStudents, 3000);
