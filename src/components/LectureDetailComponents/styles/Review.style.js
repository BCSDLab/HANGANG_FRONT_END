import styled from "styled-components";
import { FontColor, PlaceholderColor } from "static/Shared/commonStyles";

export const ReviewSection = styled.div`
  margin-bottom: 10px;

  border-bottom: 1px solid #eeeeee;

  :last-child {
    border: none;
  }
`;

export const ReviewTitleSection = styled.div`
  display: block;

  margin: 0 0 4px 0;
`;
export const ReviewWriterInfo = styled.label`
  display: inline-felx;

  font-size: 12px;
  color: ${FontColor};

  justtify-content: flex-start;
`;
export const ReviewStarSection = styled.div`
  float: right;
`;
export const StarIcon = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/LecturesDetailPage/star.png",
  alt: "star",
})`
  width: 16px;
  height: 16px;
`;
export const HalfStarIcon = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/LecturesDetailPage/half-star.png",
  alt: "half-star",
})`
  width: 16px;
  height: 16px;
`;

export const ReviewContent = styled.p`
  margin: 8px 0;

  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  color: ${FontColor};
`;

export const ContentReportSection = styled.div``;
export const ReportButton = styled.a`
  float: right;

  margin: 4px 0 0 0;

  font-size: 12px;
  text-align: right;
  color: ${PlaceholderColor};
  cursor: pointer;
`;

export const ThumbUpSection = styled.div`
  display: inline-flex;

  justify-content: flex-start;
  cursor: pointer;
`;
export const ThumbUpIcon = styled.img.attrs(({ isLiked }) => ({
  src: isLiked
    ? "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/resourcepage/thumb_up_pushed.png"
    : "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/resourcepage/thumb_up.png",
  alt: "thumb up",
}))`
  width: 16px;
  height: 16px;

  margin-right: 4px;
`;

export const SubLabelGrey = styled.label`
  margin: 4px 4px 8px 0;

  font-size: 12px;
  color: ${PlaceholderColor};
`;

export const SubLabel = styled.label`
  margin: 4px 29px 8px 4px;

  font-size: 12px;
  color: ${FontColor};
`;
