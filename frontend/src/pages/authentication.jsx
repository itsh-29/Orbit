import React from "react";
import "../styles/auth.css";
import { AuthContext } from "../contexts/AuthContext";
import { Snackbar } from "@mui/material";

export default function Authentication() {
const [username, setUsername] = React.useState("");
const [password, setPassword] = React.useState("");
const [name, setName] = React.useState("");

const [error, setError] = React.useState("");
const [message, setMessage] = React.useState("");

const [formState, setFormState] = React.useState(0);

const [open, setOpen] = React.useState(false);
const [loading, setLoading] = React.useState(false);

const { handleRegister, handleLogin } =
React.useContext(AuthContext);

const handleAuth = async () => {

  setError("");

  if(!username?.trim()){
    setError("Username is required");
    return;
  }
  if(!password?.trim()){
    setError("Password is required");
    return;
  }
  if(password.length < 6){
    setError("Password must be at least 6 characters");
    return;
  }
  if(formState === 1 && !name?.trim()){
    setError("Full name is required");
    return;
  }

  try{
  
  setLoading(true);
  
  if (formState === 0) {

    await handleLogin(
      username,
      password
    );

  } else {

    const result =
      await handleRegister(
        name,
        username,
        password
      );

    setMessage(result);
    setOpen(true);

    setFormState(0);

    setName("");
    setUsername("");
    setPassword("");
  }

} catch (err) {

  setError(
    err?.response?.data?.message|| 
    "Something went wrong"
  );
}finally{
  setLoading(false);
}


};

return ( <div className="authPage">


  <div className="authContainer">

    <div className="authLogo">
      ◎ Orbit
    </div>

    <div className="authSubtitle">
      Premium Collaboration Platform
    </div>

    <div className="authTabs">

      <button
        className={
          formState === 0
            ? "authTab active"
            : "authTab"
        }
        onClick={() => setFormState(0)}
      >
        Sign In
      </button>

      <button
        className={
          formState === 1
            ? "authTab active"
            : "authTab"
        }
        onClick={() => setFormState(1)}
      >
        Sign Up
      </button>

    </div>

    {formState === 1 && (
      <input
        className="authInput"
        placeholder="Full Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />
    )}

    <input
      className="authInput"
      placeholder="Username"
      value={username}
      onChange={(e) =>
        setUsername(e.target.value)
      }
    />

    <input
      className="authInput"
      placeholder="Password"
      type="password"
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
    />

    {error && (
      <p className="authError">
        {error}
      </p>
    )}

    <button
      className="authButton"
      onClick={handleAuth}
      disabled={loading}
    >
      {loading ? "Please wait...":
      formState === 0
        ? "Continue"
        : "Create Account"}
    </button>

  </div>

  <Snackbar
    open={open}
    autoHideDuration={4000}
    message={message}
  />

</div>


);
}
