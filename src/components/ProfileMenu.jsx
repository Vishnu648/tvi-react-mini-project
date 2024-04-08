import * as React from "react";
import Menu from "@mui/material/Menu";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./modals/LogoutModal";
import { BsBoxSeam } from "react-icons/bs";

export default function bMenu({ optionSetter }) {
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
        <p
          className="px-2 py-1 flex cursor-pointer items-center gap-1"
          onClick={() => {
            optionSetter("orderedItems");
            handleClose();
          }}
        >
          <div className="inline ">
            <BsBoxSeam />
          </div>
          Orders
        </p>
        <LogoutModal />
      </Menu>
    </div>
  );
}
