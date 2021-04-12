import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 557px;
  height: 133px;
  padding: 24px 0px 16px 28px;
  border-radius: 8px;
  border: solid 1px ${BorderColor};
  background-color: ${({ isChosen }) => (isChosen ? `${BorderColor}` : "#fff")};
  cursor: ${({ isEditMode }) => (isEditMode ? "pointer" : "default")};
`;

const LeftSide = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 447px;
  flex-direction: column;
`;

const RightSide = styled.div`
  position: relative;
  width: calc(555px - 447px);
  right: 28px;
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${FontColor};
`;

const Amount = styled.span`
  font-size: 13px;
  color: ${PlaceholderColor};
  margin-left: 4px;
`;

const Professor = styled(Title)`
  font-weight: normal;
  margin-top: 16px;
`;

const HashTagWrapper = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;

  margin-top: 16px;
`;

const HashTag = styled.span`
  font-size: 14px;
  color: ${PlaceholderColor};
  margin-right: 7px;
`;

const Classification = styled.span`
  position: absolute;
  right: 0;
  font-size: 14px;
  color: ${ConceptColor};
`;

const Rating = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 22px;
  color: ${FontColor};
`;

const Bookmark = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/mypage/bookmark.png",
  alt: "북마크",
})`
  position: absolute;
  top: -8px;
  left: 0;
  width: 32px;
`;

/**
 * LectureCard
 *
 * Usage : ~/my(scrapped) , ~/lectures
 */
const LectureCard = ({
  isScrapped = false,
  isChosen = false,
  isEditMode = false,
  chooseScrap = () => {},
  ...rest
}) => {
  const titleSlicer = (title) => {
    if (title.length > 26) {
      title = title.slice(0, 26) + "...";
    }
    return title;
  };

  return (
    <Wrapper
      onClick={() => isEditMode && chooseScrap(rest.data.id)}
      isEditMode={isEditMode}
      isChosen={isChosen}
    >
      {isScrapped && <Bookmark />}
      <LeftSide>
        <Title>
          {titleSlicer(rest.data.name)}
          <Amount>({rest.data.review_count})</Amount>
        </Title>
        <Professor>{rest.data.professor}</Professor>
        <HashTagWrapper>
          {rest.data.top3_hash_tag.map(({ id, tag }) => (
            <HashTag key={id}>{`# ${tag} `} </HashTag>
          ))}
        </HashTagWrapper>
      </LeftSide>
      <RightSide>
        <Classification>{rest.data.classification}</Classification>
        <Rating>{rest.data.total_rating}</Rating>
      </RightSide>
    </Wrapper>
  );
};

LectureCard.defaultProps = {
  isScrapped: false,
  isChosen: false,
  isEditMode: false,
  chooseScrap: () => {},
  rest: {},
};

LectureCard.propTypes = {
  isScrapped: PropTypes.bool,
  isChosen: PropTypes.bool,
  isEditMode: PropTypes.bool,
  chooseScrap: PropTypes.func,
  rest: PropTypes.object,
};

export default LectureCard;
