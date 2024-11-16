// App.js
import "./App.css";
import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./authContext";
import MainRoutes from "./Routes/MainRoutes";
import Register from "./components/m-components/firebaseVerification/register";
import Login from "./components/m-components/firebaseVerification/login";
import Navbar from "./components/shhivajiscompo/navbar/Navbar";
import Footer from "./components/shhivajiscompo/footer/Footer";
import InitialTransition from "./animations/intialTransition";
import BackgroundZoom from "./animations/grainyFilter";


function App() {
  
  return (
    <>
    
    <AuthProvider>
      
      <MainRoutes />
      <Footer />
    </AuthProvider></>
  );
}

export default App;
