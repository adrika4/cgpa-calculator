let semesterHistory = [];

document.getElementById("calculateBtn").addEventListener("click", function () {
  const totals = getSemesterTotals();
  const gpa = totals.points / totals.credits;

  document.getElementById("result").textContent =
    "Semester GPA: " + gpa.toFixed(2);
});

document.getElementById("saveBtn").addEventListener("click", function () {
  const totals = getSemesterTotals();
  semesterHistory.push(totals);

  let cgpaCredits = 0;
  let cgpaPoints = 0;

  for (let i = 0; i < semesterHistory.length; i++) {
    cgpaCredits += semesterHistory[i].credits;
    cgpaPoints += semesterHistory[i].points;
  }

  const cgpa = cgpaPoints / cgpaCredits;

  document.getElementById("cgpaResult").textContent =
    "Running CGPA: " + cgpa.toFixed(2) + " (" + semesterHistory.length + " semester(s) saved)";
});

document.getElementById("whatifBtn").addEventListener("click", function () {
  let cgpaCredits = 0;
  let cgpaPoints = 0;

  for (let i = 0; i < semesterHistory.length; i++) {
    cgpaCredits += semesterHistory[i].credits;
    cgpaPoints += semesterHistory[i].points;
  }

  const whatifCredits = Number(document.getElementById("whatifCredits").value);
  const whatifGPA = Number(document.getElementById("whatifGPA").value);

  const projectedCredits = cgpaCredits + whatifCredits;
  const projectedPoints = cgpaPoints + (whatifCredits * whatifGPA);

  const projectedCGPA = projectedPoints / projectedCredits;

  document.getElementById("whatifResult").textContent =
    "Projected CGPA: " + projectedCGPA.toFixed(2);
});

function getSemesterTotals() {
  const credits = document.querySelectorAll(".credits");
  const grades = document.querySelectorAll(".grade");

  let totalCredits = 0;
  let totalPoints = 0;

  for (let i = 0; i < credits.length; i++) {
    const creditValue = Number(credits[i].value);
    const gradeValue = Number(grades[i].value);

    totalCredits += creditValue;
    totalPoints += creditValue * gradeValue;
  }

  return { credits: totalCredits, points: totalPoints };
}