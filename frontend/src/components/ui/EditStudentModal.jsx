import React from "react";
import { useState } from "react";
import userService from "../../services/users";

const EditStudentModal = (props) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({
      ...editedInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Handle form submission, for example: save editedInfo to database
      console.log("Edited Info:", editedInfo);
      await userService.editStudent(editedInfo);
      // Refresh students after editing
      props.refresh();
      // Close the pop-up
      setShowModal(false);
    } catch (error) {
      // Handle errors
      console.error(`Failed to edit appointment: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      await userService.deleteStudent(props.info._id);
      // props.info.refreshAppointments();
      setShowModal(false);
      props.refresh();
      // props.deleteApp();
    } catch (error) {
      console.error(`Failed to delete appointment: ${error.message}`);
    }
  };

  const [editedInfo, setEditedInfo] = useState({
    firstName: props.info.firstName,
    lastName: props.info.lastName,
    transmission: props.info.transmission,
    DOB: props.info.DOB,
    DLnumber: props.info.DLnumber,
    phone: props.info.phone,
    email: props.info.email,
    permitExpiryDate: props.info.permitExpiryDate,
    clas: props.info.clas,
    id: props.info._id,
    // Add more fields as needed
  });

  return (
    <>
      <button
        // className="edit-button ml-auto px-4 py-1  bg-blue-600  hover:bg-yellow-600 hover:text-white rounded-lg hover:border-collapse"
        className="bg-orange-500 text-black active:bg-blue-600 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg hover:bg-orange-700 outline-none focus:outline-none ml-auto mr-1 mb-1 ease-linear transition-all duration-150 w-1/6"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative md:w-2/6 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 bg-slate-300 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-slate-800 text-white">
                  <h3 className="text-3xl font-semibold">Edit Student Info</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="popup">
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col  mb-2"
                    >
                      <label className="p-1 flex justify-between">
                        First Name:
                        <input
                          type="text"
                          name="firstName"
                          value={editedInfo.firstName}
                          onChange={handleChange}
                          className="p-1"
                        />
                      </label>
                      <label className="p-1 flex justify-between">
                        Last Name:
                        <input
                          type="text"
                          name="lastName"
                          value={editedInfo.lastName}
                          onChange={handleChange}
                          className="p-1"
                        />
                      </label>

                      <label className="p-1 flex justify-between">
                        Transmission:
                        <select
                          name="transmission"
                          value={editedInfo.transmission}
                          onChange={handleChange}
                          className="p-1"
                        >
                          <option value="Automatic">Automatic</option>
                          <option value="Standard">Standard</option>
                        </select>
                      </label>

                      <label className="p-1 flex justify-between">
                        Class:
                        <select
                          name="clas"
                          value={editedInfo.clas}
                          onChange={handleChange}
                          className="p-1"
                        >
                          <option value="A">A</option>
                          <option value="B">B</option>
                        </select>
                      </label>

                      <label className="p-1 flex justify-between">
                        Date of Birth:
                        <input
                          type="date"
                          name="DOB"
                          value={editedInfo.DOB}
                          onChange={handleChange}
                          className="p-1"
                          htmlFor="date"
                        />
                      </label>
                      <label className="p-1 flex justify-between">
                        Driver's Liscense Num:
                        <input
                          type="text"
                          name="DLnumber"
                          value={editedInfo.DLnumber}
                          onChange={handleChange}
                          className="p-1"
                        />
                      </label>
                      <label className="p-1 flex justify-between">
                        Phone:
                        <input
                          type="text"
                          name="phone"
                          value={editedInfo.phone}
                          onChange={handleChange}
                          className="p-1"
                        />
                      </label>
                      <label className="p-1 flex justify-between">
                        Email:
                        <input
                          type="text"
                          name="email"
                          value={editedInfo.email}
                          onChange={handleChange}
                          className="p-1"
                        />
                      </label>
                      <label className="p-1 flex justify-between">
                        Permit Expiry Date:
                        <input
                          type="date"
                          name="permitExpiryDate"
                          value={editedInfo.permitExpiryDate}
                          onChange={handleChange}
                          className="p-1"
                        />
                      </label>
                    </form>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-red-600 hover:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-auto mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default EditStudentModal;
