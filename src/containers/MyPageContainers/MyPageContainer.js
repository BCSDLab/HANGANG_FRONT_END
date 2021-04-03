import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getValueOnLocalStorage,
  removeValueOnLocalStorage,
} from "utils/localStorageUtils";
import MypageAPI from "api/mypage";
import UserInfo from "components/MyPageComponents/UserInfo";
import { InnerContentWidth } from "static/Shared/commonStyles";
import PointSection from "components/MyPageComponents/PointSection";
import SettingSection from "components/MyPageComponents/SettingSection";
import debounce from "lodash.debounce";
import { logout } from "store/modules/auth";

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
  // const [isLoaded, setIsLoaded] = useState(false);
  const { isCheckedToken, isLoggedIn } = useSelector((state) => state.authReducer);

  const [current, setCurrent] = useState("pointRecords");

  // const [pointRecords, setPointRecords] = useState([
  //   {
  //     id: 4,
  //     user_id: 20,
  //     variance: 20,
  //     title: "회원 가입",
  //     created_at: "2021-03-22T10:55:52.000+00:00",
  //   },
  //   {
  //     id: 5,
  //     user_id: 20,
  //     variance: 50,
  //     title: "강의자료 업로드",
  //     created_at: "2021-03-24T12:55:52.000+00:00",
  //   },
  //   {
  //     id: 6,
  //     user_id: 20,
  //     variance: 50,
  //     title: "강의자료 업로드",
  //     created_at: "2021-03-24T16:55:52.000+00:00",
  //   },
  //   {
  //     id: 7,
  //     user_id: 20,
  //     variance: 20,
  //     title: "강의평가 작성",
  //     created_at: "2021-03-24T20:55:52.000+00:00",
  //   },
  //   {
  //     id: 8,
  //     user_id: 20,
  //     variance: -100,
  //     title: "강의자료 구입",
  //     created_at: "2021-03-24T22:55:52.000+00:00",
  //   },
  // ]);

  // const [userInfo, setUserInfo] = useState({
  //   activityAmount: {
  //     getLectureBankCommentCount: 0,
  //     LectureReview: 0,
  //     getLectureBankCount: 3,
  //   },
  //   infoDatas: {
  //     id: 20,
  //     portal_account: "jong1434@koreatech.ac.kr",
  //     nickname: "테스트4",
  //     major: ["산업경영학부", "컴퓨터공학부"],
  //     point: 20,
  //     is_deleted: false,
  //     created_at: "2021-03-22T10:55:51.000+00:00",
  //     updated_at: "2021-03-22T10:55:51.000+00:00",
  //   },
  // });

  const [pointRecords, setPointRecords] = useState([]);
  const accessToken = getValueOnLocalStorage("hangangToken").access_token || "";
  const [nicknameTest, setNicknameTest] = useState({
    currentNickname: "테스트4",
    tried: false,
    errorCode: "",
  });
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
  const [purchased, setPurchased] = useState([]);
  const [scrapped, setScrapped] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    if (isCheckedToken && isLoggedIn) {
      const { data: activityAmount } = await MypageAPI.getAmountOfActivity(accessToken);
      const { data: infoDatas } = await MypageAPI.getInfo(accessToken);
      setUserInfo({ activityAmount, infoDatas });
      setNicknameTest((prev) => ({
        ...prev,
        currentNickname: infoDatas.nickname,
      }));
      setIsLoaded(true);
    }
  }, [isCheckedToken, isLoggedIn]);

  useEffect(async () => {
    switch (current) {
      case "pointRecords":
        if (pointRecords.length === 0) {
          const { data } = await MypageAPI.getPointRecords(accessToken);
          setPointRecords(data);
        }
        break;
      default:
        break;
    }
  }, [current]);

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

  const kickOut = () => {
    history.push("/");
    alert("로그인 이후에 접근할 수 있습니다.");
  };

  return (
    <Wrapper>
      {!isLoaded && <span>로딩중</span>}
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
              {current === "purchased" && <span>구매한 강의자료</span>}
              {current === "scrapped" && <span>내 스크랩</span>}
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
      {/* {isCheckedToken && isLoggedIn && (
        <div>
          <span>sdfsf</span>
          <span>sdfsf</span>
        </div>
      )} */}
      {/* {isCheckedToken && !isLoggedIn && kickOut()} */}
    </Wrapper>
  );
};

export default MyPageContainer;
