import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import AuthAPI from "api/auth";
import {
  getValueOnLocalStorage,
  removeValueOnLocalStorage,
} from "utils/localStorageUtils";
import { succeedTokenCheck } from "store/modules/auth";
import { useToasts } from "react-toast-notifications";

const StyledLink = styled(Link)``;

const IndexContainer = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const { isCheckedToken, isLoggedIn } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  // 참고 : https://app.diagrams.net/#G1fdPJc3IfiFc6l8OMxSJ2rOJisJsp0k8i
  const refreshAccessToken = async (token) => {
    try {
      const res = await AuthAPI.refreshToken(token.refresh_token);
      if (res.status === 200) {
        dispatch(succeedTokenCheck({ isLoggedIn: true, token: token }));
      }
    } catch (err) {
      if (err.response.data.code === 6) {
        removeValueOnLocalStorage("token");
        history.push("/login");
        addToast("토큰이 유효하지 않습니다. 다시 로그인 해주세요.", {
          appearance: "error",
          autoDismiss: true,
        });
      }

      if (err.response.data.code === 9) {
        removeValueOnLocalStorage("token");
        history.push("/login");
        addToast(
          "2주 이내로 로그인 하지 않아 토큰이 만료되었습니다. 다시 로그인 해주세요.",
          {
            appearance: "error",
            autoDismiss: true,
          }
        );
      }
    }
  };

  const checkValidAccessToken = async (token) => {
    try {
      const res = await AuthAPI.authTest(token.access_token);
      if (res.status === 200) {
        dispatch(succeedTokenCheck({ isLoggedIn: true, token: token }));
      }
    } catch (err) {
      if (err.response.data.code === 5) {
        removeValueOnLocalStorage("token");
        history.push("/login");
        addToast("토큰이 유효하지 않습니다. 다시 로그인 해주세요.", {
          appearance: "error",
          autoDismiss: true,
        });
      }

      if (err.response.data.code === 8) {
        refreshAccessToken(token);
      }
    }
  };

  const checkTokenOnLocalStorage = () => {
    let token = getValueOnLocalStorage("token");
    if (!token) {
      dispatch(succeedTokenCheck({ isLoggedIn: false, token: "" }));
    } else {
      checkValidAccessToken(token);
    }
  };

  useEffect(() => {
    if (!isCheckedToken) {
      checkTokenOnLocalStorage();
    }
  }, []);

  return (
    <>
      {isCheckedToken && (
        <>
          {!isLoggedIn && (
            <StyledLink to="/login">
              <span>로그인</span>
            </StyledLink>
          )}
          {isLoggedIn && <span>로그아웃</span>}
        </>
      )}
    </>
  );
};

export default IndexContainer;
