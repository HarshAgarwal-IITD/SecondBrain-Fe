import { BrowserRouter,Routes,Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard2 from "./pages/Dasboard2";

export default function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard></Dashboard>}></Route>
      <Route path="/brain/share/:link" element={<Dashboard2/>}></Route>
      <Route path="/Signin" element={<Signin></Signin>}></Route>
      <Route path="/Signup" element={<Signup></Signup>}></Route>
    </Routes>
    </BrowserRouter>
  )
}