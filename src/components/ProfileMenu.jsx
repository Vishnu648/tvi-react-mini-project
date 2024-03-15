import * as React from "react";
import Menu from "@mui/material/Menu";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./modals/LogoutModal"

export default function bMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    handleClose();
    navigate("/login");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="cursor-pointer">
        <FaUser
          color="white"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
        <LogoutModal/>
      </Menu>
    </div>
  );
}
