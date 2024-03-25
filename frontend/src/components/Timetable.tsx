import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import {
  getTimetableByClass,
  getTimetableByCourse
} from "../services/timetableService";
import { Reservation } from "../types";

const Timetable = () => {
  const [timetable, setTimetable] = useState<Reservation[] | null>(null);
  const [courseCode, setCourseCode] = useState<string>("");
  const [timetable2, setTimetable2] = useState<Reservation[] | null>(null);
  const [classCode, setClassCode] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTimetableByCourse(courseCode);
      setTimetable(res?.reservations || null);
      const res2 = await getTimetableByClass(courseCode);
      setTimetable2(res2?.reservations || null);
    };
    // fetchData();
  }, []);

  return (
    <div>
      <p className="m-5 text-xl">Timetable</p>
      <div className="m-5">
        <h2>Haku kurssilla, esim. 5G00EV17-3003</h2>
        <Formik
          initialValues={{ courseCode }}
          onSubmit={async (values) => {
            const res = await getTimetableByCourse(values.courseCode);
            setTimetable(res?.reservations || null);
          }}
        >
          <Form>
            <Field
              id="courseCode"
              name="courseCode"
              placeholder="5G00EV17-3003"
              type="text"
            />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>

      <div className="m-5 divide-y">
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
      </div>

      <div className="mt-10 m-5">
        <h2>Haku ryhmäkoodilla, esim. 21i224</h2>

        <Formik
          initialValues={{ classCode }}
          onSubmit={async (values) => {
            const res = await getTimetableByCourse(values.classCode);
            setTimetable2(res?.reservations || null);
          }}
        >
          <Form>
            <Field
              id="classCode"
              name="classCode"
              placeholder="21i224"
              type="text"
            />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
      <div className="m-5 divide-y">
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
    </div>
  );
};

export default Timetable;
