import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearMessage, setMessage } from '../redux/message';
import { Puff } from 'react-loader-spinner';
import axios from 'axios';


const initialState = {
  password: "",
  confirmPassword: ""
}

function ResetPassword() {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { message } = useSelector((state) => state.message)
  const { email } = useSelector((state) => state.auth)

  const [isLoading, setIsLoading] = useState(false)

  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  const resetPassword = async () => {
    setIsLoading(true)
    try {
      await axios.post("https://seashell-app-2-n2die.ondigitalocean.app//api/v1/auth/reset-password", {
        email: email,
        newPassword: values.password
      });
      navigate('/signin')
    } catch (error) {
      dispatch(setMessage(error.response.data.error))
    }
    setIsLoading(false)
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = values;

    // Verify if the password and confirmPassword meet the requirements
    if (password.trim() === '' || confirmPassword.trim() === '') {
      // Handle the empty password or confirmPassword error
      console.log('Password and confirmPassword cannot be empty');
      dispatch(setMessage('Password and confirmPassword cannot be empty'));
      return; // Stop further execution
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      // Handle the password length error
      dispatch(setMessage('Password and confirmPassword must have a minimum length of 6 characters'));
      return; // Stop further execution
    }

    // Verify if the password matches the confirmPassword
    if (password !== confirmPassword) {
      // Handle the password mismatch error
      dispatch(setMessage('Password and confirmPassword do not match'));
      return; // Stop further execution
    }

    // Passwords meet the requirements, proceed with the password reset
    resetPassword();
  };

  useEffect(() => {
    dispatch(clearMessage())
  }, [])


  return (
    <div className="flex flex-col min-h-screen  relative overflow-hidden ">
      {/* Site header */}

      {/* Page content */}
      <main className="grow ">
        <section>
          <div
            className="max-w-7xl md:mx-auto px-4 md:px-6 ">
            <div className="pt-32 pb-10 md:translate-y-[20%]  lg:translate-y-0   lg:pb-16 
            flex justify-center items-center">
              <div className="bg-white bg-opacity-10 px-2 shadow-2xl py-5 opacity-90 md:w-[70%] lg:w-[45%] w-full rounded-xl">
                {/* <div className="bg-white bg-opacity-10 px-2 shadow-2xl py-5 opacity-90 md:w-[70%] lg:w-[45%] w-full rounded-xl"> */}
                {/* Page header */}
                <div className="max-w-sm mx-auto text-start pb-12">
                  <h1 className="h4 font-cabinet-grotesk text-[#6366F1]">Reset password</h1>
                  <h1 className=" font-cabinet-grotesk">Please enter a new password</h1>
                </div>
                {/* Form */}
                <div className="max-w-sm mx-auto">
                  <form onSubmit={onSubmit}>
                    <div className="flex flex-wrap mb-4">
                      <div className="w-full">
                        <label className="block text-gray-500 text-sm font-medium mb-1" htmlFor="email">
                          Password
                        </label>
                        <input id="email" name="password" onChange={handleChange} type="password" className="form-input w-full text-gray-800" required />
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-4">
                      <div className="w-full">
                        <label className="block text-gray-500 text-sm font-medium mb-1" htmlFor="password">
                          Confirm password
                        </label>
                        <input id="password" name="confirmPassword" onChange={handleChange} type="password" className="form-input w-full text-gray-800" required />
                      </div>
                    </div>



                    <p className="flex text-sm my-1 justify-center items-center text-red-600">
                      {message}
                    </p>

                    <div className="flex flex-wrap my-2">
                      <div className="w-full">
                        <button type='submit' className="font-bold text-white bg-gradient-to-r from-[#9394d2] to-[#4446e4] py-3 w-full">

                          Reset password
                        </button>
                      </div>
                    </div>     </form>
                  {isLoading && <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]"> <Puff
                    height="100"
                    width="100"
                    color="#4446e4"
                    secondaryColor='#4446e4'
                    radius='12.5'
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                  </div>}


                </div>
              </div>
            </div></div>
        </section>
      </main>
    </div>
  );
}

export default ResetPassword;