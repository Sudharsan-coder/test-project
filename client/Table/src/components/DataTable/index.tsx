import {
  Box,
  Button,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SkillsList from "./components/SkillsList";
import {useState, useEffect } from "react";
import AddModel from "./components/AddModule";
import UpdateModal from "./components/UpdateModal";
import * as UserAPI from "../../api/UserAPI";

// type weekOption = {
//   weekNum: number;
//   weekName: string;
// };

type viewType = {
  id: number;
  userName: string;
  googleId: string;
  userImg: string;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
  ratings: [
    {
      id: number;
      attitude: number;
      teamPlay: number;
      technicalExpertise: number;
      codingSkills: number;
      overAllScore: number;
      weekNum: number;
      year: string;
      createdAt: string;
      updatedAt: string;
    }
  ];
  skills: {
    id: number;
    skills: string;
    phase: string;
    createdAt: string;
    updatedAt: string;
  };
};

export default function DataTable({
  week,
  year,
  nameFilter,
  skillsFilter,
  phaseFilter,
  users,
}: {
  week: number;
  year:number|undefined,
  nameFilter: string;
  skillsFilter: string;
  phaseFilter: string;
  users: Array<string>;
}) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(1);
  const [data, setData] = useState<Array<viewType>>([]);
  const [filteredData, setFilteredData] = useState<Array<viewType>>([]);
  const [currRow, setCurrRow] = useState<viewType>();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  // console.log(data);
  const handleUpdateOpenClose = () => {
    setIsUpdateModalOpen((prev) => !prev);
    if (isUpdateModalOpen) {
      refresh();
    }
  };
  const handleAddOpenClose = () => {
    setIsAddModalOpen((pre) => !pre);
    if (isAddModalOpen) {
      refresh();
    }
  };
  // const preFill = () => {
  //   setCurrRow((prev) => prev);
  // };

  const handleUpdateRow = (row: viewType) => {
    setCurrRow(row);
    handleUpdateOpenClose();
  };

  const refresh = () => {
    return UserAPI.getView(week,rowsPerPage,page,year).then((res: any) => {
      setData([...res?.data?.data]);
      return res?.data?.data.length
    });
  };
  // const handleChangePage = ( event: MouseEvent<HTMLButtonElement> | null, newPage: number ) => {
  //   setPage(newPage);
  // }

  // const handleChangeRowsPerPage = ( event: MouseEvent ) => {
  //   setRowsPerPage(parseInt(event?.target?.value , 10));
  //   setPage(0);
  // }
// useEffect(()=>{refresh()},[])
  useEffect(() => {
    (async ()=>{
    const total:number=await refresh();
    setTotalRows(total)
    })()
  }, [week,year]);
  useEffect(()=>{
    refresh()
  },[page,rowsPerPage])
  useEffect(() => {
    setFilteredData([
      ...data
        .filter((value: viewType) => {
          return value.userName
            .toLowerCase()
            .startsWith(nameFilter.toLowerCase());
        })
        .filter((value: viewType) => {
          return (
            (value.skills.skills).split(",").filter((skill: string) =>
              skill.toLowerCase().includes(skillsFilter.toLowerCase())
            ).length > 0 || skillsFilter === ""
          );
        })
        .filter((value: viewType) => {
          return value.skills.phase.includes(phaseFilter);
        }),
    ]);
  }, [data, nameFilter, skillsFilter, phaseFilter]);

  return (
    <>
      <TableContainer>
        <Table
          sx={{
            minWidth: 650,
            borderCollapse: "unset",
            "& .MuiTableCell-root": {
              padding: "10px",
              border: "solid 1px #75757550",
              borderCollapse: "separate !important",
            },
            "& .MuiTableHead-root > .MuiTableRow-root:nth-child(1) > .MuiTableCell-root:nth-child(1)":
              {
                borderTopLeftRadius: "10px",
              },
            "& .MuiTableHead-root > .MuiTableRow-root:nth-child(1) > .MuiTableCell-root:last-child":
              {
                borderTopRightRadius: "10px",
              },
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
            {filteredData.length != 0 &&
              filteredData
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: viewType,index:number) => {
                  return (
                    // console.log()
                    <TableRow key={crypto.randomUUID()}>
                      <TableCell>{rowsPerPage*(page-1)+index+1}</TableCell>
                      <TableCell>{row?.userName}</TableCell>
                      <TableCell>
                        <SkillsList
                          skillsList={row?.skills?.skills?.split(",")}
                        />
                      </TableCell>
                      <TableCell>{row?.skills?.phase ?? ""}</TableCell>
                      <TableCell>
                        <Rating
                          size="small"
                          defaultValue={row?.ratings[0]?.teamPlay ?? 0}
                          max={5}
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        <Rating
                          size="small"
                          defaultValue={row?.ratings[0]?.attitude ?? 0}
                          max={5}
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        <Rating
                          size="small"
                          defaultValue={
                            row?.ratings[0]?.technicalExpertise ?? 0
                          }
                          max={5}
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        <Rating
                          size="small"
                          defaultValue={row?.ratings[0]?.codingSkills ?? 0}
                          max={5}
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        {row?.ratings[0]?.overAllScore ?? 0}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleUpdateRow(row)}
                        >
                          Update
                        </Button>
                        {/* <Button
                        variant="outlined"
                        size="small"
                        onClick={handleUpdateRow}
                      > 
                        Update
                      </Button>*/}
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
        <Box
          sx={{
            width: "100%",
            height: "auto",
            padding: "1rem 0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="outlined" size="small" onClick={handleAddOpenClose}>
            Add
          </Button>
        </Box>
      </TableContainer>
      {isUpdateModalOpen && (
        <UpdateModal
          isOpen={isUpdateModalOpen}
          // handleRow={handleUpdateRow}
          handleOpenClose={handleUpdateOpenClose}
          row={currRow}
          // prefill={preFill}
        />
      )}

      {isAddModalOpen && (
        <AddModel
          weekNum={week}
          users={users}
          isOpen={isAddModalOpen}
          handleOpenClose={handleAddOpenClose}
        />
      )}
      <Box
          sx={{
            width: "100%",
            height: "auto",
            padding: "1rem 0",
            display: "flex",
          }}
        >
      <Pagination count={Math.ceil(totalRows/rowsPerPage)} page={page} onChange={(event,value)=>{setPage(value)}} />
      <FormControl sx={{ minWidth: "150px" }} size="small">
              <InputLabel id="select-small-label">Per Table</InputLabel>
              <Select
                labelId="select-small-label"
                id="select-small"
                value={rowsPerPage}
                label="Year"
                onChange={(event: any) => setRowsPerPage(event.target.value)}
              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>
      </Box>
    </>
  );
}
