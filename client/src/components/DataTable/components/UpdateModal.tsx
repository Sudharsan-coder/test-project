import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Rating, Select, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { BASE_URL } from '../../../constants';
import Axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

type viewType = {
  id: number;
  userName: string;
  googleId: string;
  userImg: string;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
  ratings: [{
    id: number,
    attitude: number,
    teamPlay: number,
    technicalExpertise: number,
    codingSkills: number,
    overAllScore: number,
    weekNum: number,
    year: string,
    createdAt: string,
    updatedAt: string
  }],
  skills: {
    id: number,
    skills: Array<string>,
    phase: string,
    createdAt: string,
    updatedAt: string
  }
}

export default function UpdateModal({ isOpen, handleOpenClose, row }:{ isOpen:boolean, handleOpenClose:()=>void, row:viewType }) {

  const [skills, setSkills] = useState(row?.skills.skills.join(',') ?? "");
  const [phase, setPhase] = useState(row?.skills.phase ?? "");
  const [teamPlay, setTeamPlay] = useState(row?.ratings[0].teamPlay ?? 0);
  const [attitude, setAttitude] = useState(row?.ratings[0].attitude ?? 0);
  const [technicalExpertise, setTechnicalExpertise] = useState(row?.ratings[0]?.technicalExpertise ?? 0);
  const [codingSkills, setCodingSkills] = useState(row?.ratings[0].codingSkills ?? 0);
  const [overAllScore, setoverAllScore] = useState(Number(row.ratings[0].overAllScore));

  const handleClose = () => {
    handleOpenClose();
  }

  const navigate = useNavigate();

  const handleUpdate = async () => {
    console.log(row);
    await Axios.post(`${BASE_URL}/api/rating/update`, {
      teamPlay: teamPlay,
      attitude: attitude,
      technicalExpertise: technicalExpertise,
      codingSkills: codingSkills,
      overAllScore: overAllScore,
      userId: row.id,
      weekNum: row.ratings[0].weekNum
    }, { withCredentials: true })
    .then((res:AxiosResponse) => {
      console.log(res);
    }).catch((err:any) => {
      console.log(err);
    });
    await Axios.post(`${BASE_URL}/api/skill/update`, {
      skills: skills.split(','),
      phase: phase,
      userId: row.id
    }, { withCredentials: true })
    .then((res:AxiosResponse) => {
      console.log(res);
    }).catch((err:any) => {
      console.log(err);
    });
    navigate('/login');
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="Update row modal"
        aria-describedby="Updates row"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '1px solid #000',
          borderRadius: '10px',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <TextField 
            id="outlined-basic" 
            label="Username" 
            variant="outlined" 
            defaultValue={row?.userName ?? ''} 
            InputProps={{ readOnly:true }}
          />
          <TextField 
            id="outlined-basic" 
            label="Skills(',' seperated)" 
            variant="outlined" 
            defaultValue={skills} 
            onChange={(event:any)=>setSkills(event.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Phase</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={phase}
              value={phase}
              label="Phase"
              onChange={(event:any) => setPhase(event.target.value)}
            >
              <MenuItem value={"Intern"}>Intern</MenuItem>
              <MenuItem value={"Intern-Deployed"}>Intern-Deployed</MenuItem>
              <MenuItem value={"Full-Time"}>Full-Time</MenuItem>
            </Select>
            <Box
              sx={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div>Team Play:</div>
              <Rating 
                size="large" 
                defaultValue={teamPlay} 
                max={5}
                onChange={(event:any) => setTeamPlay(event.target.value)}
              />
            </Box>
            <Box
              sx={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div>Attitude:</div>
              <Rating 
                size="large" 
                defaultValue={attitude} 
                max={5}
                onChange={(event:any) => setAttitude(event.target.value)}
              />
            </Box>
            <Box
              sx={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div>Technical Expertise:</div>
              <Rating 
                size="large" 
                defaultValue={technicalExpertise} 
                max={5}
                onChange={(event:any) => setTechnicalExpertise(event.target.value)}
              />
            </Box>
            <Box
              sx={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div>Coding Skills:</div>
              <Rating 
                size="large" 
                defaultValue={codingSkills} 
                max={5}
                onChange={(event:any) => setCodingSkills(event.target.value)}
              />
            </Box>
            <TextField 
              id="outlined-basic" 
              label="Overall Score" 
              variant="outlined" 
              value={overAllScore}
              onChange={(event:any) => setoverAllScore(parseInt(event.target.value, 10))}
            />
          </FormControl>
          <Button
            variant="contained"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </>
  )
}
