import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { removeValueOnLocalStorage } from "utils/localStorageUtils";
import { logout } from "store/modules/auth";

import {
  NavigationWrapper,
  InnerContent,
  Logo,
  StyledLinkWrapper,
  StyledLink,
  NavigationUnderline,
  AuthBox,
  Item,
  MiddleLine,
  LogoutButton,
} from "./styles/NavigationContainer.style";

/**
 * NavigationContainer
 * 상단 네비게이션 바입니다.
 * history를 추적하며 ignorePathList에 현재 path가 있을 경우 Navigation bar가 보이지 않게 합니다.
 * ignorePathList는 AuthPage 관련 path들입니다.
 */
const NavigationContainer = () => {
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  const ignorePathList = ["/login", "/findpwauth", "/findpw", "/signupauth", "/signup"];
  const [isVisible, setIsVisible] = useState(
    !ignorePathList.includes(window.location.pathname)
  );
  const history = useHistory();
  const [current, setCurrent] = useState(window.location.pathname);
  const dispatch = useDispatch();

  useEffect(() => {
    return history.listen((loc) => {
      setCurrent(loc.pathname);
      setIsVisible(!ignorePathList.includes(loc.pathname));
    });
  }, [history]);

  const executeLogout = () => {
    dispatch(logout());
    removeValueOnLocalStorage("hangangToken");
    history.push("/");
  };

  return (
    isVisible && (
      <NavigationWrapper>
        <InnerContent>
          <Link to="/" style={{ all: "unset" }}>
            <Logo />
          </Link>
          <StyledLinkWrapper>
            <StyledLink to="/">홈</StyledLink>
            <StyledLink to="/lectures">강의평</StyledLink>
            <StyledLink to="/resources">강의자료</StyledLink>
            <StyledLink to="/timetable">시간표</StyledLink>
            <NavigationUnderline current={current} />
          </StyledLinkWrapper>
          <AuthBox>
            {!isLoggedIn && <Item to="/login">로그인</Item>}
            {isLoggedIn && <Item to="/my">마이페이지</Item>}
            <MiddleLine />
            {!isLoggedIn && <Item to="/signupauth">회원가입</Item>}
            {isLoggedIn && (
              <LogoutButton as="button" onClick={() => executeLogout()}>
                로그아웃
              </LogoutButton>
            )}
          </AuthBox>
        </InnerContent>
      </NavigationWrapper>
    )
  );
};

export default NavigationContainer;
