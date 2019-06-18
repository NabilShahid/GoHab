import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "./calendarview.css";
const CalendarView = () => {
  return (
    <div>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[ dayGridPlugin ]}
        weekends={false}
        events={[
          { title: "event 1", date: "2019-04-01" },
          { title: "event 2", date: "2019-04-02" }
        ]}
      />
    </div>
  );
};

export default CalendarView;
