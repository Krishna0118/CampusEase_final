import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import axios from "axios";

function CalendarCom() {
  const [events, setEvents] = useState([]);

  // Helper function to determine event color
  const getEventColor = (status, isPaid) => {
    if (status === "approved") {
      return isPaid ? "#22c55e" : "#facc15"; // Green if paid, yellow if just approved
    }
    switch (status) {
      case "rejected":
        return "#ef4444"; // red
      default:
        return "#9ca3af"; // grey
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("authToken");
    const parsedData = storedData ? JSON.parse(storedData) : null;
    const token = parsedData?.token;

    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    axios
      .get("http://localhost:3001/api/booking/allBookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const bookings = response.data || [];

        setEvents(
          bookings.map((booking) => ({
            start: new Date(booking.Time_From).toISOString(),
            end: new Date(booking.Time_To).toISOString(),
            title: booking.Hall_Name,
            color: getEventColor(booking.Status, booking.PaymentStatus), // <- updated logic
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching booking data:", error?.response?.data || error);
      });
  }, []);

  return (
    <div className="w-full p-2 md:p-8 bg-zinc-100">
      <div className="bg-white p-5">
        <FullCalendar
          initialView="dayGridMonth"
          themeSystem="standard"
          plugins={[dayGridPlugin]}
          events={events}
          displayEventEnd={true}
          eventMinHeight={30}
          eventDisplay="block"
          dayMaxEventRows={2}
          moreLinkClick="popover"
        />
      </div>
    </div>
  );
}

export default CalendarCom;
