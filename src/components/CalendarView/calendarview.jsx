import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "./calendarview.css";
const CalendarView = ({calendarEventClick,calendarEvents}) => {
  console.log("Calnedar events: ",calendarEvents)
  return (
    <div>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[ dayGridPlugin ]}
        eventClick={calendarEventClick}
        // weekends={false}
        events={calendarEvents}
      />
    </div>
  );
};

export default CalendarView;
