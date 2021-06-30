import styled from "styled-components";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";

export const Label = styled.label`
  color: ${FontColor};
  font-size: 16px;
  font-weight: 500;
`;

export const Content = styled.div`
  width: 100%;
  margin-top: 16px;
  border: 1px solid ${BorderColor};
  border-radius: 8px;
`;

export const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0px 12px;
  border-bottom: 1px solid ${BorderColor};
`;

export const Department = styled.div`
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 7px;
  height: 100%;

  border-bottom: 2px solid ${({ isTarget }) => (isTarget ? `#ffab2e` : `transparent`)};

  span {
    color: ${({ isTarget }) => (isTarget ? `${ConceptColor}` : `${PlaceholderColor}`)};
  }
`;

export const DepartmentLabel = styled.span`
  height: 18px;
  font-size: 12px;
  padding-top: 6px;
  cursor: pointer;
`;

export const LectureRow = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 70px;
  padding: 16px 24px;
  border-bottom: 1px solid ${BorderColor};
  cursor: pointer;
`;

export const LectureList = styled.div`
  ${LectureRow}:last-child {
    border-bottom: none;
  }
`;

export const Ranking = styled.span`
  width: 21px;
  height: 27px;
  margin: 5px 24px 0px 0px;
  font-size: 18px;
  font-weight: 500;
  color: ${ConceptColor};
`;

export const TitleProfessorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 24px;
  width: 199px;
`;

export const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${FontColor};
`;

export const Professor = styled.span`
  font-size: 12px;
  color: ${FontColor};
`;

export const Classification = styled.span`
  width: 50px;
  margin: 8px 24px 0px 0px;
  font-size: 12px;
  text-align: center;
`;

export const Rating = styled(Classification)`
  position: absolute;
  right: 24px;
  width: 24px;
  font-size: 16px;
  font-weight: 500;
  margin: 5px 0px 0px 0px;
`;
