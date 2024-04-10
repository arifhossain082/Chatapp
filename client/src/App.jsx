import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";


const App = () => {
  const { user } = useContext(AuthContext)
  return (  
    <ChatContextProvider user={user}>
    <div className="App">
    <Routes>
      <Route path="/login" element={ user ? <Chat /> : <Login />} />
      <Route path="/" element={user ? <Chat /> : <Login />} />
      <Route path="/register" element={user ? <Chat /> : <Register />} />
    </Routes>
    </div>
    </ChatContextProvider>
  );
}
 
export default App;