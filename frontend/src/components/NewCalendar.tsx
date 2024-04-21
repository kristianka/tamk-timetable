import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Reservation, Event } from "../types";
import { useEffect, useState } from "react";
import { getTimetableByCourse } from "../services/timetableService";

moment.locale("fi");
const localizer = momentLocalizer(moment);

interface props {
  data: {
    codes: string[];
  };
}

const NewCalendar = ({ data }: props) => {
  const [events, setEvents] = useState<Event[] | undefined>();

  console.log("in calendar");
  useEffect(() => {
    // populate the calendar with the data from the server
    const fetchData = async () => {
      try {
        let tempTimetable: Reservation[] = [];
        for (let i = 0; i < data.codes.length; i++) {
          const res = await getTimetableByCourse(data.codes[i]);
          // push the data to the timetable
          const r = res?.reservations || [];
          tempTimetable = tempTimetable.concat(r);
        }
        const events = tempTimetable.map((item: Reservation) => ({
          start: new Date(item.startDate),
          end: new Date(item.endDate),
          title: item.subject
        }));
        setEvents(events);
      } catch (error) {
        console.log("error in fetching timetable", error);
      }
    };
    fetchData();
  }, [data.codes]);

  const handleEventClick = (event: Event) => {
    console.log("clicked event", event);
  };

  return (
    <div className="h-full">
      <div className="m-5 p-3 rounded-lg bg-white">
        <h1 className="p-3 m-auto text-3xl font-bold">Your calendar</h1>
        <Calendar
          className="m-3"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          onSelectEvent={(event) => handleEventClick(event)}
        />
      </div>
    </div>
  );
};

export default NewCalendar;
