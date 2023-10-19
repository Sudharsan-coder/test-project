import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import * as RatingAPI from "../API/RatingAPI.tsx";
import * as UserAPI from "../API/UserAPI.tsx";
import LineGraph from "./LineGraph.tsx";
import BarGraph from "./BarGraph.tsx";
// import Autocomplete from "@mui/material/Autocomplete";
import SearchBox from "./SearchBox.tsx";
const Suggestion = styled(Paper)(() => ({
  textAlign: "center",
  padding: "1.5vh",
  margin: "0.5em 0",
}));
const AllGraph = styled("div")(() => ({
  gridColumn: "1",
  display: "flex",
  flexFlow: "row wrap",
  height: "fit-content",
}));
const ButtonGroupContainer = styled("div")(() => ({
  display: "flex",
  gap: "2em",
  margin: "1em 0.3em",
  gridColumn: "1/span 2",
  alignItems: "center",
}));
const CombinedGraph = styled("div")(() => ({
  gridColumn: "2",
}));

const MainContainer = styled("div")(() => ({
  width: "fit-content",
  height: "fit-content",
  display: "grid",
  gridTemplateColumns: "44vw 55vw",
  // justifyItems:"center",
  // padding: "0.15em",
  "@media(max-width:750px)": {
    display: "grid",
    gridTemplateColumns: "35vw 65vw",
    // backgroundColor:"red"
  },
}));

function DrawGraph() {
  let [result, setResult] = useState([]);
  const [usersList, setUsersList] = useState({});
  const [selectedUser, setSelectedUser] = useState("");
  const [currentTimeInterval, setCurrentTimeInterval] = useState("weekly");
  const timeIntervals = ["weekly", "monthly", "yearly"];
  useEffect(() => {
    async function getUsers() {
      const users_list = await UserAPI.getAllUsers()
        .then((res) => res.data)
        .catch((err) => err);
      let userObj: any = {};
      if (users_list.status === 200) {
        users_list?.data.forEach((item: any) => {
          userObj[item.userName] = item.id;
        });
        setUsersList(userObj);
        setSelectedUser(Object.keys(userObj)[0])
      }
    }
    getUsers();
  }, []);
  useEffect(() => {
    if (selectedUser.length) {
      const fetchData = async () => {
        const res = await RatingAPI.getRatingByUserId(
          usersList[selectedUser],
          currentTimeInterval
        ).then((res) => res.data);
        setResult(res.data);
      };
      fetchData();
    }
  }, [selectedUser, currentTimeInterval]);
  const LineCharts: any = [];
  let CombinedArray: any = [];
  let combinedData: any = null;
  // let minIndexs = [];
  // let minValue = Number.MAX_SAFE_INTEGER;
  const factorsName = [
    "teamPlay"
    ,"attitude"
    ,"technicalExpertise"
    ,"codingSkills"
    ,"overAllScore"
  ];
  // console.log(result)
  const resultCount=result.length
  if (resultCount) {
    factorsName.forEach((item, index) => {
      let valuesArr:Array<number>=[]
      let labelsArr:Array<string>=[]
      result.forEach((obj:any)=>{
      const heading:string=Object.keys(obj)[0]
      const CurrentData=(obj[heading])[item]
      valuesArr.push(CurrentData)
      labelsArr.push(heading)
    })
    // console.log(valuesArr)
    const sum=valuesArr.reduce((total,cur)=>total+cur,0)/resultCount
    // console.log(sum)
    CombinedArray.push(sum)
    const data = {
      labels: labelsArr,
      datasets: [
        {
          label: item,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
            data: valuesArr,
          },
        ],
      };
      
      LineCharts.push(<LineGraph key={index} data={data} />);
    });
    console.log(result)
    combinedData = {
      labels: factorsName,
      datasets: [
        {
          label: "over all score",
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
          data: CombinedArray,
        },
      ],
    };
  }
  return (
    <MainContainer>
      {Object.keys(usersList).length && <ButtonGroupContainer>
        <SearchBox
          options={Object.keys(usersList)}
          initialValue={selectedUser}
          setUser={setSelectedUser}
          label="Select User"
        />
        <SearchBox
          options={timeIntervals}
          initialValue={currentTimeInterval}
          setUser={setCurrentTimeInterval}
          label="Select Interval"
        />
      </ButtonGroupContainer>
      }
      <AllGraph>{resultCount && LineCharts}</AllGraph>
      <CombinedGraph>
        {resultCount && <BarGraph data={combinedData} min={0} max={10} />}
      </CombinedGraph>
      <div>{resultCount ? "" : "No data to display"}</div>
    </MainContainer>
  );
}
export default DrawGraph;
