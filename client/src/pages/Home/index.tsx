import Axios from "axios";
import { BASE_URL } from "../../constants";
import { Box, TextField, Autocomplete, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import AccountMenu from "../../components/AccountMenu";
import DataTable from "../../components/DataTable";

const weekData = [
  {
    number: 32,
    range: "06Aug-12Aug"
  },{
    number: 33,
    range: "13Aug-19Aug"
  },{
    number: 34,
    range: "20Aug-26Aug"
  },{
    number: 35,
    range: "27Aug-02Sep"
  },{
    number: 36,
    range: "03Sep-09Aug"
  },{
    number: 37,
    range: "10Sep-16Sep"
  },{
    number: 38,
    range: "17Sep-23Sep"
  },{
    number: 39,
    range: "24Sep-30Sep"
  },{
    number: 40,
    range: "01Oct-07Oct"
  },{
    number: 41,
    range: "08Oct-14Oct"
  }
];

export default function Home({ user }:{ user:{ userName:string, userImg:string, userEmail:string} }) {

  const navigate = useNavigate();

  const [ week, setWeek ] = useState(35);
  const [ nameFilter, setNameFilter ] = useState('');
  const [ skillsFilter, setSkillsFilter ] = useState('');
  const [ phaseFilter, setPhaseFilter ] = useState('');

  const logout = () => {
    Axios.get(`${BASE_URL}/auth/logout`, {withCredentials: true})
    .then( () => { // (res) =>
      navigate('/login');
    })
  }

  useEffect(() => {
    if(user.userName.length === 0)
      navigate('/login');
  },[])

  return (
    <>
      <Box>
        {/* navbar header */}
        <Box
          sx={{
            width:'100%',
            height:'auto',
            padding:'1rem',
            display:'flex',
            justifyContent:'flex-end',
          }}
        >
          {/* Accounts menu */}
          <AccountMenu
            userName={user.userName}
            userImg={user.userImg}
            handleLogout={logout}
          />
        </Box>
        {/* Main content */}
        <Box>
          {/* row containing filter input */}
          <Box
            sx={{
              width:'100%',
              height:'auto',
              padding:'0.25rem 1rem',
              display:'flex',
              flexDirection:'row',
              justifyContent:'space-between',
              gap:'10px'
            }}
          >
            <TextField
              sx={{
                minWidth:'150px',
                flexGrow:'1'
              }}
              placeholder="Name"
              value={nameFilter}
              onChange={(event:any) => setNameFilter(event.target.value)}
              variant="outlined"
              size="small"
            />
            <TextField
              sx={{
                minWidth:'150px',
                flexGrow:'1'
              }}
              placeholder="Skills"
              value={skillsFilter}
              onChange={(event:any) => setSkillsFilter(event.target.value)}
              variant="outlined"
              size="small"
            />
            {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={["Intern", "Intern-Deployed", "Full-Time"]}
              sx={{ minWidth: '150px' }}
              size="small"
              value={phaseFilter}
              defaultValue={''}
              isOptionEqualToValue={(options:string,value:string) => options.includes(value)}
              onChange={(event:any) => setPhaseFilter(event?.target.value)}
              renderInput={(params) => <TextField {...params} label="Phase" />}
            /> */}
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small-label">Select Phase</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                defaultValue={phaseFilter}
                label="Select Phase"
                onChange={( event:any )=> setPhaseFilter(event.target.value)}
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
                onChange={( event:any )=> setWeek(event.target.value)}
              >
                {weekData.map((week)=>(
                  <MenuItem key={crypto.randomUUID()} value={week.number}>
                    {week.range}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: '150px' }} size="small">
              <InputLabel id="select-small-label">Select Year</InputLabel>
              <Select
                labelId="select-small-label"
                id="select-small"
                value="2023"
                label="Year"
              >
                <MenuItem value={"2023"}>
                  2023
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Table with data */}
          <Box sx={{ padding: '0.25rem 1rem'}}>
            <DataTable week={week} nameFilter={nameFilter} skillsFilter={skillsFilter} phaseFilter={phaseFilter} />
          </Box>
        </Box>
      </Box>
    </>
  )
}
