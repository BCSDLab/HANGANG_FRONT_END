import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

import AuthAPI from "api/auth";
import {
  getValueOnLocalStorage,
  removeValueOnLocalStorage,
  setValueOnLocalStorage,
} from "utils/localStorageUtils";
import { succeedTokenCheck } from "store/modules/auth";

import { FontColor, InnerContentWidth } from "static/Shared/commonStyles";
import MajorSearchContainer from "containers/IndexContainers/MajorSearchContainer";
import RecommendResourceContainer from "containers/IndexContainers/RecommendResourceContainer";
import MyTimetableContainer from "containers/IndexContainers/MyTimetableContainer";
import RecentlyViewedLectureContainer from "containers/IndexContainers/RecentlyViewedLectureContainer";
import LectureRankingContainer from "containers/IndexContainers/LectureRankingContainer";

const Wrapper = styled.div`
  width: ${InnerContentWidth};
  margin: 0 auto;
`;

const Banner = styled.div`
  position: relative;
  min-width: ${InnerContentWidth};
  height: 289px;
  margin-top: 40px;
`;

const CatchPhraseWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 240px;
  margin-bottom: 40px;
`;

const BoldSpan = styled.span`
  margin-top: 16px;
  font-size: 36px;
  font-weight: 800;
  color: ${FontColor};
`;

const NormalSpan = styled.span`
  font-size: 18px;
  font-weight: normal;
  color: ${FontColor};
`;

const BannerImg = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/index_page_image.png",
  alt: "메인페이지 이미지",
})`
  position: absolute;
  right: 0;
  width: 445px;
`;

const MajorSearchSection = styled.section`
  position: relative;
  width: 100%;
  margin-bottom: 32px;
`;

const LectureRankingSection = styled.section`
  width: 464px;
  height: fit-content;
`;

const RestSection = styled.section`
  width: 655px;
  margin-left: 16px;
`;

const RestTopSection = styled.section`
  width: 655px;
  margin-bottom: 32px;
`;

const RestBottomSection = styled.section`
  display: flex;
  width: 655px;
`;

const RestBottomLeftSection = styled.section`
  width: 368px;
  margin-right: 16px;
`;

const RestBottomRightSection = styled.section`
  width: 272px;
`;

const IndexPage = () => {
  const { addToast } = useToasts();
  const { isCheckedToken } = useSelector((state) => state.authReducer);
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
    <Wrapper>
      <Banner>
        <CatchPhraseWrapper>
          <NormalSpan>솔직한 강의평을 원한다면?</NormalSpan>
          <BoldSpan>가자, 한강으로!</BoldSpan>
        </CatchPhraseWrapper>
        <BannerImg />
      </Banner>
      <MajorSearchSection>
        <MajorSearchContainer />
      </MajorSearchSection>
      <div style={{ display: "flex", marginBottom: "100px" }}>
        <LectureRankingSection>
          <LectureRankingContainer />
        </LectureRankingSection>
        <RestSection>
          <RestTopSection>
            <RecommendResourceContainer />
          </RestTopSection>
          <RestBottomSection>
            <RestBottomLeftSection>
              <MyTimetableContainer />
            </RestBottomLeftSection>
            <RestBottomRightSection>
              <RecentlyViewedLectureContainer />
            </RestBottomRightSection>
          </RestBottomSection>
        </RestSection>
      </div>
    </Wrapper>
  );
};

export default IndexPage;
