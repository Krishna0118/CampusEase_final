import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import axios from "axios";

function CalendarCom() {
  const [events, setEvents] = useState([]);

  // Helper function to determine event color
  const getEventColor = (status) => {
    switch (status) {
      case "approved":
        return "green";
      case "pending":
        return "orange";
      default:
        return "blue";
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("authToken");
  
    let parsedData = null;
    try {
      parsedData = storedData ? JSON.parse(storedData) : null;
    } catch (err) {
      console.error("Invalid JSON in localStorage", err);
      return;
    }
  
    const token = parsedData?.token;
  
    if (!token) {
      console.error("Token not found");
      return;
    }
    axios
      .get("http://localhost:3001/api/booking/allBookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("API Response from Calendar:", response.data);
  
        if (!response.data || !Array.isArray(response.data)) {
          console.error("Invalid data format received from API");
          return;
        }
  
        setEvents(
          response.data.map((booking) => ({
            start: new Date(booking.Time_From).toISOString(),
            end: new Date(booking.Time_To).toISOString(),
            color: getEventColor(booking.Status),
            title: booking.Hall_Name,
          }))
        );
      })
      .catch((err) => {
        console.error("Error fetching bookings", err);
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
