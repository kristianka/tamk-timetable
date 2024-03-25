import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import {
  getTimetableByClass,
  getTimetableByCourse
} from "../services/timetableService";
import { Reservation } from "../types";

const Timetable = () => {
  const [timetable, setTimetable] = useState<Reservation[] | null>(null);
  const [courseCode, setCourseCode] = useState<string>("5G00EV17-3003");
  const [timetable2, setTimetable2] = useState<Reservation[] | null>(null);
  const [classCode, setClassCode] = useState<string>("21i224");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTimetableByCourse(courseCode);
      setTimetable(res?.reservations || null);
      const res2 = await getTimetableByClass(courseCode);
      setTimetable2(res2?.reservations || null);
    };
    fetchData();
  }, []);
  return (
    <div>
      <p className="text-xl">Timetable</p>
      <h1>Haku kurssilla, esim. 5G00EV17-3003</h1>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>

      <table className="w-full text-sm text-left">
        <thead className="text-xs">
          <tr>
            <th>Course</th>
            <th>Starts</th>
            <th>Ends</th>
          </tr>
        </thead>
        <tbody>
          {timetable &&
            timetable.map((item: Reservation) => (
              <tr className="bg-white border-b" key={item.id}>
                <td>{item.subject}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h1>Haku ryhmäkoodilla 21i224</h1>
      <table className="w-full text-sm text-left">
        <thead className="text-xs">
          <tr>
            <th>Course</th>
            <th>Starts</th>
            <th>Ends</th>
          </tr>
        </thead>
        <tbody>
          {timetable2 &&
            timetable2.map((item: Reservation) => (
              <tr className="bg-white border-b" key={item.id}>
                <td>{item.subject}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
