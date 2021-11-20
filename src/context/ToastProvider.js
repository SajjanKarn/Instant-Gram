import { createContext } from "react";
import { toast, ToastContainer } from "react-toastify";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastContainer autoClose={2000} />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
