import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { BorderColor, ConceptColor, InnerContentWidth } from "static/Shared/commonStyles";

const NavigationWrapper = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${BorderColor};
`;

const InnerContent = styled.div`
  position: relative;
  display: flex;
  width: ${InnerContentWidth};
  height: 100%;
  padding: 25px 0px;
`;

const Logo = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/navigation_logo.png",
  alt: "로고",
})`
  width: 80px;
  margin-right: 40px;
`;

const StyledLink = styled(Link)`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 98px;
  height: 100%;
  font-size: 17px;
  color: ${ConceptColor};
  cursor: pointer;
`;

const AuthBox = styled.div`
  position: absolute;
  top: calc(50% - 10px);
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 20px;
`;

const Item = styled(Link)`
  all: unset;
  height: 100%;
  color: ${ConceptColor};
  font-size: 15px;
  line-height: 20px;
  cursor: pointer;
`;

const LogoutButton = styled(Item)``;

const MiddleLine = styled.div`
  width: 1px;
  height: 15px;
  margin: 0px 24px;
  background-color: #dadada;
`;

/**
 * NavigationContainer
 * 상단 네비게이션 바입니다.
 * history를 추적하며 ignorePathList에 현재 path가 있을 경우 Navigation bar가 보이지 않게 합니다.
 * ignorePathList는 AuthPage 관련 path들입니다.
 */
const NavigationContainer = () => {
  const { isCheckedToken, isLoggedIn } = useSelector((state) => state.authReducer);
  const ignorePathList = ["/login", "/findpwauth", "/findpw", "/signupauth", "/signup"];
  const [isVisible, setIsVisible] = useState(
    !ignorePathList.includes(window.location.pathname)
  );
  const history = useHistory();

  useEffect(() => {
    return history.listen((loc) => {
      setIsVisible(!ignorePathList.includes(loc.pathname));
    });
  }, [history]);

  return (
    isVisible && (
      <NavigationWrapper>
        <InnerContent>
          <Logo />
          <StyledLink to="/">홈</StyledLink>
          <StyledLink to="/lectures">강의평</StyledLink>
          <StyledLink to="/resources">강의자료</StyledLink>
          <StyledLink to="/timetables">시간표</StyledLink>
          {isCheckedToken && (
            <AuthBox>
              {!isLoggedIn && <Item to="/login">로그인</Item>}
              {isLoggedIn && <Item to="/my">마이페이지</Item>}
              <MiddleLine />
              {!isLoggedIn && <Item to="/signupauth">회원가입</Item>}
              {isLoggedIn && <LogoutButton as="button">로그아웃</LogoutButton>}
            </AuthBox>
          )}
        </InnerContent>
      </NavigationWrapper>
    )
  );
};

export default NavigationContainer;
