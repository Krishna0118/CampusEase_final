// import Datepicker from "tailwind-datepicker-react";
import { useEffect, useState } from "react";
import axios from "axios";
import PopupModal from "./popup_modal";

function StudentDashboardHallBookingBookingForm({ selectedHall }) {
  //GET HALLS FROM halls SCHEMA FROM MONGO
  const [name, setName] = useState("");
  const [halls, setHalls] = useState([]);
  const [affiliatedDept, setAffiliatedDept] = useState();
  const [Time_From, setTimeFrom] = useState("");
  const [Time_To, setTimeTo] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [reason, setReason] = useState();
  const [bookingPersonName, setBookingPersonName] = useState();  //change
  const [userType, setUserType] = useState(""); //change
  const [id, setId] = useState("");
  const [isVerified, setIsVerified] = useState(false); //change
  const [verifying, setVerifying] = useState(false); //change
  

  //
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);



  // const handleVerification = async() => {
  //   if (!userType) {
  //     alert("Please select a user type first.");
  //     return;
  //   }

  //   setVerifying(true);
    
   

  //   if (userType === "visitor") {
  //     setIsVerified(true);
  //     // setDiscount(0);
  //     setVerifying(false);
  //     return;
  //   }

  //   // axios
  //   //   .get("http://localhost:3001/api/booking/verifyuser", {
  //   //     id: id,
  //   //     type: userType,
  //   //   })
  //   //   .then((response) => {
  //   //     if (response.data.verified) {
  //   //       setIsVerified(true);
  //   //       // setDiscount(userType === "Student" ? 70 : 50);
  //   //     } else {
  //   //       setIsVerified(false);
  //   //       alert("Verification failed. Please enter valid details.");
  //   //     }
  //   //   })
  //   //   .catch((error) => console.error("Verification error:", error))
  //   //   .finally(() => setVerifying(false));
  //   try {
  //     const response = await axios.get(`http://localhost:3001/api/booking/verifyuser`, {
  //       params: { id: id, type: userType }
  //     });
  
  //     if (response.data.verified) {
  //       setDiscount(userType === "student" ? 70 : 50); // 70% for students, 50% for faculty
  //       return true;
  //     } else {
  //       alert("User verification failed. Please check your details.");
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error("Error verifying user:", error);
  //     alert("Error verifying user.");
  //     return false;
  //   }
  // };



  //STUDENT ODA DEPARTMENT
  
  
  const handleVerification = async () => {
    if (!userType || !id) {
        alert("Please select a user type and enter the ID.");
        return;
    }

    setVerifying(true); // Start verification process

    try {
        const response = await axios.get(`http://localhost:3001/api/booking/verifyuser`, {
            params: { id: id, type: userType }
        });

        if (response.data.verified) {
            setIsVerified(true);
        } else {
            alert("Verification failed. Please check your details.");
        }
    } catch (error) {
        console.error("Error verifying user:", error);
        alert("Verification error. Please try again.");
    } finally {
        setVerifying(false); // End verification process
    }
};

  
  
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("authToken"));
    setUserData(data);
    console.log(data);
    
  }, []);
  //

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/api/halls")
  //     .then((response) => {
  //       setHalls(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching hall data:", error);
  //     });
  // }, []);

  useEffect(() => {
    
    axios
    .get(`http://localhost:3001/api/halls?Hall_ID=${selectedHall.Hall_ID}`)
      .then((response) => {
        setHalls(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hall data:", error);
      });
  }, []);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/api/halls"
  //     .then((response) => {
  //       setHalls(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching hall data:", error);
  //     });
  // }, []);

  ///Handle Booking
  const handleBooking = async (event) => {
    event.preventDefault();

    try {
      const data = {
        Name: name, // Include the name field
        Student_ID: userData.Student_ID,
        Hall_Name: selectedHall.Hall_Name,
        Booking_Person_Name: bookingPersonName,
        Booking_Person_ID: id,
        Affiliated: affiliatedDept,
        Date: selectedDate,
        Time_From: Time_From,
        Time_To: Time_To,
        Reason: reason,
      };

      const hallBooked = await fetch(
        "http://localhost:3001/api/booking/createBooking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (hallBooked.status === 200) {
        console.log("Booking created successfully");
        setShowSuccessMessage(true); //SUCCESS MESSAGE
        setShowErrorMessage(false);

        event.target.reset();

        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        console.error("Failed to create booking");
        setShowErrorMessage(true); //ERROR MESSAGE
        setShowSuccessMessage(false);
      }
    } catch (error) {
      console.error("Error creating booking:", error.message);
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
    }
  };
  //

  //AVAILABLE SLOTS
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      console.log("Fetching available time slots...");
      fetch(
        `http://localhost:3001/api/booking/availableslots?hallname=${selectedHall.Hall_Name}&date=${selectedDate}`
      )
        .then((response) => response.json())
        .then((data) => {
          const availableTimeSlots = data.availableTimeSlots.map(
            (timeStr) => new Date(timeStr)
          );
          setAvailableTimes(availableTimeSlots);
        });
    }
  }, [selectedDate]);

  useEffect(() => {
    // Set the initial value to the first element of availableTimes
    if (availableTimes.length > 0) {
      setTimeFrom(availableTimes[0]);
      setTimeTo(availableTimes[0]);
    }
  }, [availableTimes]);

  const [timeToOptions, setTimeToOptions] = useState([]);
  const handleTimeFromChange = (event) => {
    setTimeFrom(event.target.value);
  };

  useEffect(() => {
    const index = availableTimes.findIndex(
      (time) =>
        time.toLocaleTimeString() === new Date(Time_From).toLocaleTimeString()
    );
    const timeToOptions = availableTimes.slice(index + 1).map((time, index) => (
      <option key={index} value={time}>
        {time.toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </option>
    ));
    setTimeToOptions(timeToOptions);
  }, [Time_From]);

  const handleTimeToChange = (event) => {
    setTimeTo(event.target.value);
  };
  //
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
  };
  //

  return (
    <div className="sm:p-14 p-3 bg-zinc-100">
      <div className="text-sm sm:text-lg">
        Fill the following details and click submit to book the hall
      </div>
      {showSuccessMessage && (
        <PopupModal
          setShowModal={setShowSuccessMessage}
          message={
            "Your request has been sucessfully sent to the hall incharge."
          }
        />
      )}

      {showErrorMessage && (
        <PopupModal
          setShowModal={setShowErrorMessage}
          message={"There occured error, please try again."}
        />
      )}

      <form className="py-10 sm:pr-20" onSubmit={handleBooking}>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  NAME
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
       focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                />
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  DEPARTMENT
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  value={userData.Department}
                  readOnly
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                />
              </td>
            </tr> */}
            
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  HALL FOR BOOKING
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  value={selectedHall.Hall_Name}
                  readOnly
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md 
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                />
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  User Name
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  value={userData.Student_Name}
                  readOnly
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                />
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  BOOKING PERSON NAME
                <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  onChange={(e) => {
                    setBookingPersonName(e.target.value);
                  }}
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                />
              </td>
            </tr>
            {/* this field added :: change */}
            <tr> 
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  USER TYPE
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  required
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md 
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                >
                  <option value="">Select User Type</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="visitor">Visitor</option>
                </select>
              </td>
            </tr>
            <tr>
            {userType === "student" || userType === "faculty" ? (
              <>
                <td className="w-1/6 sm:w-1/3 p-4">
                  <label className="text-sm sm:text-lg font-bold text-gray-900 flex items-center">
                    {userType === "student" ? "Register Number" : "Faculty ID"} 
                    <span className="mx-3 font-bold">:</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                    placeholder="Enter your ID"
                    required
                  />
                </td>
                <td>
                  <span
                    onClick={handleVerification}
                    className="text-blue-600 cursor-pointer hover:underline"
                    // disabled={verifying || isVerified}
                  >
                    {verifying ? "Verifying..." : isVerified ? "✔ Verified" : "Verify"}
                  </span>
                </td>
              </>
            ) : null}
            </tr>
          
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  AFFILIATED DEPARTMENT/ CLUB
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  onChange={(e) => {
                    setAffiliatedDept(e.target.value);
                  }}                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                   disabled={!isVerified}
                />
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  DATE
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <input
                  type="date"
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                  disabled={!isVerified}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split("T")[0]}
                />
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  TIME FROM
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <select
                  id="TimeFrom"
                  value={Time_From}
                  onChange={handleTimeFromChange}
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                   disabled={!isVerified}
                  required
                >
                  <option disabled value="">
                    Select a time
                  </option>
                  {availableTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time.toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  TIME TO
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td>
                <select
                  id="TimeTo"
                  value={Time_To}
                  onChange={handleTimeToChange}
                  className="bg-[#f8fafa] border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                   disabled={!isVerified}
                  required
                >
                  <option value="">Select a time</option>
                  {timeToOptions}
                </select>
              </td>
            </tr>
            <tr>
              <td className="w-1/6 sm:w-1/3 p-4 align-top">
                <label className="text-sm sm:text-lg font-bold text-gray-900 flex justify-between">
                  REASON
                  <label className="mx-3 font-bold">:</label>
                </label>
              </td>
              <td className="pt-4">
                <textarea
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                  className="bg-[#f8fafa] h-24 border border-gray-300 text-gray-900 text-md rounded-md
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                   disabled={!isVerified}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          className="text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:outline-none
           focus:ring-blue-300 font-medium mt-5 rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Book Hall
        </button>
      </form>
    </div>
  );
}

export default StudentDashboardHallBookingBookingForm;
