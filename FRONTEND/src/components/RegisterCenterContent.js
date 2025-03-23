import { useState } from "react";
import email_id_input from "../assets/email_id_input.png";
import password_input from "../assets/password_input.png";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

function RegisterCenterContent() {
  const [Student_Name, setName] = useState();
  const [Student_ID, setId] = useState();
  const [Email, setEmail] = useState();
  const [Department, setDepartment] = useState();
  const [Password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [userExist, setuserExist] = useState();
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const navigate = useNavigate();

  // const handleibutton =(e)=>{
  //   // e.preventDefault();
  //   console.log("aaaaaaa");
  //   setShowTooltip(true);
  //   console.log(`${showTooltip}`);
    
  // }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMismatch(Password !== e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (Password === confirmPassword) {
      const data = {
        // Student_ID: parseFloat(Student_ID),
        Student_ID: Student_ID.trim() !== "" ? parseInt(Student_ID, 10) : null,
        Student_Name,
        Department,
        Password,
        Email,
      };


      console.log("Data being sent to backend:", data);
      // const userData = await fetch(
      //   "https://au-hallbooking-backend.onrender.com/api/auth/register",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },  
      //     body: JSON.stringify(data),
      //   }
      // );  

      // if (userData.status === 201) {
      //   const token = await userData.json();
      //   localStorage.setItem("authToken", JSON.stringify(token));
      //   console.log("token stored...");
      //   navigate("../student/dashboard");
      // }
      try {
        const response = await fetch(
          // "https://au-hallbooking-backend.onrender.com/api/auth/register",
          "http://localhost:3001/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
  
        const result = await response.json();
        console.log("Response:", result);
  
        if (response.status === 201) {
          localStorage.setItem("authToken", JSON.stringify(result));
          console.log("Token stored...");
          navigate("../student/dashboard");
        } else if(response.status === 401){
          console.log("user exist");
          setuserExist(true);
          setTimeout(() => {
            setuserExist(false);
          }, 4000);
        } else if(response.status === 402){
          console.log("use strong password");
          setPasswordError(true);
          setTimeout(() => {
            setPasswordError(false);
          }, 4000);
        }
        else {
          console.error("Registration failed:", result);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };


   return (
    <div>
      <div className="flex flex-col items-center justify-center px-6 my-20">
        <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Register
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Enrollment Number
                </label>
                <input
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  type="text"
                  name="name"
                  className="bg-neutral-100 text-gray-900 sm:text-sm rounded-sm block w-full h-10  p-2.5"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Applicant name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="bg-neutral-100 text-gray-900 sm:text-sm rounded-sm block w-full h-10  p-2.5"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Department
                </label>
                <select
                  name="department"
                  className="bg-neutral-100 text-gray-900 sm:text-sm rounded-sm block w-full h-10  p-2.5"
                  required
                  onChange={(e) => {
                    setDepartment(e.target.value);
                  }}
                >
                  <option>Select your department</option>

                  <option>Department of BioMedical Engineering</option>
                  <option>Department of Civil Engineering and Applied Mechanics</option>
                  <option>Department of Computer Engineering</option>
                  <option>Department of Computer Technology and Applications</option> 
                  <option>Department of Electrical Engineering</option>
                  <option>Electronics and Instruementation Engineering</option>
                  <option>Department of Electronics and Telecommunication Engineering</option>
                  <option>Department of Humanities and Social Sciences</option>
                  <option>Department of Industrial and Production Engineering</option>
                  <option>Department of Information Technology </option>
                  <option>Department of Management Studies &#40;MBA&#41;</option>
                  <option>Department of Mechanical Engineering</option>
                  <option>Department of Pharmacy</option>
                  <option>Department of Applied Chemistry</option>
                  <option>Department of Applied Mathematics and Computational Sciences</option> 
                  <option>Department of Applied Physics and Optoelectronics</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Email ID
                </label>
                <div className="flex">
                  <div className="bg-sky-500 h-10 w-12 rounded-l-sm flex justify-center items-center">
                    <img
                      src={email_id_input}
                      className="h-5"
                      alt="email-icon"
                    ></img>
                  </div>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="bg-neutral-100 text-blue sm:text-sm rounded-sm block w-full h-10 p-2.5"
                    placeholder="student@fmail.com"
                    required
                  />
                </div>
              </div>
              {userExist && (
                <div role="alert">
                  <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                  User with this email already exist !!!
                  </div>
                  <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>Please use a different email or log in instead.</p>
                  </div>
                </div>
              )}
              <div className="relative">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  Password
                </label>
                <div className="flex items-center">
                  <div className="bg-sky-500 h-10 w-12 rounded-l-sm flex justify-center items-center">
                    <img
                      src={password_input}
                      className="h-5"
                      alt="lock-icon"
                    ></img>
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="bg-neutral-100 rounded-sm block w-full h-10 p-2.5"
                    required
                  />
                  <button
                    type="button"
                    className="ml-2 text-gray-500 hover:text-gray-700 relative"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    // onClick={handleibutton}
                  >
                    <FaInfoCircle size={18} />
                  </button>
                  {showTooltip && (
                    <div className="absolute top-12 right-0 bg-white border border-gray-300 shadow-md rounded-md p-2 w-64 text-sm text-gray-700" onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}>
                      <p className="font-medium">Password must:</p>
                      <ul className="list-disc ml-4">
                        <li>Be 6-18 characters long</li>
                        <li>Contain at least one number</li>
                        <li>Contain at least one special character (!@#$%^&*)</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {passwordError && (
                <div role="alert">
                  <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                  Make a Strong Password !!!
                  </div>
                  <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>Password must be 6-18 characters long, include a number and a special character.</p>
                  </div>
                </div>
              )}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">
                  Confirm password
                </label>
                <div className="flex">
                  <div className="bg-sky-500 h-10 w-12 rounded-l-sm flex justify-center items-center">
                    <img
                      src={password_input}
                      className="h-5"
                      alt="lock-icon"
                    ></img>
                  </div>
                  <input
                    type="password"
                    name="confirm-password"
                    onChange={handleConfirmPasswordChange}
                    placeholder="••••••••"
                    className="bg-neutral-100 rounded-sm block w-full h-10 p-2.5"
                    required
                  />
                  
                </div>
                
              </div>
              {passwordMismatch && (
                  <div role="alert" className="border border-red-400 rounded bg-red-100 px-4 py-3 text-red-700">
                    <span>Passwords do not match!</span>
                  </div>
              )}
 
              <div className="flex items-center justify-center">
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-sky-500 hover:underline"
                  >
                    Login
                  </a>
                </p>
              </div>
              <button
                type="submit"
                onClick={handleRegister}
                className="w-full text-white bg-sky-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterCenterContent;
