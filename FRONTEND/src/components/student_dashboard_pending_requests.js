import { useEffect, useState, useRef } from "react";
import { usePDF } from "react-to-pdf";

function StudentDashboardPendingRequests() {
  const [bookingData, setBookingData] = useState([]);
  const [bookingPDFData, setBookingPDFData] = useState(null);
  const { toPDF, targetRef } = usePDF({ filename: "Booking_Approval.pdf" });
  const pdfContainerRef = useRef(null); 

  const userData = JSON.parse(localStorage.getItem("authToken"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/booking/userBookings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        });

        const hallData = await response.json();
        setBookingData(hallData);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };

    fetchData();
  }, [userData.token]);

  const formatISODate = (isoDate) =>
    new Date(isoDate).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });

  const getStatusClassName = (status) => {
    switch (status) {
      case "rejected":
        return "bg-red-500 text-white";
      case "approved":
        return "bg-green-500 text-white cursor-pointer";
      case "pending":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const handleDivClick = (status, booking) => {
    if (status === "approved") {
      setBookingPDFData(booking);
    }
  };

  useEffect(() => {
    if (bookingPDFData && targetRef.current) {
      const generatePDF = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for rendering
        toPDF();
      };
      generatePDF();
    }
  }, [bookingPDFData, toPDF, targetRef]);

  return (
    <div className="bg-gray-100 w-full min-h-screen p-6">
      {/* Booking List */}
      <div className="mt-6 max-h-[550px] overflow-y-auto">
        <ul>
          {bookingData.map((booking) => (
            <li key={booking._id} className="mb-4">
              <div
                className={`p-6 rounded-lg shadow-md ${getStatusClassName(
                  booking.Status
                )}`}
                onClick={() => handleDivClick(booking.Status, booking)}
              >
                <h5 className="mb-2 text-lg font-semibold">
                   {booking.Hall_Name} | 📅 {formatISODate(booking.Date)}
                </h5>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <p> Requester: <span className="font-semibold">{booking.Booking_Person_Name}</span></p>
                    <p> User: <span className="font-semibold">{booking.User_name}</span></p>
                    <p> Department/Club: <span className="font-semibold">{booking.Affiliated}</span></p>
                    <p> Reason: {booking.Reason}</p>
                  </div>
                  <div className="text-sm text-right">
                    <p className="text-gray-300">📌 Submitted On:</p>
                    <p>{formatISODate(booking.createdAt)}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* PDF Content (Hidden) */}
      <div ref={pdfContainerRef}>
        {bookingPDFData && (
          <div ref={targetRef} className="hidden p-10 text-lg">
            <h1 className="text-4xl font-bold mb-4">{bookingPDFData.Department}</h1>
            <p className="mb-2">📅 Date: {formatISODate(bookingPDFData.createdAt)}</p>

            <h2 className="text-3xl font-bold mt-6">✅ Approval Confirmation</h2>
            <p>Dear Student of {bookingPDFData.Affiliated},</p>
            <p className="mt-4">
              🎉 Your request for booking <strong>{bookingPDFData.Hall_Name}</strong> has been <strong>approved</strong>.
            </p>

            <h3 className="text-2xl font-bold mt-6">📋 Booking Details</h3>
            <p>📅 <strong>Date:</strong> {formatISODate(bookingPDFData.Date)}</p>
            <p>⏰ <strong>Time:</strong> {bookingPDFData.Time_From} - {bookingPDFData.Time_To}</p>
            <p>🏛️ <strong>Venue:</strong> {bookingPDFData.Hall_Name}</p>

            <h3 className="text-2xl font-bold mt-6">📜 Terms and Conditions</h3>
            <ul className="mt-4">
              <li>✔️ The booking is confirmed for the specified date and time.</li>
              <li>✔️ Any changes must be communicated in writing.</li>
              <li>✔️ The event organizer must follow venue policies.</li>
            </ul>

            <p className="mt-6">Best regards,</p>
            <p className="text-xl font-semibold">🏢 Hall Incharge</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboardPendingRequests;
