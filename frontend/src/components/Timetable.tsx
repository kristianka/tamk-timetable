import { useState } from "react";
import { Formik, Field, Form } from "formik";
import {
  getTimetableByCourse,
  uploadTimetable,
  getUsersTimetable
} from "../services/timetableService";
import { Reservation } from "../types";
import { toast } from "react-toastify";
import NewCalendar from "./NewCalendar";

const Timetable = () => {
  const [courseTimetable, setCourseTimetable] = useState<Reservation[] | null>(
    null
  );
  const [groupTimetable, setGroupTimeTable] = useState<Reservation[] | null>(
    null
  );

  const [timetable2, setTimetable2] = useState<string[]>();

  const sendToServer = async () => {
    const res = await uploadTimetable(["5G00EV17-3003", "5G00EV15-3003"]);
    console.log(res);
    toast.success(JSON.stringify(res));
  };

  const getYourTimetable = async () => {
    const res = await getUsersTimetable();
    console.log(res);
    setTimetable2(res);
    toast.success(JSON.stringify(res, null, 2));
  };

  console.log(courseTimetable, groupTimetable);
  return (
    <div className="min-h-full">
      <button
        className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={sendToServer}
      >
        Send to server to get timetable for 5G00EV17-3003
      </button>
      <button
        className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={getYourTimetable}
      >
        Get your timetable
      </button>
      <br />

      {timetable2 ? <NewCalendar data={timetable2} /> : null}

      <p className="m-5 text-xl">Timetable</p>
      <div className="grid grid-cols-2">
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
          <div className="divide-y"></div>
        </div>
        {/* <div className="m-5">
          {courseTimetable ? (
            <MyCalendar data={courseTimetable} />
          ) : (
            <p className="m-5">Enter group code to render timetable</p>
          )}
        </div> */}
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
      {/* {groupTimetable ? (
        <MyCalendar data={groupTimetable} />
      ) : (
        <p className="m-5">Enter group code to render timetable</p>
      )} */}
    </div>
  );
};

export default Timetable;
