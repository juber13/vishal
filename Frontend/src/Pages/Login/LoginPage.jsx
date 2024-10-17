import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import XSvg from "../../components/svgs/X";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";  

const LoginPage = ({setAuthUser}) => {

  const [formData, setFormData] = useState({
    email: "abc@gmail.com",
    password: "12345678",
  });
  const  [isLoading , setIsLoading] = useState(false);
  const  [isError , setIsError] = useState(""); 
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const { mutate, isLoading, isError, error } = useMutation({
  //   mutationFn: async ({ email, password }) => {
  //    
      
  const login = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      // const data = await res.json();
      // Handle successful response

      const data = await res.json();
      console.log(data)
      if (res.ok) {
        console.log(data);
        // Handle successful login (e.g., storing token)
        setAuthUser(data.data);
        Cookies.set("token" , data.token);

        toast.success("Login successful!");
        // Invalidate the 'authUser' query to refresh the user data after login
        queryClient.invalidateQueries({ queryKey: ["authUser"] });

        // Redirect to the home page after successful login
        navigate("/"); // Added navigate to home
      } else {
        setIsError(data.message || "Enter currect email or password");
        toast.error(data.message || "Enter currect email or password");
      }
    } catch (err) {
      console.log(err);
      setAuthUser(null);
      setIsError('An error occurred');
    } finally {
      setIsLoading(false);
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };
      

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // mutate(formData); // Call mutate with formData on submit
  // login();
  // };



  return (
    <div className="max-w-screen-xl mx-auto flex h-screen">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">{"Let's"} go.</h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              required
            />
          </label>

          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
              required
            />
          </label>
          <button className="btn rounded-full btn-primary text-white">
            {isLoading ? "Loading..." : "Login"}
          </button>
          {isError && <p className="text-red-500">{isError}</p>}
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-white text-lg">{"Don't"} have an account?</p>
          <Link to="/signup">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
