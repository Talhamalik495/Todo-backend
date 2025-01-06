import { createContext, useEffect, useState } from "react";
import { AppRoutes } from "../constant/constant";
import Cookies from "js-cookie";
import axios from "axios";
import authenticate from "../../../middleware/authenticate";
export const authContext = createContext();
function Auth({ children }) {
  useEffect(() => {
    let token = Cookies.get("token");
    if (token) {
      userInfo(token);
    }
  }, []);
  let userInfo = (token) => {
    axios
      .get(AppRoutes.userInfo, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((data) => {
        setUser(data.data.data);
      });
  };
  let [user, setUser] = useState("ttttttttttttt");
  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
}

export default Auth;
