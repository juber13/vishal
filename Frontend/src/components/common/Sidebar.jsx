import XSvg from "../svgs/X";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";
//
const Sidebar = ({authUser, setAuthUser}) => {
  // console.log(authUser)
  const queryClient = useQueryClient();
  // logout functionality
  //  const [authUser, setAuthUser] =useState("");
  const navigate = useNavigate(); // For redirecting after logout
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  // const {mutate:logout, isLoading, isError, error} = useMutation({
  // 	mutationFn: async () => {
  // 		// try {
  // 			const res = await fetch("http://localhost:8080/api/auth/logout", {
  // 				method: "POST",
  // 			});
  // 			const data =await res.json();
  // 			if(!res.ok){
  // 				throw new Error(data.error || "Something went wrong");
  // 			}
  // 			return data;
  // 		// } catch (error) {
  // 		// 	throw new Error(error);
  // 		// }
  // 	},
  // 	onSuccess: () => {
  // 		toast.success("Logged out successfully!");
  // 		navigate("/login"); // Redirect to login page after logout
  // 	  },
  // 	  onError: (err) => {
  // 		toast.error(err.message || "Logout failed");
  // 	  },
  // });

  const handleLogout = async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      const res = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Logout failed");
      }
	  toast.success("Logout successful");
      setAuthUser(null); // Clear user state on logout
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      setIsError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
//   const data = {
//     fullName: "Vishal Gaikwad",
//     username: "vishal@gmail.com",
//     profileImg: "/Avatar/boy1.png",
//   };
//  const {data:authUser} = useQuery({queryKey: ["authUser"]})

  return (
    <div className="md:flex-[2_2_0] w-18 max-w-52">
      <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
        <Link to="/" className="flex justify-center md:justify-start">
          <XSvg className="px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900" />
        </Link>
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex justify-center md:justify-start">
            <Link
              to="/"
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <MdHomeFilled className="w-8 h-8" />
              <span className="text-lg hidden md:block">Home</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to="/notifications"
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <IoNotifications className="w-6 h-6" />
              <span className="text-lg hidden md:block">Notifications</span>
            </Link>
          </li>

          <li className="flex justify-center md:justify-start">
            <Link
              to={`/profile/${authUser?.username}`}
              className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <FaUser className="w-6 h-6" />
              <span className="text-lg hidden md:block">Profile</span>
            </Link>
          </li>
        </ul>
        {authUser && (
          <Link
            to={`/profile/${authUser.username}`}
            className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
          >
            <div className="avatar hidden md:inline-flex">
              <div className="w-8 rounded-full">
                <img src={authUser?.profileImg || "/avatar-placeholder.png"} />
              </div>
            </div>
            <div className="flex justify-between flex-1">
              <div className="hidden md:block">
                <p className="text-white font-bold text-sm w-20 truncate fullName">
                  {authUser?.fullname}
                </p>
                <p className="text-slate-500 text-sm">{authUser?.email}</p>
              </div>
              <BiLogOut
                className="w-5 h-5 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  if (!isLoading) handleLogout();
                }}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
