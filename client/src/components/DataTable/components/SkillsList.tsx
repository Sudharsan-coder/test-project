import { Box, Chip } from "@mui/material";


export default function SkillsList({ skillsList }:{ skillsList:Array<string> }) {
  
  return (
    <Box
      sx={{
        display:'flex',
        flexWrap:'wrap',
        gap:'10px'
      }}
    >
      {skillsList.map((skill : string) => {
        return <Chip key={crypto.randomUUID()} size="small" label={skill}/>
      })}
    </Box> 
  );
}
