import React, { useState } from "react";
import "./App.css";

function App() {
  const [classes, setClasses] = useState([
    // Initial class data, if you can add more if needed
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
  const [validationErrors1, setValidationErrors1] = useState("");
  const [validationErrors2, setValidationErrors2] = useState("");
  const [validationErrors3, setValidationErrors3] = useState("");
  console.log(validationErrors1, validationErrors2, validationErrors3);
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
    // Create a new student with default values this will be initial level
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
    // This will copy the existing classes array
    const updatedClasses = [...classes];

    // This will Update the specified student's property
    updatedClasses[classIndex].students[studentIndex][key] = value;

    // Clear the error message when the user starts entering a value
  if (key === "firstName") {
    setValidationErrors1("");
  } else if (key === "lastName") {
    setValidationErrors2("");
  } else if (key === "gender") {
    setValidationErrors3("");
  }

    //This will Update the state with the modified classes array
    setClasses(updatedClasses);
  };

  const handleSubmit = () => {
    // Initialize an array to store validation errors
    let errors1 = "";
    let errors2 = "";
    let errors3 = "";
    // Validate each student's data
    classes.forEach((classItem, classIndex) => {
      classItem.students.forEach((student, studentIndex) => {
        if (!student.firstName.trim()) {
          errors1 = `Please enter First Name`;
        }
        if (!student.lastName.trim()) {
          errors2 = `Please enter Last Name`;
        }
        if (!student.gender.trim()) {
          errors3 = `Please select Gender`;
        }
      });
    });

    setValidationErrors1(errors1);
    setValidationErrors2(errors2);
    setValidationErrors3(errors3);

    // If  no errors, proceed to submit
    if (!errors1 && !errors2 && !errors3) {
      // Storing data in local storage
      const dataToStore = classes.map((classItem) => {
        return classItem.students.map((student) => ({
          firstName: student.firstName,
          lastName: student.lastName,
          gender: student.gender,
        }));
      });

      localStorage.setItem("studentData", JSON.stringify(dataToStore));
    }
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
                   
                      {<small>{validationErrors1}</small>}
                    <br/>
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
                    {<small>{validationErrors2}</small>}
                    <br/>
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
                    {<small>{validationErrors3}</small>}
                    <br/>
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
