import React, { useState } from "react";
import "./App.css"

function App() {
  const [classes, setClasses] = useState([
    // Initial class data, you can add more if needed
    {
      className: "Class - 1",
      students: [
        {
          firstName: "",
          lastName: "",
          gender: "Male",
        },
      ],
    },
  ]);

  const handleAddClass = () => {
    // Create a new class with an empty student
    const newClass = {
      className: `Class - ${classes.length + 1}`,
      students: [
        {
          firstName: "",
          lastName: "",
          gender: "Male",
        },
      ],
    };

    // Add the new class to the state
    setClasses([...classes, newClass]);
  };

  const handleAddStudent = (classIndex) => {
    // Create a new student with default values
    const newStudent = {
      firstName: "",
      lastName: "",
      gender: "Male",
    };

    // Copy the existing classes array
    const updatedClasses = [...classes];

    // Add the new student to the specified class
    updatedClasses[classIndex].students.push(newStudent);

    // Update the state with the modified classes array
    setClasses(updatedClasses);
  };

  const handleInputChange = (classIndex, studentIndex, key, value) => {
    // Copy the existing classes array
    const updatedClasses = [...classes];

    // Update the specified student's property
    updatedClasses[classIndex].students[studentIndex][key] = value;

    // Update the state with the modified classes array
    setClasses(updatedClasses);
  };

  const handleSubmit = () => {
    // Validate input fields (check for required fields)

    // Store data in local storage
    const dataToStore = classes.map((classItem) => {
      return classItem.students.map((student) => ({
        firstName: student.firstName,
        lastName: student.lastName,
        gender: student.gender,
      }));
    });

    localStorage.setItem("studentData", JSON.stringify(dataToStore));

    // Display validation errors (if any)
  };

  return (
    <div className="main">
      <div className="add-class-button">
        <button type="button" onClick={handleAddClass}>
          + Add Class
        </button>
      </div>
      {classes.map((classItem, classIndex) => (
        <div key={classIndex} className="main-class-box">
          <h2>{classItem.className}</h2>
          <div className="class-box">
            {classItem.students.map((student, studentIndex) => (
              <div key={studentIndex} className="student-box">
                <h3>{`Student - ${studentIndex + 1}`}</h3>
                <div className="class-box-content">
                  <div className="form-input">
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={student.firstName}
                      onChange={(e) =>
                        handleInputChange(
                          classIndex,
                          studentIndex,
                          "firstName",
                          e.target.value
                        )
                      }
                    />
                    <small>Required *</small>
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={student.lastName}
                      onChange={(e) =>
                        handleInputChange(
                          classIndex,
                          studentIndex,
                          "lastName",
                          e.target.value
                        )
                      }
                    />
                    <small>Required *</small>
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Gender</label>
                    <div className="radio-input">
                      <div className="form-input-radio">
                        <input
                          type="radio"
                          checked={student.gender === "Male"}
                          onChange={() =>
                            handleInputChange(
                              classIndex,
                              studentIndex,
                              "gender",
                              "Male"
                            )
                          }
                        />
                        <label>Male</label>
                      </div>
                      <div className="form-input-radio">
                        <input
                          type="radio"
                          checked={student.gender === "Female"}
                          onChange={() =>
                            handleInputChange(
                              classIndex,
                              studentIndex,
                              "gender",
                              "Female"
                            )
                          }
                        />
                        <label>Female</label>
                      </div>
                      <div className="form-input-radio">
                        <input
                          type="radio"
                          checked={student.gender === "Other"}
                          onChange={() =>
                            handleInputChange(
                              classIndex,
                              studentIndex,
                              "gender",
                              "Other"
                            )
                          }
                        />
                        <label>Other</label>
                      </div>
                    </div>
                    <small>Required *</small>
                  </div>
                </div>
              </div>
            ))}
            <div className="add-student-button">
              <button
                type="button"
                onClick={() => handleAddStudent(classIndex)}
              >
                + Add Student
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="submit-btn">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
