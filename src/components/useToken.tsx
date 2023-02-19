import { useState } from "react";

function useToken() {
  function getToken() {
    const userToken = localStorage.getItem("token");
    return userToken && userToken;
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken: any) {
    console.log("set token");
    localStorage.setItem("token", userToken);
    setToken(userToken);
  }

  function removeToken() {
    console.log("remove token");
    localStorage.removeItem("token");
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}

export default useToken;
