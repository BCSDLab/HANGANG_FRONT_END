import React from "react";
import { Link } from "react-router-dom";
import { InnerContentWidth } from "static/Shared/commonStyles";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 203px;
  background-color: #3e3e3e;
`;

const InnerContent = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${InnerContentWidth};
`;

const Left = styled.div`
  width: 90px;
  height: fit-content;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 668px;
  height: fit-content;
`;

const InnerPush = styled.div`
  display: flex;
  justify-content: space-between;
  width: 291px;
  margin-bottom: 42.5px;
`;

const InnerPushLink = styled(Link)`
  all: unset;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
`;

const ExternalURL = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 19.5px;
`;

const ExternalURLButton = styled.button`
  font-size: 15px;
  border: 1px solid #c9c9c9;
  border-radius: 15px;
  padding: 4px 17px;
  background-color: transparent;
`;

const ExternalLink = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  all: unset;
  font-size: 15px;
  color: #c9c9c9;
  cursor: pointer;
`;

const Right = styled.div`
  width: 72px;
  height: fit-content;
`;

const HangangLogo = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/footer_hangang_logo.png",
  alt: "한강 로고",
})`
  width: 90px;
`;

const FacebookLogo = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/facebook_icon.png",
  alt: "페이스북 아이콘",
})`
  width: 15px;
  margin-right: 30px;
`;

const HomeLogo = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/home_icon.png",
  alt: "홈 아이콘",
})`
  width: 27px;
`;

const CopyRight = styled.span`
  font-size: 12px;
  color: #b5b5b5;
`;

/**
 * FooterContainer
 * 하단 Footer 바입니다.
 * NavigationContainer와 마찬가지로 history를 추적하며
 * ignorePathList에 현재 path가 있을 경우 Navigation bar가 보이지 않게 합니다.
 * ignorePathList는 AuthPage 관련 path들입니다.
 */
const FooterContainer = () => {
  return (
    <FooterWrapper>
      <InnerContent>
        <Left>
          <HangangLogo />
        </Left>
        <Center>
          <InnerPush>
            <InnerPushLink to="/lectures">강의평</InnerPushLink>
            <InnerPushLink to="/resources">강의자료</InnerPushLink>
            <InnerPushLink to="/timetable">시간표</InnerPushLink>
          </InnerPush>
          <ExternalURL>
            <ExternalURLButton>
              <ExternalLink href="https://bcsdlab.com/">BCSD Lab 바로가기</ExternalLink>
            </ExternalURLButton>
            <ExternalURLButton>
              <ExternalLink href="https://www.koreatech.ac.kr/kor/Main.do">
                코리아텍 바로가기
              </ExternalLink>
            </ExternalURLButton>
            <ExternalURLButton>
              <ExternalLink href="https://portal.koreatech.ac.kr/login.jsp">
                아우누리 바로가기
              </ExternalLink>
            </ExternalURLButton>
            <ExternalURLButton>
              <ExternalLink>개인정보 처리방침</ExternalLink>
            </ExternalURLButton>
          </ExternalURL>
          <CopyRight>{`COPYRIGHT © ${new Date().getFullYear()} BCSD LAB ALL RIGHTS RESERVED.`}</CopyRight>
        </Center>
        <Right>
          <ExternalLink href="https://www.facebook.com/BCSD-Lab-1727922507422214/">
            <FacebookLogo />
          </ExternalLink>
          <ExternalLink href="https://www.hangang.com">
            <HomeLogo />
          </ExternalLink>
        </Right>
      </InnerContent>
    </FooterWrapper>
  );
};

export default FooterContainer;
