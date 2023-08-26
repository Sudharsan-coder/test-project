import Axios from "axios";
import { BASE_URL } from "../../constants";
import { Box, TextField, Autocomplete, FormControl, InputLabel, Select, MenuItem, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AccountMenu from "../../components/AccountMenu";
import DataTable from "../../components/DataTable";


export default function Home({ user }:{ user:{ userName:string, userEmail:string, userImg:string} }) {

  const navigate = useNavigate();

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
              variant="outlined"
              size="small"
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[]}
              sx={{ minWidth: '150px' }}
              size="small"
              renderInput={(params) => <TextField {...params} label="Skills" />}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[]}
              sx={{ minWidth: '150px' }}
              size="small"
              renderInput={(params) => <TextField {...params} label="Phase" />}
            />
            <FormControl sx={{ minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small-label">Select Week</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value="20Aug-26Aug[Current Week]"
                label="Select Week"
                onChange={()=>{}}
              >
                <MenuItem value={"20Aug-26Aug[Current Week]"}>
                  20Aug-26Aug[Current Week]
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: '150px' }} size="small">
              <InputLabel id="select-small-label">Select Year</InputLabel>
              <Select
                labelId="select-small-label"
                id="select-small"
                value="2023"
                label="Year"
                onChange={()=>{}}
              >
                <MenuItem value={"2023"}>
                  2023
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Table with data */}
          <Box sx={{ padding: '0.25rem 1rem'}}>
            <DataTable/>
          </Box>
        </Box>
      </Box>
    </>
  )
}
