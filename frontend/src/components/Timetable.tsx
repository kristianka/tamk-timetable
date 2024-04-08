import { useState } from "react";
import { Formik, Field, Form } from "formik";
import { getTimetableByCourse } from "../services/timetableService";
import { Reservation } from "../types";
import MyCalendar from "./Calendar";

const Timetable = () => {
  const [courseTimetable, setCourseTimetable] = useState<Reservation[] | null>(
    null
  );
  const [groupTimetable, setGroupTimeTable] = useState<Reservation[] | null>(
    null
  );

  return (
    <div>
      <p className="m-5 text-xl">Timetable</p>
      <div className="m-5">
        <h2>Search by course code, example 5G00EV17-3003</h2>
        <Formik
          key="courseCode"
          initialValues={{ courseCode: "" || "" }}
          onSubmit={async (values) => {
            const res = await getTimetableByCourse(values.courseCode);
            setCourseTimetable(res?.reservations || null);
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
            {courseTimetable &&
              courseTimetable.map((item: Reservation) => (
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
        <h2>Search by group code, example 21i224</h2>

        <Formik
          key="groupCode"
          initialValues={{ groupCode: "" || "" }}
          onSubmit={async (values) => {
            const res = await getTimetableByCourse(values.groupCode);
            setGroupTimeTable(res?.reservations || null);
          }}
        >
          <Form>
            <Field
              id="groupCode"
              name="groupCode"
              placeholder="21i224"
              type="text"
            />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
      {/* <div className="m-5 divide-y">
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
      </div> */}
      {groupTimetable ? (
        <MyCalendar data={groupTimetable} />
      ) : (
        <p className="m-5">Enter group code to render timetable</p>
      )}
    </div>
  );
};

export default Timetable;
