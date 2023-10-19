import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

Chart.register(CategoryScale);

const DemoPaper = styled(Paper)(({ theme }) => ({
  // width: "fit-content",
  // height: "fit-content",
  margin: "0.5em 0",
  // padding: "1em",
}));

// const CustomLegend = ({ labels, colors }) => {
//   return (
//     <div
//       className="custom-legend"
//       style={{
//         display: "flex",
//         gap: "1em",
//         width: "100%",
//         height: "30px",
//         justifyContent: "center",
//         alignItems: "flex-end",
//       }}
//     >
//       {labels.map((label, index) => (
//         <div
//           key={index}
//           className="legend-item"
//           style={{ display: "flex", gap: "0.5em" }}
//         >
//           <div
//             className="legend-color"
//             style={{
//               backgroundColor: colors[index],
//               width: "35px",
//               height: "13px",
//             }}
//           ></div>
//           <div className="legend-label">{label}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

function BarGraph({
  data,
  min,
  max,
}: {
  data:any;
  min: number;
  max: number;
}) {
  const options = {
    // legend: {
    //   display:false
    // },
    scales: {
      y: {
        min: min,
        max: max,
        stepSize: 2,
      },
    },
  };

  return (
    <DemoPaper elevation={5}>
      {/* {needLegend||<CustomLegend labels={legend.labels} colors={legend.colors} />} */}
      <Bar data={data} options={options} />
    </DemoPaper>
  );
}

export default BarGraph;
