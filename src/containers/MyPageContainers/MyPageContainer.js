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
import {
  finishLoadResources,
  setPurchasedResource,
  setScrappedLectures,
  setScrappedResources,
  setUserInfos,
} from "store/modules/myPageModule";
import {
  POINTS,
  PURCHASED,
  SCRAPPED_LECTURES,
  SCRAPPED_RESOURCES,
  SETTING,
} from "static/MyPage/MYPAGE_CURRENT_STATE";

const MyPageContainer = () => {
  const { isCheckedToken, isLoggedIn } = useSelector((state) => state.authReducer);
  const { isFetchedUserInfos } = useSelector((state) => state.myPageReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  const [current, setCurrent] = useState(POINTS);
  const [nicknameTest, setNicknameTest] = useState({
    currentNickname: "",
    tried: false,
    errorCode: "",
  });

  useEffect(async () => {
    if (isCheckedToken && !isLoggedIn) {
      sendAwayToHome(INVALID_ACCESS_WITHOUT_TOKEN, history, dispatch);
    } else if (isCheckedToken && isLoggedIn) {
      fetchUserInfos(setNicknameTest, dispatch);
    }
  }, [isCheckedToken, isLoggedIn]);

  useEffect(async () => {
    switch (current) {
      case PURCHASED:
        fetchPurchasedResource(dispatch);
        break;
      case SCRAPPED_LECTURES:
        fetchScrappedLectures(dispatch);
        break;
      case SCRAPPED_RESOURCES:
        fetchScrappedResources(dispatch);
        break;
      default:
        break;
    }
  }, [current]);

  return (
    <Wrapper>
      {isCheckedToken && isLoggedIn && !isFetchedUserInfos && (
        <LoadingSpinner height="1005px" />
      )}
      {isCheckedToken && isLoggedIn && isFetchedUserInfos && (
        <>
          <UpperContent>
            <UserInfo current={current} setCurrent={setCurrent} />
          </UpperContent>
          <BelowContent>
            <Content>
              {current === POINTS && <PointSection />}
              {current === PURCHASED && <PurchasedSection />}
              {current === SCRAPPED_LECTURES && <ScrapSection current={current} />}
              {current === SCRAPPED_RESOURCES && <ScrapSection current={current} />}
              {/* {TODO: erase set user info and nicknametest} */}
              {current === SETTING && (
                <SettingSectionContainer
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

const fetchScrappedResources = async (dispatch) => {
  try {
    const { data } = await MypageAPI.getScrapResources();
    dispatch(setScrappedResources({ resources: data }));
  } catch (error) {
    sendAwayToHome(NOT_DEFINED_ERROR, history, dispatch);
  }
};

const fetchScrappedLectures = async (dispatch) => {
  try {
    const { data } = await MypageAPI.getScrapLecture();
    dispatch(setScrappedLectures({ lectures: data }));
  } catch (error) {
    sendAwayToHome(NOT_DEFINED_ERROR, history, dispatch);
  }
};

const fetchPurchasedResource = async (dispatch) => {
  try {
    const { data } = await MypageAPI.getPurchasedRecords();
    dispatch(setPurchasedResource({ resource: data }));
  } catch (error) {
    sendAwayToHome(NOT_DEFINED_ERROR, history, dispatch);
  }
};

const fetchUserInfos = async (setNicknameTest, dispatch) => {
  try {
    const { getAmountOfActivity, getInfo, getPointRecords } = MypageAPI;

    const [
      { data: activityAmount },
      { data: infos },
      { data: pointRecords },
    ] = await Promise.all([getAmountOfActivity(), getInfo(), getPointRecords()]);

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
