import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
  BorderColor,
  FontColor,
} from "static/Shared/commonStyles";

const Section = styled.section`
  width: 100%;
`;
const Wrapper = styled.section`
  padding: 40px;
`;

const InfoLabel = styled.label`
  display: block;
  margin: 32px 4px 24px 0;
  color: ${FontColor};
  font-size: 20px;
  font-weight: 500; 
`;
const SubInfoLabel = styled.p`
  display: contents;
  margin: 0 10px 24px 0;
  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;
const SubLabelGrey = styled.label`
  margin: 4px 4px 8px 0;
  font-size: 12px;
  color: #999999;
`;
const SubLabelInfo = styled.label`
  display: block;
  margin: 4px 29px 8px 0;
  font-size: 12px;
  color: ##222222;
`;
const SubLabel = styled.label`
  margin: 4px 29px 8px 4px;
  font-size: 12px;
  color: ##222222;
`;

const ReviewSection = styled.div`

`;

const ReviewTitleSection = styled.div`
  display:block;
  margin: 24px 0 4px 0;
`;
const ReviewWriterInfo = styled.label`
  display: inline-felx;
  justtify-content: flex-start;
  font-size: 12px;
  color: ${FontColor};
`;
const ReviewStarSection = styled.div`
  float: right;
`;
const StarIcon = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/LecturesDetailPage/star.png",
  alt: "stars",
})`
  width: 16px;
  height: 16px;
  z-index: 9990;
`;

const ReviewContent = styled.p`
  margin: 8px 0;  
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  color: #222222;
`;


const ContentReportSection = styled.div`

`;
const ReportButton = styled.a`
  float: right;
  margin: 4px 0 0 0;
  font-family: NotoSansCJKKR;
  font-size: 12px;
  text-align: right;
  color: #999999;
`;

const ThumbUpSection = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  cursor: pointer;
`;
const ThumbUpIcon = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/resourcepage/thumb_up.png",
  alt: "thumb up",
})`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  z-index: 9990;
`;
const ThumbUpPushedIcon = styled(ThumbUpIcon).attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/resourcepage/thumb_up_pushed.png",
  alt: "thumb upped ",
})`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  
  z-index: 9990;
`;


/**
 * TODO:
 * - nth-child 에 따른 구분선 css
 * - API연동
 * @param {*} param0 
 * @returns 
 */
const LectureReviewSection = ({  
  isLiked = true,
  chooseScrap = () => {},
  ...rest
}) => {

  return (
    <Section>
      <InfoLabel>개인 평가(10)</InfoLabel>
      {/* 반복 */}
      {/* {reviews.map((data) => ( */}
        {/* <LectureCard
          key={data.id}
          data={data}
          isScrapped={true}
          isChosen={selectedScrap.includes(data.id)}
          isEditMode={isEditMode}
          chooseScrap={chooseScrap}
        />
          */}

        <ReviewSection>
          <ReviewTitleSection>
            <ReviewWriterInfo>2020년 1학기 수강자</ReviewWriterInfo>
            <ReviewStarSection>
              <StarIcon></StarIcon>
              <StarIcon></StarIcon>
              <StarIcon></StarIcon>
            </ReviewStarSection>
          </ReviewTitleSection>

          <SubLabelGrey>과제정보</SubLabelGrey><SubLabel>팀플, 레포트, 퀴즈, 토론</SubLabel>
          <ReviewContent>
            성적은 후하게 주십니다. 그렇지만 출첵이 너무 빡세구요,,,,, 시험 난이도도 좀 어려웠어요.. 과제량은 보통입니다. 배울거 많은 대신 졸려요,, 이 점 염두해두시길 바랍니다. 그리고 한강 강의자료로 공부했는데 도움이 많이 되었습니다... 개꿀!
          </ReviewContent>

          <ContentReportSection>
            <ThumbUpSection>
              <ThumbUpIcon/>
              <SubLabelGrey>42</SubLabelGrey>
            </ThumbUpSection>
            <ReportButton>신고</ReportButton>
          </ContentReportSection>
        </ReviewSection>

        <ReviewSection>
          <ReviewTitleSection>
            <ReviewWriterInfo>2020년 1학기 수강자</ReviewWriterInfo>
            <ReviewStarSection>
              <StarIcon></StarIcon>
              <StarIcon></StarIcon>
              <StarIcon></StarIcon>
            </ReviewStarSection>
          </ReviewTitleSection>

          <SubLabelGrey>과제정보</SubLabelGrey>
          <SubLabel>팀플, 레포트, 퀴즈, 토론</SubLabel>
          <ReviewContent>
          성적은 후하게 주십니다. 그렇지만 출첵이 너무 빡세구요,w,,,, 시험 난이도도 좀 어려웠어요.. 과제량은 보통입니다. 배울거 많은 대신 졸려요,, 이 점 염두해두시길 바랍니다. 그리고 한강 강의자료로 공부했는데 도움이 많이 되었습니다... 개꿀!
성적은 후하게 주십니다. 그렇지만 출첵이 너무 빡세구요,,,,, 시험 난이도도 좀 어려웠어요.. 과제량은 보통입니다. 배울거 많은 대신 졸려요,, 이 점 염두해두시길 바랍니다. 그리고 한강 강의자료로 공부했는데 도움이 많이 되었습니다... 개꿀! 
          </ReviewContent>

          <ContentReportSection>
            <ThumbUpSection>
            {isLiked && <ThumbUpPushedIcon />} {!isLiked && <ThumbUpIcon/>}
            <SubLabelGrey>42</SubLabelGrey>
            </ThumbUpSection>
            <ReportButton>신고</ReportButton>
          </ContentReportSection>
        </ReviewSection>


        {/* ))} */}
    </Section>
  );
};

LectureReviewSection.defaultProps = {
  isLiked: false,
  chooseScrap: () => {},
  rest: {},
};
LectureReviewSection.propTypes = {
  isLiked: PropTypes.bool,
  chooseScrap: PropTypes.func,
  rest: PropTypes.object,
};
export default LectureReviewSection;

