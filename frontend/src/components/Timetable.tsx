import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import {
  getTimetableByCourse,
  uploadTimetable,
  getUsersTimetable
} from "../services/timetableService";
import { Reservation } from "../types";
import { toast } from "react-toastify";
import NewCalendar from "./NewCalendar";
import MyCalendar from "./Calendar";
import { ITimetable } from "../types";

const Timetable = () => {
  const [courseTimetable, setCourseTimetable] = useState<Reservation[] | null>(
    null
  );
  const [timetable, setTimetable] = useState<ITimetable>();
  const [courseCodes, setCourseCodes] = useState<string[]>([]);

  const getYourTimetable = async () => {
    const res = await getUsersTimetable();
    setTimetable(res);
    setCourseCodes(res?.codes);
  };

  useEffect(() => {
    getYourTimetable();
  }, []);

  const sendToServer = async (newCode: string) => {
    console.log("new code", newCode);
    if (courseCodes && courseCodes.includes(newCode)) {
      toast.error("Course already in your timetable");
      return;
    }
    console.log("courseCodes", courseCodes);
    if (courseCodes === undefined || courseCodes.length === 0) {
      await uploadTimetable([newCode]);
    } else {
      await uploadTimetable([...courseCodes, newCode]);
    }
    toast.success("Course added to your timetable");
    getYourTimetable();
  };

  console.log("courseCodes", courseCodes);

  return (
    <div className="min-h-full">
      {/* divide page in two */}
      <div className="grid grid-cols-2">
        <div className="row row-cols-2">
          <div className="m-5 p-3 rounded-lg bg-white">
            <h1 className="m-auto text-3xl font-bold">Add courses</h1>
            <h2 className="m-auto text-m">
              Search by course code, example 5G00EV17-3003
            </h2>
            <Formik
              key="courseCode"
              initialValues={{ courseCode: "" || "" }}
              onSubmit={async (values) => {
                const res = await getTimetableByCourse(values.courseCode);
                setCourseTimetable(res?.reservations || null);
              }}
            >
              {({ values }) => (
                <Form>
                  <Field
                    id="courseCode"
                    name="courseCode"
                    placeholder="5G00EV17-3003"
                    type="text"
                  />
                  <button type="submit">Submit</button>
                  <button
                    type="submit"
                    className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => {
                      const sendAsync = async () => {
                        await sendToServer(values.courseCode);
                      };
                      sendAsync();
                    }}
                  >
                    Add to your timetable
                  </button>
                </Form>
              )}
            </Formik>
            <h2 className="text-xl">Found these reservations:</h2>

            {courseTimetable ? (
              <MyCalendar data={courseTimetable} />
            ) : (
              <p>No reservations found</p>
            )}
          </div>
        </div>
        <div>{timetable ? <NewCalendar data={timetable} /> : null}</div>
      </div>
    </div>
  );
};

export default Timetable;
