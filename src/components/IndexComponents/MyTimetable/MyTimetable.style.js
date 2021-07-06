import { Link } from "react-router-dom";
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

export const Lecture = styled.div`
  position: relative;
  width: 100%;
  min-height: 39px;
  margin-bottom: 24px;
  padding: 0 20px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 276px;
  border: 1px solid ${BorderColor};
  border-radius: 8px;
  margin-top: 16px;

  ${Lecture}:first-child {
    margin-top: 24px;
  }

  ${Lecture}:last-child {
    margin-bottom: 24px;
  }
`;

export const Name = styled.span`
  position: absolute;
  top: 2px;
  left: 20px;
  font-size: 14px;
  font-weight: 500;
  color: ${FontColor};
`;

export const Professor = styled.span`
  position: absolute;
  bottom: 2px;
  left: 20px;
  font-size: 12px;
  color: #828282;
`;

export const AssessButton = styled(Link)`
  all: unset;
  position: absolute;
  top: calc(50% - 14px);
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 28px;
  border-radius: 20px;
  background-color: ${ConceptColor};
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
`;

export const AssessedButton = styled(AssessButton)`
  color: ${PlaceholderColor};
  background-color: ${BorderColor};
  cursor: default;
`;

export const NoTimetable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NoTimetableWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 249.52px;
`;

export const NoTimetableSpan = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: ${PlaceholderColor};
`;

export const GotoTimetable = styled(Link)`
  all: unset;
  margin-top: 6px;
`;

export const GotoTimetableButton = styled.button`
  all: unset;
  height: 28px;
  margin-top: 2px;
  padding: 0px 20px;
  border-radius: 20px;
  background-color: ${BorderColor};
  color: ${FontColor};
  font-size: 12px;
  cursor: pointer;
`;
