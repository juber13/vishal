import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/Home/HomePage"
import LoginPage from "./Pages/Login/LoginPage"
import SignUpPage from "./Pages/Signup/SignUpPage"
import  './index.css';
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import NotificationPage from "./Pages/notification/NotificationPage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/common/LoadingSpainner";
function App() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
 // User authentication check
 useEffect(() => {
  const fetchAuthUser = async () => {
    try {
      const res = await fetch("/api/auth/me"); // Corrected API path
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setAuthUser(data);
      console.log("authUser is Here:", data);
    } catch (err) {
      setAuthUser(null);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  fetchAuthUser();
}, []);

if (isLoading) {
  return (
    <div className="h-screen flex justify-center items-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}




  //user authentication check
//   const {data:authUser, isLoading, error, isError} = useQuery({
//     //we used querykey to give a unique name to our query and refer to it later
//     queryKey: ['authUser'],
//     queryFn: async () => {
//     try {
//       const res = await fetch("/api/auth/me");
//       const data = await res.json();
//       if(data.error) return null;
//       if(!res.ok){
//         throw new Error(data.error || "Something went wrong");
//       }
//       console.log("authUser is Here:", data); //its not show on web browser
//       return data;
//     } catch (error) {
//       throw new Error(error);
//     }
//   },
//   retry: false
//   });

// if(isLoading){
//   return (
//     <div className="h-screen flex justify-center items-center">
//       <LoadingSpinner size="lg"/>
//     </div>
//   );
// }
// console.log(authUser);

  return (
    <div className='flex max-w-6xl mx-auto'>
    <Sidebar authUser={authUser} setAuthUser={setAuthUser} />
      <Routes>
      <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage setAuthUser={setAuthUser} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/notifications" element={ authUser ?  <NotificationPage/>  : <Navigate to="/login"/>}/>
        <Route path="/profile/:username" element={ authUser ?  <ProfilePage/> : <Navigate to="/login"/>}/>
      </Routes>
      <RightPanel/>
      <Toaster/>
    </div>
  )
}

export default App
// time 04.09