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
    "412157038681-c8tqkiqhgdp0ki166q1njst9uombe7gh.apps.googleusercontent.com";
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
        "https://seal-app-dk3kg.ondigitalocean.app/api/v1/auth/googlelogin",
        { idToken: response.tokenId }
      )
      .then((response) => {
        // console.log(response)
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
        setLoading(false);
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
        </div>
      )}
      <GoogleOAuthProvider clientId="181452812828-uslduiqspmak4k0red5o3he2qphqa234.apps.googleusercontent.com">
        {" "}
        <GoogleLogin
          clientId={clientId}
          buttonText={props.title}
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
