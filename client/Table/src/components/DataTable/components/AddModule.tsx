import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Rating,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as RatingAPI from "../../../api/RatingAPI";
import * as SkillAPI from "../../../api/SkillAPI";
import * as UserAPI from "../../../api/UserAPI";

export default function AddModal({
  isOpen,
  handleOpenClose,
  users,
  weekNum,
}: {
  isOpen: boolean;
  handleOpenClose: () => void;
  users: Array<string>;
  weekNum:number
}) {
  const [skills, setSkills] = useState("");
  const [phase, setPhase] = useState("");
  const [teamPlay, setTeamPlay] = useState(0);
  const [attitude, setAttitude] = useState(0);
  const [technicalExpertise, setTechnicalExpertise] = useState(0);
  const [codingSkills, setCodingSkills] = useState(0);
  const [overAllScore, setOverAllScore] = useState(0);
  const [currentName, setCurrentName] = useState("");
  const [currentUserId, setCurrentUserId] = useState(-1);
  const handleClose = () => {
    handleOpenClose();
  };
  useEffect(()=>{
    (async ()=>{
      let id;
      if(currentName){
       id= await UserAPI.getUserIdByName(currentName)
      if(id.data.data)
      setCurrentUserId(id.data.data.id)
  }
})()
},[currentName])

  const handleUpdate = async () => {
    if(currentUserId>0){
    await RatingAPI.create(
      Number(teamPlay),
      Number(attitude),
      Number(technicalExpertise),
      Number(codingSkills),
      Number(overAllScore),
      Number(currentUserId)
    )
      .then(() => {
        console.log("res");
      })
      .catch(() => {
        console.log("rating err");
      });
    // Update in Skills Table
    await SkillAPI.addList(
      skills,
      phase,
      currentUserId
    )
      .then(() => {
        console.log("skill res");
      })
      .catch(() => {
        console.log("skill err");
      });

    handleClose();
    }
  }
  useEffect(()=>{
    if(!isOpen){
    setSkills("");
    setTeamPlay(0),
    setAttitude(0),
    setTechnicalExpertise(0),
    setCodingSkills(0),
    setOverAllScore(0),
    setPhase("")
    setCurrentUserId(-1)
  }
},[isOpen])
  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="Update row modal"
        aria-describedby="Updates row"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "1px solid #000",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={users}
            onInputChange={(event, newInputValue) => {
              setCurrentName(newInputValue);
            }}
            // sx={{ width: 300 }}
            renderInput={(params: any) => (
              <TextField
                {...params}
                // sx={{
                //   maxWidth: "150px",
                //   flexGrow: "1",
                // }}
                placeholder="Name"
                value={currentName}
                onChange={(event: any) => setCurrentName(event.target.value)}
                variant="outlined"
                // size="small"
              />
            )}
          />
          <TextField
            id="outlined-basic"
            label="Skills(',' seperated)"
            variant="outlined"
            defaultValue={skills}
            onChange={(event: any) => setSkills(event.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Phase</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={phase}
              value={phase}
              label="Phase"
              onChange={(event: any) => setPhase(event.target.value)}
            >
              <MenuItem value={"Intern"}>Intern</MenuItem>
              <MenuItem value={"Intern-Deployed"}>Intern-Deployed</MenuItem>
              <MenuItem value={"Full-Time"}>Full-Time</MenuItem>
            </Select>
            <Box
              sx={{
                padding: "1rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div>Team Play:</div>
              <Rating
                size="large"
                defaultValue={teamPlay}
                max={5}
                onChange={(event: any) => setTeamPlay(event.target.value)}
              />
            </Box>
            <Box
              sx={{
                padding: "1rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div>Attitude:</div>
              <Rating
                size="large"
                defaultValue={attitude}
                max={5}
                onChange={(event: any) => setAttitude(event.target.value)}
              />
            </Box>
            <Box
              sx={{
                padding: "1rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div>Technical Expertise:</div>
              <Rating
                size="large"
                defaultValue={technicalExpertise}
                max={5}
                onChange={(event: any) =>
                  setTechnicalExpertise(event.target.value)
                }
              />
            </Box>
            <Box
              sx={{
                padding: "1rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div>Coding Skills:</div>
              <Rating
                size="large"
                defaultValue={codingSkills}
                max={5}
                onChange={(event: any) => setCodingSkills(event.target.value)}
              />
            </Box>
            <TextField
              id="outlined-basic"
              label="Overall Score"
              variant="outlined"
              value={isNaN(overAllScore) ? 0 : overAllScore}
              onChange={(event: any) =>
                setOverAllScore(parseInt(event.target.value, 10))
              }
            />
          </FormControl>
          <Button variant="contained" onClick={handleUpdate}>
            Add
          </Button>
        </Box>
      </Modal>
    </>
  );
}
