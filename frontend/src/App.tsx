import { useEffect, useState } from "react";
import getData from "./services/timetable";

function App() {
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData();
      setData(res);
    };
    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="m-auto">
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
