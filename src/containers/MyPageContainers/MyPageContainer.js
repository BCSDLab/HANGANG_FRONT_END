import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
import styled from "styled-components";

import MypageAPI from "api/mypage";
import { logout } from "store/modules/auth";
import { InnerContentWidth } from "static/Shared/commonStyles";
import {
  getValueOnLocalStorage,
  removeValueOnLocalStorage,
} from "utils/localStorageUtils";
import { kickOut } from "utils/kickOut";

import UserInfo from "components/MyPageComponents/UserInfo";
import PointSection from "components/MyPageComponents/PointSection";
import ScrapSection from "components/MyPageComponents/ScrapSection";
import SettingSection from "components/MyPageComponents/SettingSection";
import PurchasedSection from "components/MyPageComponents/PurchasedSection";

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
  const history = useHistory();
  const dispatch = useDispatch();
  const { isCheckedToken, isLoggedIn } = useSelector((state) => state.authReducer);

  let accessToken;
  if (getValueOnLocalStorage("hangangToken") === null) {
    kickOut(1);
  } else {
    accessToken = getValueOnLocalStorage("hangangToken").access_token;
  }
  const [current, setCurrent] = useState("pointRecords");
  const [isLoaded, setIsLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({
    activityAmount: {
      getLectureBankCommentCount: -1,
      LectureReview: -1,
      getLectureBankCount: -1,
    },
    infoDatas: {
      id: -1,
      portal_account: "",
      nickname: "",
      major: [],
      point: 0,
      is_deleted: false,
      created_at: "",
      updated_at: "",
    },
  });
  const [pointRecords, setPointRecords] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [scrapped, setScrapped] = useState([]);
  const [nicknameTest, setNicknameTest] = useState({
    currentNickname: "",
    tried: false,
    errorCode: "",
  });

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
        console.log("여기요 1");
        kickOut(error.reponse.data.code);
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
            console.log("여기요 2");
            kickOut(error.reponse.data.code);
          }
        }
        break;
      case "scrapped":
        if (scrapped.length === 0) {
          const { data } = await MypageAPI.getScrapReviews(accessToken);
          setScrapped(data);
          console.log(data);
        }
        break;
      default:
        break;
    }
  }, [isLoaded, current]);

  const sendQuery = async (query) => {
    if (query.length === 0) return;
    try {
      const res = await MypageAPI.checkValidNickname(query);
      if (res.data.httpStatus === "OK") {
        setNicknameTest((prev) => ({ ...prev, tried: true, errorCode: "" }));
      }
    } catch ({ response }) {
      setNicknameTest((prev) => ({
        ...prev,
        tried: true,
        errorCode: response.data.code,
      }));
    }
  };
  const delayedQueryCall = useRef(debounce((q) => sendQuery(q), 200)).current;
  const checkValidNickname = (e) => {
    setNicknameTest((prev) => ({ ...prev, currentNickname: e.target.value }));
    delayedQueryCall(e.target.value);
  };

  const changeNickname = async () => {
    if (confirm("닉네임을 변경하시겠습니까?")) {
      try {
        await MypageAPI.updateUserInfo(
          accessToken,
          userInfo.infoDatas.major,
          nicknameTest.currentNickname
        );
        setUserInfo((prev) => ({
          ...prev,
          infoDatas: {
            ...prev.infoDatas,
            nickname: nicknameTest.currentNickname,
          },
        }));
        alert("닉네임을 성공적으로 변경하였습니다.");
      } catch (err) {
        alert("닉네임 변경 중 오류가 발생하였습니다.");
      }
    }
  };

  const changeMajor = async (target) => {
    let currentMajor = userInfo.infoDatas.major;
    if (currentMajor.includes(target)) {
      currentMajor = currentMajor.filter((elem) => elem !== target);
    } else {
      currentMajor = [...currentMajor, target];
    }

    try {
      await MypageAPI.updateUserInfo(
        accessToken,
        currentMajor,
        userInfo.infoDatas.nickname
      );

      setUserInfo((prev) => ({
        ...prev,
        infoDatas: {
          ...prev.infoDatas,
          major: currentMajor,
        },
      }));
    } catch (err) {
      if (err.response.data.code === 10) {
        alert("1개 이상의 전공이 선택되어야 합니다.");
      } else {
        alert("전공 변경 중 오류가 발생하였습니다.");
      }
    }
  };

  const membershipWithdrawal = async () => {
    if (confirm("회원 탈퇴를 하시겠습니까?")) {
      try {
        await MypageAPI.deleteUser(accessToken);
        alert("성공적으로 탈퇴 처리가 되었습니다.");
        dispatch(logout());
        removeValueOnLocalStorage("hangangToken");
        history.push("/");
      } catch (err) {
        alert("회원 탈퇴 처리 중 오류가 발생하였습니다.");
      }
    }
  };

  return (
    <Wrapper>
      {isCheckedToken && isLoggedIn && !isLoaded && <span>로딩중</span>}

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
                <SettingSection
                  nicknameTest={nicknameTest}
                  checkValidNickname={checkValidNickname}
                  changeNickname={changeNickname}
                  changeMajor={changeMajor}
                  userInfo={userInfo.infoDatas}
                  membershipWithdrawal={membershipWithdrawal}
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
