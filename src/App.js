import React, { useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import {
  getValueOnLocalStorage,
  removeValueOnLocalStorage,
  setValueOnLocalStorage,
} from "utils/localStorageUtils";
import { setUserInfo, succeedTokenCheck } from "store/modules/auth";
import { useDispatch, useSelector } from "react-redux";

import AuthAPI from "api/auth";
import AuthRoute from "./AuthRoute";
import FindPwAuthPage from "pages/AuthPages/FindPwAuthPage";
import FindPwPage from "pages/AuthPages/FindPwPage";
import FooterContainer from "containers/Shared/FooterContainer";
import IndexPage from "pages/IndexPage";
import LectureDetailPage from "pages/LectureDetailPage";
import LecturesPage from "pages/LecturesPage";
import LoginPage from "pages/AuthPages/LoginPage";
import MyPage from "pages/MyPage";
import NavigationContainer from "containers/Shared/NavigationContainer";
import ResourceDetailPage from "pages/ResourceDetailPage";
import ResourcesPage from "pages/ResourcesPage";
import ScrollToTop from "containers/Shared/ScrollToTop";
import SignUpAuthPage from "pages/AuthPages/SignUpAuthPage";
import SignUpPage from "pages/AuthPages/SignUpPage";
import TimetablePage from "pages/TimeTablePage";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";

const Main = styled.main`
  height: fit-content;
  min-height: 1080px;
  min-width: 1135px;
  padding: 0 20px;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const App = () => {
  const { addToast } = useToasts();
  const { isCheckedToken } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  /**
   * refresh_token으로 refresh를 시도합니다.
   * 성공할 경우 로그인 처리,
   * 실패할 경우 로그인 페이지로 이동시키며
   * local storage에 있는 token을 지웁니다.
   * 참고 : https://drive.google.com/file/d/1fdPJc3IfiFc6l8OMxSJ2rOJisJsp0k8i/view?usp=sharing
   * @param {string} token
   */
  const refreshAccessToken = async (token) => {
    try {
      const res = await AuthAPI.refreshToken(token.refresh_token);

      if (res.status === 200) {
        const { data } = await AuthAPI.fetchUserInfo(res.data.access_token);
        dispatch(setUserInfo(data));
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
        addToast("토큰이 만료되었습니다. 다시 로그인 해주세요.", {
          appearance: "error",
          autoDismiss: true,
        });
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
        const { data } = await AuthAPI.fetchUserInfo(token.access_token);
        dispatch(setUserInfo(data));
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
   *
   * 유저가 브라우저를 종료시킨다면 autoLogin 값을 체크하여
   * false라면 LocalStorage의 token을 말소시킵니다.
   */
  useEffect(() => {
    if (!isCheckedToken) {
      checkTokenOnLocalStorage();
    }

    window.addEventListener("beforeunload", () => {
      const autoLoginKey = getValueOnLocalStorage("didHangangAutoLogin");
      if (!autoLoginKey) {
        removeValueOnLocalStorage("hangangToken");
      }
    });
    return () => {
      window.removeEventListener("beforeunload", () => {
        const autoLoginKey = getValueOnLocalStorage("didHangangAutoLogin");
        if (!autoLoginKey) {
          removeValueOnLocalStorage("hangangToken");
        }
      });
    };
  }, []);

  return (
    <>
      <Main role="main">
        <NavigationContainer />
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={IndexPage} />
            <Route path="/lectures" component={LecturesPage} />
            <Route path="/lecture" component={LectureDetailPage} />
            <Route path="/resources" component={ResourcesPage} />
            <Route path="/resource" component={ResourceDetailPage} />
            <Route path="/timetable" component={TimetablePage} />
            <AuthRoute path="/login" component={LoginPage} />
            <AuthRoute path="/findpwauth" component={FindPwAuthPage} />
            <AuthRoute path="/findpw" component={FindPwPage} />
            <AuthRoute path="/signupauth" component={SignUpAuthPage} />
            <AuthRoute path="/signup" component={SignUpPage} />
            <Route path="/my" component={MyPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </ScrollToTop>
      </Main>
      <FooterContainer />
    </>
  );
};

export default App;
