import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
// import StudentHallBookingBookingForm from "./student_dashboard_booking_form";
// import StudentHallBookingDetailsPage from "./student_dashboard_hall_details";
import AdminShowHallDetail from "./admin_show_hall_detail";
import StudentHallBookingNavbar from "./student_dashboard_navbar";

function AdminHallList(props) {
  const [halls, setHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef(null);
  const [list, setList] = useState(["Hall Booking"]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/halls/getAllHalls")
      .then((response) => setHalls(response.data))
      .catch((error) => console.error("Error fetching hall data:", error));
  });

  const handleBreadcrumbClick = (updatedList) => {
    setList(updatedList);
  };

  const [formData, setFormData] = useState({
    Hall_ID:"",
    Hall_Name: "",
    Description: "",
    Capacity: "",
    Price: "",
    Image1: "",
    Image2: "",
  });

  const handleAddHallClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/halls/addAHall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Hall added successfully!");
        handleCloseModal();
        // optionally: refresh list of halls here
      } else {
        alert("Failed to add hall.");
      }
    } catch (error) {
      console.error("Error adding hall:", error);
    }
  };

  



  const loadDetailsPage = (hall) => {
    if (!hall) return; //  Prevents null errors
    // console.log(hall);

    setShowDetails(true);
    setSelectedHall(hall);
    // console.log(selectedHall);
    setList(["Hall Booking", hall.Hall_Name]);
    setTimeout(
      () => detailsRef.current?.scrollIntoView({ behavior: "smooth" }),
      200
    );
  };
  return (
    <div className="bg-gray-100 w-full min-h-screen p-6">
      {/* <div className="mt-6 max-h-[550px] overflow-y-auto">

      </div> */}
      <StudentHallBookingNavbar
        listAdd={list}
        childToParent={handleBreadcrumbClick}
      />
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Hall Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {halls.map((hall) => (
          <div
            key={hall._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative">
              <img
                src={hall.Image1}
                alt={hall.Hall_Name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold">
                  {hall.Hall_Name}
                </h3>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <button
                  onClick={() => loadDetailsPage(hall)}
                  className="w-1/2 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-bl-lg"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
          <div
            onClick={handleAddHallClick}
            className="bg-gray-200 hover:bg-gray-300 transition duration-200 flex flex-col justify-center items-center w-full h-full rounded-lg cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-11 w-11 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="mt-2 text-gray-700 font-medium">Add a Hall</span>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Hall</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                name="Hall_ID"
                placeholder="Hall ID"
                value={formData.Hall_ID}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="Hall_Name"
                placeholder="Hall Name"
                value={formData.Hall_Name}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />
              <textarea
                name="Description"
                placeholder="Description"
                value={formData.Description}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />
              <input
                type="number"
                name="Capacity"
                placeholder="Capacity"
                value={formData.Capacity}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />
              <input
                type="number"
                name="Price"
                placeholder="Maintenance Price/hr"
                value={formData.Price}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />
              <input
                type="url"
                name="Image1"
                placeholder="Image 1 URL"
                value={formData.Image1}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />
              <input
                type="url"
                name="Image2"
                placeholder="Image 2 URL"
                value={formData.Image2}
                onChange={handleChange}
                required
                className="p-2 border rounded"
              />

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* <br /> */}

      <div ref={detailsRef} className="mt-10 container mx-auto">
        {showDetails && <AdminShowHallDetail selectedHall={selectedHall} />}
        {/* console.log(`${selectedHall.Hall_Name}`); */}
      </div>
    </div>
  );
}

export default AdminHallList;
