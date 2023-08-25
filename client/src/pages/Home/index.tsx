import Axios from "axios";
import { BASE_URL } from "../../constants";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function Home({ user }:{ user:object }) {
  console.log(user);

  const navigate = useNavigate();

  const logout = () => {
    Axios.get(`${BASE_URL}/auth/logout`, {withCredentials: true})
    .then( () => { // (res) =>
      navigate('/signup');
    })
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={logout}
      >
        Logout
      </Button>
    </>
  )
}
