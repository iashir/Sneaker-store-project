import React, { useEffect } from "react";
import { auth } from "../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

export default function (ComposedClass, reload, adminRoute = null) {
  const [cookies, setCookie, removeCookie] = useCookies(["w_auth"]);

  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(async (response) => {
        if (await !response.payload.isAuth) {
          removeCookie("w_auth");
          if (reload) {
            props.history.push("/login");
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (reload === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, [dispatch, props.history]);

    return <ComposedClass {...props} user={user} />;
  }
  return AuthenticationCheck;
}
