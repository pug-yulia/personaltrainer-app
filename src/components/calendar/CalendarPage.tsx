import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // month view
import timeGridPlugin from "@fullcalendar/timegrid"; // week and day views
import interactionPlugin from "@fullcalendar/interaction"; // makes calendar clickable
import listPlugin from "@fullcalendar/list"; // list/agenda view
import type { EventInput } from "@fullcalendar/core";
import Typography from "@mui/material/Typography";
import { fetchTrainings } from "../../api/trainingApi";
import type { TrainingWithCustomer } from "../../types";

// https://codesandbox.io/p/sandbox/react-fullcalendar-0ienw?file=%2Fsrc%2FApp.js
// https://fullcalendar.io/docs/react
// https://fullcalendar.io/demos
export default function CalendarPage() {
  // EventInput transforms event data into specific sphape
  // { id, title, start, end } before passing to callendar
  const [events, setEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    fetchTrainings()
      .then((trainings: TrainingWithCustomer[]) => {
        const calendarEvents: EventInput[] = trainings.map((t) => ({
          id: String(t.id), //id as string
          // title = activity + name
          title: t.customer
            ? `${t.activity} — ${t.customer.firstname} ${t.customer.lastname}`
            : t.activity,
          start: t.date, //iso string
          // full calendar needs an explicit end time to end the time blocks
          // convert minutes fro api to milliseconds
          // add it to the start time to get the end time
          end: new Date(
            new Date(t.date).getTime() + t.duration * 60 * 1000,
          ).toISOString(),
        }));
        setEvents(calendarEvents);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Calendar
      </Typography>
      <FullCalendar
        // plugins add the actual view types
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        // buttons of the toolbar
        headerToolbar={{
          left: "prev,today,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        buttonText={{
          today: "current",
          month: "month",
          week: "week",
          day: "day",
          list: "list",
        }}
        initialView="timeGridWeek" //show week calendar by default
        editable={false}
        selectable={false}
        dayMaxEvents={true}
        events={events}
        height="auto"
      />
    </>
  );
}
