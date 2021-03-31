import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AuthAPI from "api/auth";
import {
  getValueOnLocalStorage,
  removeValueOnLocalStorage,
  setValueOnLocalStorage,
} from "utils/localStorageUtils";
import { succeedTokenCheck } from "store/modules/auth";
import { useToasts } from "react-toast-notifications";

const IndexContainer = () => {
  const { addToast } = useToasts();
  const { isCheckedToken, isLoggedIn } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  /**
   * refresh_token으로 refresh를 시도합니다.
   * 성공할 경우 로그인 처리,
   * 실패할 경우 로그인 페이지로 이동시키며
   * local storage에 있는 token을 지웁니다.
   * 참고 : https://app.diagrams.net/#G1fdPJc3IfiFc6l8OMxSJ2rOJisJsp0k8i
   * @param {string} token
   */
  const refreshAccessToken = async (token) => {
    try {
      const res = await AuthAPI.refreshToken(token.refresh_token);

      if (res.status === 200) {
        setValueOnLocalStorage("hangangToken", res.data);
        dispatch(succeedTokenCheck({ isLoggedIn: true, token: token }));
      }
    } catch (err) {
      if (err.response.data.code === 6) {
        removeValueOnLocalStorage("hangangToken");
        history.push("/login");
        addToast("토큰이 유효하지 않습니다. 다시 로그인 해주세요.", {
          appearance: "error",
          autoDismiss: true,
        });
      }

      if (err.response.data.code === 9) {
        removeValueOnLocalStorage("hangangToken");
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

  /**
   * access_token이 유효한지 검사합니다.
   * 유효하다면 로그인 처리, 유효하지 않다면 에러 코드에 따라
   * 재로그인, refresh_token으로 token 갱신을 시도합니다.
   * @param {string} token
   */
  const checkValidAccessToken = async (token) => {
    try {
      const res = await AuthAPI.authTest(token.access_token);
      if (res.status === 200) {
        dispatch(succeedTokenCheck({ isLoggedIn: true, token: token }));
      }
    } catch (err) {
      if (err.response.data.code === 5) {
        removeValueOnLocalStorage("hangangToken");
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

  /**
   * LS 가져온 토큰을 검사합니다.
   * 없을 경우 비로그인처리, 있을 경우 유효한지 검사합니다.
   */
  const checkTokenOnLocalStorage = () => {
    let token = getValueOnLocalStorage("hangangToken");
    if (!token) {
      dispatch(succeedTokenCheck({ isLoggedIn: false, token: "" }));
    } else {
      checkValidAccessToken(token);
    }
  };

  /**
   * IndexPage가 마운트 될 경우,
   * 유저의 local storage에서 토큰을 체크합니다.
   */
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
            <Link to="/login">
              <span>로그인</span>
            </Link>
          )}
          {isLoggedIn && <span>로그아웃</span>}
        </>
      )}
    </>
  );
};

export default IndexContainer;
