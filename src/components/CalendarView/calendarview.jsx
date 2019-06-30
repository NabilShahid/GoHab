import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "./calendarview.css";
const CalendarView = ({calendarEventClick,calendarEvents,calendarHeight,contentHeight}) => {
  return (
    <div>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[ dayGridPlugin ]}
        eventClick={calendarEventClick}
        firstDay={1}
        events={calendarEvents}
        height={calendarHeight}
        contentHeight={contentHeight}
      />
    </div>
  );
};

export default CalendarView;
