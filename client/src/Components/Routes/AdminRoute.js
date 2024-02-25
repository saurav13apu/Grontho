import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
  
    useEffect(() => {
      const authCheck = async () => {
        const res = await axios.get("http://localhost:8000/api/v1/auth/admin-auth").then(res => {
          console.log(res.data.ok)
          if (res.data.ok) {
            //console.log("Yes kelaa");
            setOk(true);
          } else {
            setOk(false);
          }
        })
        
      };
      if (auth?.token) authCheck();
    }, [auth?.token]);
  
    return ok ? <Outlet /> : <Spinner path=""/>;
  }
  