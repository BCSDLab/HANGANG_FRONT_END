import React, { useState } from "react";
import { FontColor, MyPageSectionHeight } from "static/Shared/commonStyles";
import styled from "styled-components";
import Scrap from "./Scrap/Scrap";

const ScrapSectionWrapper = styled.div`
  min-height: ${MyPageSectionHeight};
  padding-top: 48px;
  height: 100%;
`;

const ActionRow = styled.div`
  position: relative;
`;

const ActionLabel = styled.label`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${FontColor};
  cursor: pointer;
`;

const AllChoose = styled(ActionLabel)`
  left: 0;
  width: fit-content;
`;

const CheckImg = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/mypage/check_mypage.png",
  alt: "체크 이미지",
})`
  width: 18px;
  margin-right: 4px;
`;

const ScrapGrid = styled.div`
  display: grid;
  grid-template-columns: 555px 555px;
  grid-gap: 30px 25px;
  width: 100%;
  margin-top: 30px;
`;

const ScrapSection = ({ scrapped }) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const deleteScrap = () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      //API CALL
      setIsDeleteMode(false);
      alert("정상적으로 자료들을 삭제하였습니다.");
    }
  };

  return (
    <ScrapSectionWrapper>
      <ActionRow>
        {!isDeleteMode && (
          <ActionLabel onClick={() => setIsDeleteMode(true)}>편집</ActionLabel>
        )}
        {isDeleteMode && <ActionLabel onClick={() => deleteScrap()}>삭제</ActionLabel>}
        {isDeleteMode && (
          <AllChoose>
            <CheckImg />
            전체선택
          </AllChoose>
        )}
      </ActionRow>
      <ScrapGrid>
        {scrapped.map((attributes, index) => (
          <Scrap key={index} attributes={attributes} />
        ))}
      </ScrapGrid>
    </ScrapSectionWrapper>
  );
};

export default ScrapSection;
