import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from './pages/SignupPage';
import TodoPage from "./pages/TodoPage";
import { getAccessToken } from "./utils/getAccessToken";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route element={<PublicRouter/>}>
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/signin" element={<SigninPage />} />
        </Route>
        <Route element={<PrivateRouter/>}>
          <Route path="/todo" element={<TodoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const PublicRouter = () => { 
  const accessToken = getAccessToken('accessToken');  
  return accessToken ? <Navigate to="/todo" replace /> : <Outlet/>;
}

const PrivateRouter = () => {
  const accessToken = getAccessToken('accessToken');  
  return accessToken ? <Outlet/> : <Navigate to="/signin" replace />;    
}