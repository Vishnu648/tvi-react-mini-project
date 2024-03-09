import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToastMessage = (message = "...") => {
  toast(message, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    closeButton: false,
  });
};

export default showToastMessage;
