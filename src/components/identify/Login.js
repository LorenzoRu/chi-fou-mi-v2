import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Form from "./Form";

export default function Login() {
  const { login } = useContext(AuthContext);
    const [error, setError] = useState(null);
    function handleLogin(e){
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        login(data.get("username"), data.get("password")).catch((err) => { 
            setError('Identifiants incorrects')
            console.log(err)
        })
    }
  return (
    <>
      <Form onSubmit={handleLogin} error={error}/>
      
    </>
  );
}
