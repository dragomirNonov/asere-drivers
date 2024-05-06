import React from "react";
import { useState } from "react";
import userService from "../../services/users";

const AddStudentModal = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    permitExpDate: "",
    DOB: "",
    email: "",
    DLnumber: "",
    transmission: "Standard",
    clas: "A",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const studentObj = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        DOB: formData.DOB,
        DLnumber: formData.DLnumber,
        phone: formData.phone,
        email: formData.email,
        transmission: formData.transmission,
        permitExpDate: formData.permitExpDate,
        clas: formData.clas,
      };
      console.log(studentObj);
      const res = await userService.addStudent(studentObj);
      handleSuccess(res);
    } catch (err) {
      handleError(err);
    }
  };

  const handleSuccess = () => {
    setErrorMessage("");
    // setSuccessMessage(res.data.message);
    // Reset the form fields
    resetFormData();
    setShowModal(false);
    props.refresh();
    props.toast();
  };

  const handleError = (err) => {
    setSuccessMessage("");
    const errorMessage =
      err.response?.data?.message || "Unknown error occurred";
    setErrorMessage(errorMessage);
  };

  const resetFormData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      DOB: "",
      DLnumber: "",
      phone: "",
      email: "",
      transmission: "Standard",
      permitExpDate: "",
      clas: "A",
    });
  };

  return (
    <>
      <button
        className="text-white font-bold p-4 bg-teal-700 w-1/6  hover:bg-teal-900 rounded-lg my-4"
        type="button"
        onClick={() => {
          setErrorMessage("");
          setSuccessMessage("");
          setShowModal(true);
        }}
      >
        Add a New Student
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-2/6 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 bg-slate-300 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t bg-slate-800 text-white">
                  <h3 className="text-3xl font-semibold">Add Student</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false);
                      resetFormData();
                    }}
                  >
                    <span className="bg-transparent text-white  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="popup">
                    <form className="p-4" onSubmit={handleSubmit}>
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-2 flex flex-col md:w-3/6 p-1">
                          <label className="text-lg" htmlFor="firstName">
                            First Name:
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="p-1 uppercase"
                          />
                        </div>
                        <div className="mb-2 flex flex-col md:w-3/6 p-1">
                          <label className="text-lg" htmlFor="lastName">
                            Last Name:
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="p-1 uppercase"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row justify-between ">
                        <div className="mb-2 flex flex-col md:w-3/6 p-1">
                          <label className="text-lg" htmlFor="date">
                            DOB:
                          </label>
                          <input
                            type="date"
                            id="DOB"
                            name="DOB"
                            value={formData.DOB}
                            onChange={handleChange}
                            className="p-1"
                          />
                        </div>
                        <div className="mb-2 flex flex-col md:w-3/6 p-1">
                          <label className="text-lg" htmlFor="licenseNumber">
                            Driver's License Number:
                          </label>
                          <input
                            type="text"
                            id="DLnumber"
                            name="DLnumber"
                            value={formData.DLnumber}
                            onChange={handleChange}
                            className="p-1"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between ">
                        <div className="mb-2 flex flex-col md:w-3/6 p-1">
                          <label className="text-lg" htmlFor="phone">
                            Phone:
                          </label>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="p-1"
                          />
                        </div>
                        <div className="mb-2 flex flex-col md:w-3/6 p-1">
                          <label className="text-lg" htmlFor="phone">
                            Email:
                          </label>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="p-1"
                          />
                        </div>
                      </div>

                      <div className="flex flex-row justify-between ">
                        <div className="mb-2 flex flex-col w-3/6 p-1">
                          <label className="text-lg">Transmission</label>
                          {/* Replace input with a select element for Transmission */}
                          <select
                            id="transmission"
                            name="transmission"
                            value={formData.transmission}
                            onChange={handleChange}
                            className="p-1 "
                          >
                            <option value="" disabled>
                              Select transmission
                            </option>
                            <option value="Automatic">Automatic</option>
                            <option value="Standard">Standard</option>
                          </select>
                        </div>
                        <div className="mb-2 flex flex-col w-3/6 p-1">
                          <label className="text-lg">Class</label>
                          {/* Replace input with a select element for Transmission */}
                          <select
                            id="clas"
                            name="clas"
                            value={formData.clas}
                            onChange={handleChange}
                            className="p-1 "
                          >
                            <option value="A">A</option>
                            <option value="B">B</option>
                          </select>
                        </div>
                        <div className="mb-2 flex flex-col w-3/6 p-1">
                          <label className="text-lg" htmlFor="permitExpDate">
                            Permit Expiry Date:
                          </label>
                          <input
                            type="date"
                            id="permitExpDate"
                            name="permitExpDate"
                            value={formData.permitExpDate}
                            onChange={handleChange}
                            className="p-1"
                          />
                        </div>
                      </div>

                      <button
                        className="text-white font-bold p-4 bg-teal-700 w-full  hover:bg-teal-900 rounded-lg my-4"
                        type="submit"
                      >
                        Submit
                      </button>
                      <div className="text-green-500">{successMessage}</div>
                      <div className="text-red-500">{errorMessage}</div>
                    </form>
                  </div>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AddStudentModal;
