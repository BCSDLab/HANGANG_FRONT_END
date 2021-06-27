import { Promise } from "core-js";
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
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";
import { showAlertModal } from "store/modules/modalModule";
import { finishLoadResources, setUserInfos } from "store/modules/myPageModule";

const MyPageContainer = () => {
  const { isCheckedToken, isLoggedIn } = useSelector((state) => state.authReducer);
  const { isLoaded } = useSelector((state) => state.myPageReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  const [current, setCurrent] = useState("pointRecords");
  const [pointRecords, setPointRecords] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [scrapped, setScrapped] = useState([]);
  const [nicknameTest, setNicknameTest] = useState({
    currentNickname: "",
    tried: false,
    errorCode: "",
  });

  /**
   * 마이페이지에 필요한 API들을 요청합니다.
   * getAmountOfActivity : 우상단 사용자 활동 수들
   * getInfo : 사용자 정보
   * getPointRecords : 사용자 포인트 사용 내역
   */
  useEffect(async () => {
    if (isCheckedToken && !isLoggedIn) {
      sendAwayToHome(INVALID_ACCESS_WITHOUT_TOKEN, history, dispatch);
    } else if (isCheckedToken && isLoggedIn) {
      fetchUserInfos(setPointRecords, setNicknameTest, dispatch);
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
            const { data } = await MypageAPI.getPurchasedRecords();
            setPurchased(data);
          } catch (error) {
            sendAwayToHome(NOT_DEFINED_ERROR, history, dispatch);
          }
        }
        break;
      case "scrapped":
        if (scrapped.length === 0) {
          try {
            const { data } = await MypageAPI.getScrapLecture();
            setScrapped(data);
          } catch (error) {
            sendAwayToHome(NOT_DEFINED_ERROR, history, dispatch);
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
            <UserInfo current={current} setCurrent={setCurrent} />
          </UpperContent>
          <BelowContent>
            <Content>
              {current === "pointRecords" && <PointSection />}
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

const fetchUserInfos = async (setPointRecords, setNicknameTest, dispatch) => {
  try {
    const { getAmountOfActivity, getInfo, getPointRecords } = MypageAPI;

    const [
      { data: activityAmount },
      { data: infos },
      { data: pointRecords },
    ] = await Promise.all([getAmountOfActivity(), getInfo(), getPointRecords()]);

    setPointRecords(pointRecords);
    setNicknameTest((prev) => ({
      ...prev,
      currentNickname: infos.nickname,
    }));

    dispatch(setUserInfos({ activityAmount, infos, pointRecords }));
  } catch (error) {
    sendAwayToHome(TOKEN_EXPIRED_ERROR, history, dispatch);
  } finally {
    dispatch(finishLoadResources());
  }
};

/**
 * 허용되지 않은 접근을 할 경우,
 * Modal과 함께 홈으로 보냅니다.
 */
const sendAwayToHome = (type, history, dispatch) => {
  const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE[type];
  dispatch(showAlertModal({ title, content }));
  history.push("/");
};

const INVALID_ACCESS_WITHOUT_TOKEN = "INVALID_ACCESS_WITHOUT_TOKEN";
const TOKEN_EXPIRED_ERROR = "TOKEN_EXPIRED_ERROR";
const NOT_DEFINED_ERROR = "NOT_DEFINED_ERROR";

export default MyPageContainer;
