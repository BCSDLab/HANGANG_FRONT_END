import styled from "styled-components";
import { MorePath, notPushedThumb, pushedThumb } from "static/ResourceDetailPage/imgPath";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";

export const Delimiter = styled.div`
  width: 100%;
  height: 1px;
  margin: 24px 0;
  background-color: ${BorderColor};
`;

export const Title = styled.div`
  margin-bottom: 14px;
  font-size: 18px;
  font-weight: 500;
  color: ${FontColor};
`;

export const Writer = styled.div`
  font-size: 16px;
  color: ${PlaceholderColor};
  margin-bottom: 17px;
`;

export const CreatedAt = styled(Writer)`
  font-size: 14px;
  margin-bottom: 22px;
`;

export const More = styled.img.attrs({
  src: MorePath,
  alt: "more",
})`
  position: absolute;
  top: 27px;
  right: 27px;
  width: 24px;

  cursor: pointer;
`;

export const HitWrapper = styled.div`
  position: absolute;
  top: 83px;
  right: 27px;

  display: flex;
  align-items: center;
  height: 24px;
  display: flex;
`;

export const HitIcon = styled.img.attrs(({ isHit }) => ({
  src: isHit ? pushedThumb : notPushedThumb,
  alt: "hit",
}))`
  margin-top: 2px;
  width: 24px;
  cursor: pointer;
`;

export const HitAmount = styled.span`
  margin: 8px 0 0 6px;
  font-size: 16px;
  color: ${PlaceholderColor};
`;

export const ResourceInfoSection = styled.section`
  width: 100%;
  height: 337px;
  display: flex;
  justify-content: space-between;
`;

export const Thumbnail = styled.div`
  width: 337px;
  height: 100%;

  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;

  //background
  background-image: url(${({ thumbnailURL }) => thumbnailURL});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgba(34, 34, 34, 0.1);
  background-blend-mode: saturation;
`;

export const InfoWrapper = styled.div`
  position: relative;
  width: 343px;
  height: 100%;
`;

export const ResourceTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: ${FontColor};
  margin-right: 16px;
`;

export const ResourceCode = styled.span`
  font-size: 14px;
  color: ${PlaceholderColor};
`;

export const ResourceType = styled(ResourceCode)`
  position: absolute;
  right: 0;
  color: ${ConceptColor};
`;

export const TopPart = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 21px;
  margin: 3px 0 16px 0;
`;

export const Professor = styled.div`
  margin-bottom: 17px;
  font-size: 16px;
  color: ${FontColor};
`;

export const Semester = styled.div`
  font-size: 14px;
  color: ${PlaceholderColor};
  margin-bottom: 26px;
`;

export const Content = styled.div`
  width: 223px;
  font-size: 14px;
  color: ${FontColor};
  line-height: 1.5em;
`;

export const PurchaseButton = styled.input.attrs({
  type: "button",
  value: "구입하기(-100P)",
})`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;

  border-radius: 24px;
  border: none;

  background-color: ${({ isPurchased }) => (isPurchased ? "#bddcff" : `${ConceptColor}`)};
  font-size: 14px;
  font-weight: 500;
  color: #fff;

  cursor: ${({ isPurchased }) => (isPurchased ? "default" : "pointer")};
`;
