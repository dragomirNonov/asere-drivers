import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Student from '../../components/instructorUI/Student';
import studentServices from '../../services/users';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const notify = () => toast.success('Appointment Added Successfully');

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
        setStudents(response.students);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
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
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Filter students based on transmission type and sort alphabetically
  const standardStudents = filteredStudents
    .filter((student) => student.transmission === 'Standard')
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

  const automaticStudents = filteredStudents
    .filter((student) => student.transmission === 'Automatic')
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

  return (
    <div className="flex flex-col items-center  ">
      <input
        type="text"
        placeholder="Search by student name..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="my-4 p-2 md:w-1/6 w-96 border border-gray-300 rounded-md"
      />
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

export default StudentsPage;
