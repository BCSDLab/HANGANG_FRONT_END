import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import MypageAPI from "api/mypage";
import {
  Wrapper,
  UpperContent,
  BelowContent,
  Content,
} from "containers/MyPageContainers/styles/MyPageContainer.style";
import SettingSectionContainer from "containers/MyPageContainers/SettingSectionContainer";
import UserInfo from "components/MyPageComponents/UserInfo";
import PointSection from "components/MyPageComponents/PointSection";
import ScrapSection from "components/MyPageComponents/ScrapSection";
import PurchasedSection from "components/MyPageComponents/PurchasedSection";
import LoadingSpinner from "components/Shared/LoadingSpinner";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import { kickOut } from "utils/kickOut";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";

const MyPageContainer = () => {
  const { isCheckedToken, isLoggedIn } = useSelector((state) => state.authReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  const [current, setCurrent] = useState("pointRecords");
  const [isLoaded, setIsLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({
    activityAmount: {},
    infoDatas: {},
  });
  const [pointRecords, setPointRecords] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [scrapped, setScrapped] = useState([]);
  const [nicknameTest, setNicknameTest] = useState({
    currentNickname: "",
    tried: false,
    errorCode: "",
  });

  /**
   * 유저가 token이 없이 접근할 경우 홈으로 내보냅니다.
   */
  let accessToken;
  if (getValueOnLocalStorage("hangangToken") === null) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE[
      "INVALID_ACCESS_WITHOUT_TOKEN"
    ];
    dispatch(showAlertModal({ title, content }));
    history.push("/");
  } else {
    accessToken = getValueOnLocalStorage("hangangToken").access_token;
  }

  /**
   * 유저가 로그인 하지 않고 url로 접근할 경우 홈으로 내보냅니다.
   *
   * 만약 로그인이 되어있다면, 마이페이지에 필요한 API들을 요청합니다.
   * getAmountOfActivity : 우상단 사용자 활동 수들
   * getInfo : 사용자 정보
   * getPointRecords : 사용자 포인트 사용 내역
   *
   * 모든 요청이 끝나면 setIsLoaded를 true로 해준다.
   * isLoaded가 false 인 경우 로딩 스피너를 보여준다.
   */
  useEffect(async () => {
    if (isCheckedToken && !isLoggedIn) {
      kickOut(1);
    } else if (isCheckedToken && isLoggedIn) {
      try {
        const { data: activityAmount } = await MypageAPI.getAmountOfActivity(accessToken);
        const { data: infoDatas } = await MypageAPI.getInfo(accessToken);
        const { data: pointRecords } = await MypageAPI.getPointRecords(accessToken);
        setUserInfo({ activityAmount, infoDatas });
        setPointRecords(pointRecords);
        setNicknameTest((prev) => ({
          ...prev,
          currentNickname: infoDatas.nickname,
        }));
      } catch (error) {
        const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["TOKEN_EXPIRED_ERROR"];
        dispatch(showAlertModal({ title, content }));
        history.push("/");
      } finally {
        setIsLoaded(true);
      }
    }
  }, [isCheckedToken, isLoggedIn]);

  /**
   * 구매한 강의자료, 내 스크랩을 누를 경우 이에 맞는 API를 호출합니다.
   */
  useEffect(async () => {
    switch (current) {
      case "purchased":
        if (purchased.length === 0) {
          try {
            const { data } = await MypageAPI.getPurchasedRecords(accessToken);
            setPurchased(data);
          } catch (error) {
            kickOut(5);
          }
        }
        break;
      case "scrapped":
        if (scrapped.length === 0) {
          try {
            const { data } = await MypageAPI.getScrapLecture(accessToken);
            setScrapped(data);
          } catch (error) {
            kickOut(5);
          }
        }
        break;
      default:
        break;
    }
  }, [isLoaded, current]);

  return (
    <Wrapper>
      {isCheckedToken && isLoggedIn && !isLoaded && <LoadingSpinner height="1005px" />}

      {isCheckedToken && isLoggedIn && isLoaded && (
        <>
          <UpperContent>
            <UserInfo userInfo={userInfo} current={current} setCurrent={setCurrent} />
          </UpperContent>
          <BelowContent>
            <Content>
              {current === "pointRecords" && (
                <PointSection
                  breakdown={pointRecords}
                  totalPoint={userInfo.infoDatas.point}
                />
              )}
              {current === "purchased" && <PurchasedSection purchased={purchased} />}
              {current === "scrapped" && (
                <ScrapSection scrapped={scrapped} setScrapped={setScrapped} />
              )}
              {current === "setting" && (
                <SettingSectionContainer
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                  nicknameTest={nicknameTest}
                  setNicknameTest={setNicknameTest}
                />
              )}
            </Content>
          </BelowContent>
        </>
      )}
    </Wrapper>
  );
};

export default MyPageContainer;
