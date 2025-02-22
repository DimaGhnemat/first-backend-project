function createStudent(name, age, mark) {
    return { name, age, mark };
}

let students = [];

students.push(createStudent("Yousef", 21, 70));
students.push(createStudent("Nour", 22, 80));
students.push(createStudent("Leen", 20, 90));
students.push(createStudent("Hassan", 23, 10));
students.push(createStudent("Maya", 19, 100));

let successStudents = [];
let failedStudents = [];


students.forEach(student => {
    if (student.mark >= 50) {
        successStudents.push(student);
    } else {
        failedStudents.push(student);
    }
});

console.log("Success Students:", successStudents.map(s => s.name).join(", "));

console.log("Failed Students:", failedStudents.map(s => s.name).join(", "));