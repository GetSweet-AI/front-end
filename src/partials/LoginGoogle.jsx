import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData, switchLoginStatus } from "../redux/auth";
import { useNavigate } from "react-router-dom";
import { Puff } from "react-loader-spinner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../index.css";

const LoginGoogle = (props) => {
  const clientId =
    "181452812828-uslduiqspmak4k0red5o3he2qphqa234.apps.googleusercontent.com";
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const responseGoogle = async (response) => {
    setLoading(true);
    // console.log(response)
    await axios
      .post(
        "https://seashell-app-2-n2die.ondigitalocean.app/api/v1/auth/googlelogin",
        { idToken: response.tokenId }
      )
      .then((response) => {
        // console.log(response)
<<<<<<< HEAD
        await axios.post('http://localhost:5000/api/v1/auth/googlelogin',
            { idToken: response.tokenId }
        ).then(response => {
            // console.log(response)
            // props.response(response) 123432²
            // alert("Hello")
            navigate('/brand-engagement-builder')
            //Change redux data
            dispatch(switchLoginStatus())
            dispatch(setUserData(response.data?.user))
            //Redirect to Brand engagement builder page

        })
            .catch(err => { console.log(err) })
        setLoading(false)
    }
    return (
        <div>
            {loading && <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]"> <Puff
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
            <GoogleOAuthProvider clientId="181452812828-uslduiqspmak4k0red5o3he2qphqa234.apps.googleusercontent.com"> <GoogleLogin
                clientId={clientId}
                buttonText="Sign-in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            /></GoogleOAuthProvider>

=======
        // props.response(response) 123432²
        // alert("Hello")
        navigate("/brand-engagement-builder");
        //Change redux data
        dispatch(switchLoginStatus());
        dispatch(setUserData(response.data?.user));
        //Redirect to Brand engagement builder page
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
  return (
    <div>
      {loading && (
        <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
          {" "}
          <Puff
            height="100"
            width="100"
            color="#4446e4"
            secondaryColor="#4446e4"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
>>>>>>> 0618f7f12c484cb6a91a503d967788ddda0d729d
        </div>
      )}
      <GoogleOAuthProvider clientId="181452812828-uslduiqspmak4k0red5o3he2qphqa234.apps.googleusercontent.com">
        {" "}
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign-in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          theme="dark"
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default LoginGoogle;
