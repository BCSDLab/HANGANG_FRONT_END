import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

import MypageAPI from "api/mypage";
import { InnerContentWidth } from "static/Shared/commonStyles";
import { getValueOnLocalStorage } from "utils/localStorageUtils";
import { kickOut } from "utils/kickOut";

import UserInfo from "components/MyPageComponents/UserInfo";
import PointSection from "components/MyPageComponents/PointSection";
import ScrapSection from "components/MyPageComponents/ScrapSection";
import PurchasedSection from "components/MyPageComponents/PurchasedSection";
import SettingSectionContainer from "./SettingSectionContainer";

const Wrapper = styled.div`
  position: relative;
  min-height: 798px;
  width: 100%;
`;

const UpperContent = styled.div`
  width: 100%;
  height: 285px;
  background-color: #f7f7f7;
`;

const BelowContent = styled.div`
  width: 100%;
  background-color: transparent;
`;

const Content = styled.div`
  width: ${InnerContentWidth};
  height: 100%;
  margin: 0 auto;
`;

const MyPageContainer = () => {
  const { addToast } = useToasts();
  const { isCheckedToken, isLoggedIn } = useSelector((state) => state.authReducer);
  const history = useHistory();

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

  let accessToken;
  if (getValueOnLocalStorage("hangangToken") === null) {
    kickOut(1);
  } else {
    accessToken = getValueOnLocalStorage("hangangToken").access_token;
  }

  useEffect(async () => {
    if (isCheckedToken && !isLoggedIn) {
      kickOut(1);
    } else if (isCheckedToken && isLoggedIn) {
      try {
        const { data: activityAmount } = await MypageAPI.getAmountOfActivity(accessToken);
        const { data: infoDatas } = await MypageAPI.getInfo(accessToken);
        setUserInfo({ activityAmount, infoDatas });
        setNicknameTest((prev) => ({
          ...prev,
          currentNickname: infoDatas.nickname,
        }));
      } catch (error) {
        kickOut(error.response.data.code);
      } finally {
        setIsLoaded(true);
      }
    }
  }, [isCheckedToken, isLoggedIn]);

  useEffect(async () => {
    switch (current) {
      case "pointRecords":
        if (pointRecords.length === 0) {
          try {
            const { data } = await MypageAPI.getPointRecords(accessToken);
            setPointRecords(data);
          } catch (error) {
            if (error.response.data.code === 5) {
              history.push("/");
              addToast("토큰이 만료되었습니다. 다시 로그인 해주세요.", {
                appearance: "error",
                autoDismiss: true,
              });
            }
          }
        }
        break;
      case "scrapped":
        if (scrapped.length === 0) {
          const { data } = await MypageAPI.getScrapLecture(accessToken);
          setScrapped(data);
        }
        break;
      default:
        break;
    }
  }, [isLoaded, current]);

  return (
    <Wrapper>
      {isLoaded && (
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
              {current === "purchased" && <PurchasedSection />}
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
      {/* {isCheckedToken && isLoggedIn && !isLoaded && <span>로딩중</span>}

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
              {current === "purchased" && <PurchasedSection />}
              {current === "scrapped" && <ScrapSection scrapped={scrapped} />}
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
      )} */}
    </Wrapper>
  );
};

export default MyPageContainer;
