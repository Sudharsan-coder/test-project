import { Button, Modal, Rating, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import SkillsList from "./components/SkillsList";
import { MouseEvent, useState, useEffect } from "react";
import { BASE_URL } from "../../constants";
import Axios from 'axios';
import UpdateModal from "./components/UpdateModal";

// type rowType = {
//   sno:number;
//   name:string;
//   skill:Array<string>;
//   phase:string;
//   teamPlay:number;
//   attitude:number;
//   expertise:number;
//   codingSkills:number;
//   overallScore:number;
// }

type weekOption = {
  weekNum: number;
  weekName: string;
}

// const mockData = [
//   {
//     sno: 1,
//     name: "Jeyavishnu S",
//     skill: ["ReactJS","NextJS"],
//     phase: "Intern",
//     teamPlay: 4,
//     attitude: 5,
//     expertise: 5,
//     codingSkills: 5,
//     overallScore: 5
//   },
//   {
//     sno: 1,
//     name: "Jeyavishnu S",
//     skill: ["ReactJS","NextJS"],
//     phase: "Intern",
//     teamPlay: 4,
//     attitude: 5,
//     expertise: 5,
//     codingSkills: 5,
//     overallScore: 5
//   }
// ];

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
    overallScore: number,
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

export default function DataTable({ week, nameFilter, skillsFilter, phaseFilter }:{ week: number, nameFilter: string, skillsFilter: string, phaseFilter: string }) {

  // const tableData = [...mockData, ...mockData, ...mockData];

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [data, setData] = useState<Array<viewType>>([]);
  const [filteredData, setFilteredData] = useState<Array<viewType>>([]);
  const [currRow, setCurrRow] = useState<viewType>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const handleOpenClose = () => {
    setIsModalOpen(prev => !prev);
  }

  const preFill = () => {
    setCurrRow(prev => prev);
  }

  const handleUpdateRow = (row:viewType) => {
    setCurrRow(row);
    handleOpenClose();
  }

  const handleChangePage = ( event: MouseEvent<HTMLButtonElement> | null, newPage: number ) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = ( event: MouseEvent ) => {
    setRowsPerPage(parseInt(event?.target?.value , 10));
    setPage(0);
  }

  useEffect(() => {
    Axios.get(`${BASE_URL}/api/user/view/${week}`, { withCredentials: true })
    .then((res:any) => {
      setData([...res.data.data]);
    })
  }, [week]);

  useEffect(() => {
    setFilteredData(
      [...data.filter((value:viewType) => {
        return value.userName.startsWith(nameFilter);
      }).filter((value:viewType) => {
        return (value.skills.skills.filter((skill:string) => skill.includes(skillsFilter)).length > 0 || skillsFilter === '' )
      }).filter((value:viewType) => {
        return value.skills.phase.includes(phaseFilter);
      })]
    );
  }, [data, nameFilter, skillsFilter, phaseFilter])

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
              borderTopLeftRadius: '10px'
            },
            '& .MuiTableHead-root > .MuiTableRow-root:nth-child(1) > .MuiTableCell-root:last-child': {
              borderTopRightRadius: '10px'
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
            {filteredData && filteredData.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row:viewType, index:number) => (
              <TableRow key={crypto.randomUUID()}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{row?.userName}</TableCell>
                <TableCell><SkillsList skillsList={row?.skills.skills}/></TableCell>
                <TableCell>{row?.skills.phase ?? ''}</TableCell>
                <TableCell><Rating size="small" defaultValue={row?.ratings[0].teamPlay ?? 0} max={5} readOnly /></TableCell>
                <TableCell><Rating size="small" defaultValue={row?.ratings[0].attitude ?? 0} max={5} readOnly /></TableCell>
                <TableCell><Rating size="small" defaultValue={row?.ratings[0].technicalExpertise ?? 0} max={5} readOnly /></TableCell>
                <TableCell><Rating size="small" defaultValue={row?.ratings[0].codingSkills ?? 0} max={5} readOnly /></TableCell>
                <TableCell>{row?.ratings[0].overAllScore ?? 0}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={()=>handleUpdateRow(row)}
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
                count={filteredData.length}
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
      {isModalOpen && <UpdateModal isOpen={isModalOpen} handleOpenClose={handleOpenClose} row={currRow} prefill={preFill} />}
    </>
  )
}
