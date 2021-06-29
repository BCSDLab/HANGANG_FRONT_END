import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Wrapper,
  LeftSide,
  RightSide,
  Title,
  Amount,
  Professor,
  HashTagWrapper,
  HashTag,
  Classification,
  Rating,
  Bookmark,
} from "components/Shared/styles/LectureCard.style";

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
  const history = useHistory();

  return (
    <Wrapper
      onClick={() => {
        if (isEditMode) {
          chooseScrap(rest.data.id);
        } else {
          history.push(`/lecture/${rest.data.id}`);
        }
      }}
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
        <Rating>{rest.data.total_rating.toFixed(1)}</Rating>
      </RightSide>
    </Wrapper>
  );
};

const titleSlicer = (title) => {
  if (title.length > 26) {
    title = title.slice(0, 26) + "...";
  }
  return title;
};

LectureCard.propTypes = {
  isScrapped: PropTypes.bool,
  isChosen: PropTypes.bool,
  isEditMode: PropTypes.bool,
  chooseScrap: PropTypes.func,
  rest: PropTypes.object,
};

export default LectureCard;
