import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Reservation } from "../types";

moment.locale("fi");
const localizer = momentLocalizer(moment);

interface props {
  data: Reservation[];
}

const MyCalendar = (props: props) => {
  const events = props.data?.map((item: Reservation) => ({
    start: new Date(item.startDate),
    end: new Date(item.endDate),
    title: item.subject
  }));

  return (
    <div className="myCustomHeight">
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

export default MyCalendar;
