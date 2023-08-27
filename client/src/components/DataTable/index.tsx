import { Button, Rating, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import SkillsList from "./components/SkillsList";
import { MouseEvent, useState, useEffect } from "react";
import { BASE_URL } from "../../constants";
import Axios from 'axios';

type rowType = {
  sno:number;
  name:string;
  skill:Array<string>;
  phase:string;
  teamPlay:number;
  attitude:number;
  expertise:number;
  codingSkills:number;
  overallScore:number;
}

type weekOption = {
  weekNum: number;
  weekName: string;
}

const mockData = [
  {
    sno: 1,
    name: "Jeyavishnu S",
    skill: ["ReactJS","NextJS"],
    phase: "Intern",
    teamPlay: 4,
    attitude: 5,
    expertise: 5,
    codingSkills: 5,
    overallScore: 5
  },
  {
    sno: 1,
    name: "Jeyavishnu S",
    skill: ["ReactJS","NextJS"],
    phase: "Intern",
    teamPlay: 4,
    attitude: 5,
    expertise: 5,
    codingSkills: 5,
    overallScore: 5
  }
];

export default function DataTable() {

  const customBorderRadius = '10px';

  const tableData = [...mockData, ...mockData, ...mockData];

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleUpdateRow = () => {
    
  }

  const handleChangePage = ( event: MouseEvent<HTMLButtonElement> | null, newPage: number ) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = ( event: MouseEvent ) => {
    setRowsPerPage(parseInt(event?.target?.value , 10));
    setPage(0);
  }

  useEffect(() => {
    Axios.get(`${BASE_URL}/api/user/all`, { withCredentials: true })
    .then((res:any) => {
      console.log(res);
    })
  }, []);

  return (
    <>
      <TableContainer>
        <Table
          sx={{
            minWidth: 650,
            borderCollapse: 'unset',
            '& .MuiTableCell-root': {
              padding: '10px',
              border: 'solid 1px #75757550',
              borderCollapse: 'separate !important'
            },
            '& .MuiTableHead-root > .MuiTableRow-root:nth-child(1) > .MuiTableCell-root:nth-child(1)': {
              borderTopLeftRadius: customBorderRadius
            },
            '& .MuiTableHead-root > .MuiTableRow-root:nth-child(1) > .MuiTableCell-root:last-child': {
              borderTopRightRadius: customBorderRadius
            }
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell rowSpan={2}>S.no</TableCell>
              <TableCell rowSpan={2}>Name</TableCell>
              <TableCell rowSpan={2}>Skill</TableCell>
              <TableCell rowSpan={2}>Phase</TableCell>
              <TableCell colSpan={4}>Rating</TableCell>
              <TableCell rowSpan={2}>Overall Score</TableCell>
              <TableCell rowSpan={2}>Action</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Team Play</TableCell>
              <TableCell>Attitude</TableCell>
              <TableCell>Technical Expertise</TableCell>
              <TableCell>Coding Skills</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row:rowType) => (
              <TableRow key={crypto.randomUUID()}>
                <TableCell>{row.sno}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell><SkillsList skillsList={row.skill}/></TableCell>
                <TableCell>{row.phase}</TableCell>
                <TableCell><Rating size="small" defaultValue={row.teamPlay} max={5} readOnly /></TableCell>
                <TableCell><Rating size="small" defaultValue={row.attitude} max={5} readOnly /></TableCell>
                <TableCell><Rating size="small" defaultValue={row.expertise} max={5} readOnly /></TableCell>
                <TableCell><Rating size="small" defaultValue={row.codingSkills} max={5} readOnly /></TableCell>
                <TableCell><Rating size="small" defaultValue={row.overallScore} max={5} readOnly /></TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleUpdateRow}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ) )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={10}
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5,10,25]}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}
