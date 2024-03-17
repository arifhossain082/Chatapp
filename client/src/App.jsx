import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Register from "./pages/Register";


const App = () => {
  return (  
    <div className="App">
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Chat />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </div>
  );
}
 
export default App;