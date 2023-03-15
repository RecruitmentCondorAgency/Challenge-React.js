import React, { useState } from "react";
import FormLogin from "../components/FormLogin";
import FormRegister from "../components/FormRegister";

const LoginPage = () => {
  const [changeInput, setChangeInput] = useState(true);
  if (localStorage.getItem("auth") === "true") window.location = "/";
  return (
    <div>
      {changeInput ? (
        <FormLogin setChangeInput={setChangeInput} changeInput={changeInput} />
      ) : (
        <FormRegister
          setChangeInput={setChangeInput}
          changeInput={changeInput}
        />
      )}
    </div>
  );
};

export default LoginPage;
