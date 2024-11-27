import { Problem } from "@/types";

import DataTable from "./components/DataTable";
import { columns } from "./components/Columns";
import { useEffect, useState } from "react";

function getData(): Problem[] {
  return [
    {
      _id: "6741019a22060b4338a89795",
      title: "Two Sum",
      description: "",
      status: "pending",
      difficulty: "easy",
      testCases: [],
      boilerPlateCode: "j0ofj20934ikl",
      submissions: [],
      contestId: "hwoieuj9823",
      userId: "uoijewf2093f",
      createdAt: "2024-11-26T22:11:38.415+00:00",
      updatedAt: "2024-11-243T02:04:12.230+23:12",
    },
    {
      _id: "82uiojfwddfwse",
      title: "Palindrome Number",
      description: "",
      status: "solved",
      difficulty: "medium",
      testCases: [],
      boilerPlateCode: "0982oj3wf",
      submissions: [],
      contestId: "0uj2ipkwcu98",
      userId: "q032ujivpfds",
      createdAt: "2024-11-20T02:04:38.415+00:00",
      updatedAt: "2024-11-21T02:04:38.415+00:00",
    },
    {
      _id: "208pds32rwfwesd",
      title: "Roman to Integer",
      description: "",
      status: "pending",
      difficulty: "hard",
      testCases: [],
      boilerPlateCode: "9fuqa083jiepf",
      submissions: [],
      contestId: "fwoijqwefv",
      userId: "jfu98i2ewjiv",
      createdAt: "2024-11-18T02:04:38.415+00:00",
      updatedAt: "2024-11-19T02:04:38.415+00:00",
    },
  ];
}

const DashboardPage = () => {
  const [data, setdata] = useState<Problem[]>([]);

  useEffect(() => {
    (async () => {
      setdata(getData());
    })();
  }, []);

  return (
    <div className="bg-white">
      <div className="container">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default DashboardPage;
