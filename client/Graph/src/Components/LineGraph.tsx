import React from 'react'
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

Chart.register(CategoryScale);

const DemoPaper = styled(Paper)(({ theme }:{theme:any}) => ({
    width: "46%",
    margin:"0.25em",
    padding: "0.5em",
    ...theme
  }));

function LineGraph({data}:{data:any}) {
  const [clicked, setClicked] = React.useState(false)
    const options = {
        scales: {
          y:
            {
              min: 0,
              max: 10,
              stepSize: 1,
            }
          }
      };
  
  return (
    <DemoPaper onClick={()=>{
      setClicked(!clicked)
    }} style={clicked?{width:"100%",height:"45vh"}:{}} elevation={5}><Line data={data} options={options} /></DemoPaper>   
  )
}

export default LineGraph