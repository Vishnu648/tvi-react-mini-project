const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("role");
  handleClose();
  navigate("/login");
};


export {handleLogout}