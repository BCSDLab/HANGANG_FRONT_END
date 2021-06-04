import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { BorderColor, ConceptColor, InnerContentWidth } from "static/Shared/commonStyles";
import { removeValueOnLocalStorage } from "utils/localStorageUtils";
import { logout } from "store/modules/auth";

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
  align-items: center;
  width: ${InnerContentWidth};
  height: 100%;
`;

const Logo = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/navigation_logo.png",
  alt: "로고",
})`
  width: 80px;
  margin-right: 40px;
  cursor: pointer;
`;

const StyledLinkWrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
`;

const StyledLink = styled(Link)`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 107px;
  font-size: 17px;
  color: ${ConceptColor};
  cursor: pointer;
`;

/**
 * A function to convert path to number.
 * resourcePathRegex is a regex expression to handle dynamic route of ~/resource/{id}
 * It prevent not allowed url such as "~/resource" or "~/resource/"
 * @param {string} current A string of current url
 * @returns A numbers to handle navigation underline.
 */
const currentConverter = (current) => {
  let resourcePathRegex = /(\/resource\/)[0-9]+/g;
  let lecturePathRegex = /(\/lecture\/)[0-9]+/g;

  if (current.includes("/lectures") || current.match(lecturePathRegex)) return 1;
  else if (current.includes("/resources") || current.match(resourcePathRegex)) return 2;
  else if (current.includes("/timetables")) return 3;
  else if (current.includes("/")) return 0;
  else return -1;
};

const NavigationUnderline = styled.div`
  display: ${({ current }) => (currentConverter(current) === -1 ? "none" : "block")};
  position: absolute;
  bottom: -1px;
  width: 107px;
  height: 2px;
  background-color: ${ConceptColor};
  transition: transform 0.3s ease;
  transform: translateX(${({ current }) => currentConverter(current) * 107}px);
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
  const { isLoggedIn } = useSelector((state) => state.authReducer);
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
    dispatch(logout({ errorCode: null }));
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
            <StyledLink to="/timetables">시간표</StyledLink>
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
