import styled from "styled-components";
import {
  BorderColor,
  FontColor,
  ConceptColor,
  PlaceholderColor,
} from "static/Shared/commonStyles";

export const Section = styled.section`
  width: 368px;
  height: fit-content;

  padding: 24px;

  border: solid 1px ${BorderColor};

  min-height: 381px;
  border-radius: 8px;
`;

export const Wrapper = styled.section`
  min-height: 320px;
`;

export const InfoLabel = styled.div`
  display: block;

  margin: 0 10px 24px 0;

  font-size: 20px;
  font-weight: 500;
  color: ${FontColor};
`;

export const SubInfoLabel = styled.p`
  margin-bottom: 16px;
`;

export const SubWarningWrapper = styled.div`
  display: flex;

  height: 327px;

  justify-content: center;
  align-items: center;
`;
export const SubWarningLabel = styled.p`
  text-align: center;
  font-size: 12px;
  line-height: normal;
  letter-spacing: normal;
  color: ${PlaceholderColor};
`;

export const SubLabel = styled.label`
  margin: 16px 16px 17px 0;

  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  line-height: normal;
  color: ${PlaceholderColor};
`;
export const SubLabelContent = styled.label`
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  line-height: normal;
  color: ${FontColor};
`;
export const ClassContent = styled.div`
  height: 28px;

  margin-bottom: 13px;
  margin-left: 40px;

  line-height: 28px;
`;

export const ButtonWrapper = styled.div`
  display: contents;
`;

export const AddTimtable = styled.button`
  float: right;
  width: 56px;
  height: 28px;

  padding: 5px 0;

  border: none;

  background-color: ${ConceptColor};

  color: #fff;
  font-size: 12px;
  font-weight: 500;

  border-radius: 20px;
  cursor: pointer;

  :before {
    content: "담기";
  }
`;
export const RemoveTimetable = styled(AddTimtable)`
  background-color: #ffab2e;

  :before {
    content: "빼기";
  }
`;
