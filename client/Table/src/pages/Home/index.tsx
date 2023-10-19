import {
  FormControl,
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import Autocomplete from "@mui/material/Autocomplete";
import * as UserAPI from "../../api/UserAPI";
import * as RatingAPI from "../../api/RatingAPI";

function getStartDateFromWeekNumber(year: number, weekNumber: number) {
  const januaryFirst = new Date(year, 0, 1);
  const dayOfWeek = januaryFirst.getDay();
  const daysToAdd = 7 * (weekNumber - 1) - dayOfWeek;
  const startDate = new Date(year, 0, 1 + daysToAdd);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);
  return (
    startDate.toDateString().slice(4, 10) +
    "-" +
    endDate.toDateString().slice(4, 10)
  );
}
let weekData: any = [];
for (let i = 1; i < 53; i++) {
  let obj = { number: i, range: getStartDateFromWeekNumber(2023, i) };
  weekData.push(obj);
}

export default function Home() {
  const [week, setWeek] = useState(32);
  const [year, setYear] = useState();
  const [avaliableYears,setAvaliableYears ] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [skillsFilter, setSkillsFilter] = useState("");
  const [phaseFilter, setPhaseFilter] = useState("");
  const [users, setUsers] = useState([]);
// console.log(year)
  useEffect(() => {
    (async () => {
      const users = await UserAPI.getAllUsers();
      let list = users.data.data;
      list = list.map((item: any) => {
        return item.userName;
      });
      setUsers(list);
      const years=await RatingAPI.getYears().then(res=>res.data).catch(err=>{console.log(err)})
      // console.log(years.data)
      setAvaliableYears(years?.data)
      setYear(years.data[0])
    })();
  }, []);
  return (
    <>
      {/* <InputForm users={users}/> */}
      <Box>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            padding: "1rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        ></Box>
        <Box>
          <Box
            sx={{
              width: "100%",
              height: "auto",
              padding: "0.25rem 1rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              freeSolo
              options={users}
              onInputChange={(event, newInputValue) => {
                setNameFilter(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    minWidth: "150px",
                    flexGrow: "1",
                  }}
                  placeholder="Name"
                  value={nameFilter}
                  onChange={(event: any) => setNameFilter(event.target.value)}
                  variant="outlined"
                  size="small"
                />
              )}
            />
            <TextField
              sx={{
                minWidth: "150px",
                flexGrow: "1",
              }}
              placeholder="Skills"
              value={skillsFilter}
              onChange={(event: any) => setSkillsFilter(event.target.value)}
              variant="outlined"
              size="small"
            />
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small-label">Select Phase</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                defaultValue={phaseFilter}
                label="Select Phase"
                onChange={(event: any) => setPhaseFilter(event.target.value)}
              >
                <MenuItem value={"Intern"}>Intern</MenuItem>
                <MenuItem value={"Intern-Deployed"}>Intern-Deployed</MenuItem>
                <MenuItem value={"Full-Time"}>Full-Time</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small-label">Select Week</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                defaultValue={week}
                label="Select Week "
                onChange={(event: any) => setWeek(event.target.value)}
              >
                {weekData.map((week: { number: number; range: string }) => (
                  <MenuItem key={crypto.randomUUID()} value={week.number}>
                    {week.range}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: "150px" }} size="small">
              {/* <InputLabel id="select-small-label">Select Year</InputLabel> */}
              <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={avaliableYears}
              onInputChange={(event, newInputValue:any) => {
                setYear(newInputValue);
              }}
              renderInput={(params) =>{console.log(year);return (
                <TextField
                  {...params}
                  sx={{
                    minWidth: "150px",
                    flexGrow: "1",
                  }}
                  placeholder={`${year}`}
                  value={year}
                  onChange={(event: any) => setYear(event.target.value)}
                  variant="outlined"
                  size="small"
                />
              )}}
            />
            </FormControl>
          </Box>
          {/* Table with data */}
          <Box sx={{ padding: "0.25rem 1rem" }}>
            <DataTable
              users={users}
              year={year}
              week={week}
              nameFilter={nameFilter}
              skillsFilter={skillsFilter}
              phaseFilter={phaseFilter}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
