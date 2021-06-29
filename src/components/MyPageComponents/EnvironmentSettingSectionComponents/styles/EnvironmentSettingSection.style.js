import styled from "styled-components";
import {
  AlertColor,
  BorderColor,
  ButtonColor,
  ConceptColor,
  CopyRightColor,
  FontColor,
  MyPageSectionHeight,
  PlaceholderColor,
} from "static/Shared/commonStyles";

export const SettingSectionWrapper = styled.div`
  min-height: ${MyPageSectionHeight};
  padding-top: 48px;
`;

export const Profile = styled.div`
  width: fit-content;
  margin-right: 112px;
  display: flex;
  flex-direction: column;
`;

export const Setting = styled.div`
  width: 100%;
  margin-top: 40px;
`;

export const Etc = styled(Setting)`
  margin-bottom: 112px;
`;

export const ProfileLeftSection = styled.div`
  width: 547px;
  margin-top: 16px;
  margin-right: 112px;
`;

export const ProfileInput = styled.input`
  all: unset;
  height: 22px;
  width: 547px;
  margin: 16px 0px 32px 0px;
  padding-bottom: 4px;
  border-bottom: 1px solid ${BorderColor};
  font-size: 15px;
`;

export const NicknameInputWrapper = styled.div`
  position: relative;
`;

export const AlertImg = styled.img.attrs({
  src: "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/alert.png",
  alt: "경고 이미지",
})`
  position: absolute;
  right: 33px;
  bottom: 4px;
  width: 20px;
  height: 20px;
`;

export const NicknameModifySection = styled.div`
  position: absolute;
  right: 0;
  bottom: 6px;

  cursor: pointer;
`;

export const ModifyButton = styled.button`
  all: unset;
  font-size: 14px;
  color: ${PlaceholderColor};
`;

export const AbleButton = styled(ModifyButton)`
  color: ${ConceptColor};
`;

export const MajorGrid = styled.div`
  display: grid;
  grid-template-columns: 176px 176px;
  grid-template-rows: 29px 29px 29px 29px;
  gap: 24px 16px;
  margin-top: 16px;
`;

export const Major = styled.input.attrs(() => ({
  type: "button",
}))`
  width: 176px;
  height: 29px;
  line-height: 0px;
  outline: none;
  border: none;
  border-radius: 24px;
  color: ${({ choiced }) => (choiced ? "#fff" : `${FontColor}`)};
  background-color: ${({ choiced }) => (choiced ? `${ButtonColor}` : `${BorderColor}`)};
  font-size: 14px;
  font-weight: normal;
  cursor: pointer;
`;

export const ProfileRightSection = styled.div`
  width: calc(100% - 547px);
  margin-top: 16px;
`;

export const Label = styled.label`
  display: block;
  color: ${ConceptColor};
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

export const SubLabel = styled(Label)`
  color: ${FontColor};
`;

export const NotifyLabel = styled(Label)`
  color: ${FontColor};
  line-height: 25px;
  font-weight: normal;
`;

export const VersionNotify = styled.span`
  position: absolute;
  right: 0;
  color: ${PlaceholderColor};
  font-size: 14px;
  line-height: 24px;
`;

export const MajorSubLabel = styled.span`
  margin-left: 12px;
  color: ${PlaceholderColor};
  font-size: 12px;
  font-weight: normal;
`;

export const AlertLabel = styled.span`
  margin-left: 8px;
  color: ${AlertColor};
  font-size: 11px;
  font-weight: normal;
`;

export const Row = styled.div`
  all: unset;
  display: block;
  position: relative;
  height: 24px;
  margin-bottom: 26px;
`;

export const ToggleButton = styled.button`
  all: unset;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  padding: 0px 2px;
  align-items: center;
  width: 48px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ status }) => (status ? `${ConceptColor}` : `${CopyRightColor}`)};
  cursor: pointer;
`;

export const Circle = styled.div`
  position: absolute;
  right: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  transition: all 0.2s ease;
  transform: translateX(${({ status }) => (status ? 0 : -28)}px);
  /* transform: translateX(-28px); */
`;

export const RightButton = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/mypage/right.png",
  alt: "오른쪽 화살표",
})`
  position: absolute;
  top: 2px;
  right: 0;
  width: 20px;
  cursor: pointer;
`;

export const WithdrawalButton = styled.button`
  all: unset;
`;
