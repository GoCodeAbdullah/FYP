import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-modal";
import { FaSearch } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { ImCross } from "react-icons/im";
import { MdLocationPin } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TopBar from "../Components/TopBar";
import SideMenuBack from "../Components/SideMenuBack";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userService from "../services/UserService";

const QueryDetailsUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({});
  useEffect(() => {
    // userService.getLoggedInUser();
    // setLoggedInId(userService.getLoggedInUser()._id);
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") == null) {
      navigate("/login");

      // console.log("log in first");
    }
    if (
      userService.getLoggedInUser().user_type == "trainer" ||
      userService.getLoggedInUser().user_type == "gym" ||
      userService.getLoggedInUser().user_type == "admin"
    ) {
      navigate("/login");
    }
    if (location.state) {
      setData(location.state.e);
    }
  }, []);
  return (
    <div className="page-container-admin">
      <TopBar />
      <SideMenuBack />
      <h2>Query Details</h2>
      <div className="admin-box d-flex flex-column">
        <h4 className="mt-2">Query Subject: {data.query_subject}</h4>
        <h4 className="mt-2">Query Description: </h4>
        <p>{data.query_desc}</p>
        <h4 className="mt-2">Admin Response: </h4>

        {!data.query_response ? <p>No response yet!</p> : <p>{data.query_response}</p>}
      </div>
    </div>
  );
};

export default QueryDetailsUser;
