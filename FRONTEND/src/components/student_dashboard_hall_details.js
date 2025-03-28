import { useNavigate } from "react-router-dom";
import StudentHallBookingBookingForm from "./student_dashboard_booking_form";
import { useState } from "react";

function StudentHallBookingDetailsPage({ selectedHall }) {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(false);

  return (
    <>
      {booking ? (
        <StudentHallBookingBookingForm selectedHall={selectedHall} />
      ) : (
        <div className="p-10 bg-gray-100 min-h-screen flex justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
            {/* Hall Title */}
            <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
              {selectedHall.Hall_Name}
            </h1>

            {/* Hall Images */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <img
                src={selectedHall.Image1}
                className="w-full h-72 object-cover rounded-lg shadow-md hover:scale-105 transition duration-300"
                alt="Hall Image 1"
              />
              <img
                src={selectedHall.Image2}
                className="w-full h-72 object-cover rounded-lg shadow-md hover:scale-105 transition duration-300"
                alt="Hall Image 2"
              />
            </div>

            {/* Hall Details */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                About this Hall
              </h2>
              <p className="text-lg text-gray-700">
                <b>Description: </b> {selectedHall.Description}
              </p>
              <p className="text-xl font-semibold text-green-700 mt-3">
                Price: ₹{selectedHall.Price}/hr
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Capacity: {selectedHall.Capacity} people
              </p>
            </div>

            {/* Book Now Button */}
            <div className="flex justify-center mt-6">
              <button
                type="button"
                className="w-40 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  const token = localStorage.getItem("authToken");
                  if (!token) navigate("/login");
                  setBooking(true);
                }}
              >
                📅 Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StudentHallBookingDetailsPage;
