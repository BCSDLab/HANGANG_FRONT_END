import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import EtcBox from "components/MyPageComponents/EnvironmentSettingSectionComponents/EtcBox";
import MajorChoiceBox from "components/MyPageComponents/EnvironmentSettingSectionComponents/MajorChoiceBox";
import SettingBox from "components/MyPageComponents/EnvironmentSettingSectionComponents/SettingBox";
import UserInfoBox from "components/MyPageComponents/EnvironmentSettingSectionComponents/UserInfoBox";

const ProfileBox = styled.section`
  display: flex;
  margin-top: 50px;
`;

const EnvironmentSettingSectionContainer = () => {
  const { infos } = useSelector((state) => state.myPageReducer);

  return (
    <>
      <ProfileBox>
        <UserInfoBox infos={infos} />
        <MajorChoiceBox infos={infos} />
      </ProfileBox>
      <SettingBox />
      <EtcBox />
    </>
  );
};

export default EnvironmentSettingSectionContainer;
