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

const NewCalendar = (props: props) => {
  // populate the calendar with the data from the server

  console.log("new calendar props", props);
  const [timetable, setTimetable] = useState<Reservation[] | undefined>();
  const [events, setEvents] = useState<Event[] | undefined>();

  useEffect(() => {
    console.log("useEffect in new calendar");
    const fetchData = async () => {
      try {
        let tempTimetable: Reservation[] = [];
        for (let i = 0; i < props.data.codes.length; i++) {
          const res = await getTimetableByCourse(props.data.codes[i]);
          console.log("res", res);
          // push the data to the timetable
          const r = res?.reservations || [];
          tempTimetable = tempTimetable.concat(r);
        }

        setTimetable(tempTimetable);
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
  }, []);

  console.log("timetable", timetable);
  console.log("events", events);

  return (
    <div className="h-full">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
      />
    </div>
  );
};

export default NewCalendar;
