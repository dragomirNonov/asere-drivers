import React, { useState, useEffect } from "react";
import studentServices from "../../services/users";
import Student from "./Student";
import toast, { Toaster } from "react-hot-toast";
import AddStudentModal from "./AddStudentModal";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const notify = () => toast.success("Appointment Added Successfully");
  const studentAdded = () => toast.success("Student Added Successfully");

  useEffect(() => {
    // Fetch students when component mounts
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    // Call the getAllStudents function from the studentServices
    studentServices
      .getAllStudents()
      .then((response) => {
        // Set the fetched students to state
        setStudents(response.data.students);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  // Function to handle changes in the search query
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter students based on the search query
  const filteredStudents = students.filter(
    (student) =>
      student.firstName &&
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter students based on transmission type and sort alphabetically
  const standardStudents = filteredStudents
    .filter((student) => student.transmission === "Standard")
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

  const automaticStudents = filteredStudents
    .filter((student) => student.transmission === "Automatic")
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

  return (
    <div className="flex flex-col items-center mt-4 h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <input
        type="text"
        placeholder="Search by student name..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="my-4 p-2 md:w-1/6 w-full border border-gray-300 rounded-md"
      />
      <AddStudentModal refresh={fetchStudents} toast={studentAdded} />
      <div className="flex flex-col md:flex-row">
        {/* Div for Standard Transmission Students */}
        <div className="m-4">
          <h2 className="text-xl font-bold bg-gray-800 text-white p-1">
            Standard Transmission Students
          </h2>
          {standardStudents.map((student) => (
            <Student
              key={student._id}
              student={student}
              toast={notify}
              refresh={fetchStudents}
            />
          ))}
        </div>

        {/* Div for Automatic Transmission Students */}
        <div className="m-4">
          <h2 className="text-xl font-bold  bg-gray-800 text-white p-1">
            Automatic Transmission Students
          </h2>
          {automaticStudents.map((student) => (
            <Student
              key={student._id}
              student={student}
              toast={notify}
              refresh={fetchStudents}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Students;
