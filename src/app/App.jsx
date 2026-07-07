import { Toaster } from "react-hot-toast"; 
import { AppRoutes } from "../router/AppRoutes.jsx";
import { Modal } from "../shared/components/Modal.jsx";

function App() {
  return (
     <>
      <Toaster 
        position="top-center"
        toastOptions={{
          style:{
            fontFamily: "inherit",
            fontWeight: "600",
            fontSize: "1rem",
            borderRadius: "8px",
          }
        }}
      />
      <Modal />
      <AppRoutes />
     </>
  );
}

export default App;
