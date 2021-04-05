import React from "react";
import styled from "styled-components";

import {
  BorderColor,
  ConceptColor,
  FontColor,
  MyPageSectionHeight,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { PointGuidanceArr } from "static/MyPage/PointGuidance";

const Section = styled.section`
  min-height: ${MyPageSectionHeight};
  padding-top: 48px;
`;

const Label = styled.label`
  color: ${ConceptColor};
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

const SystemGuidance = styled.span`
  color: ${PlaceholderColor};
  font-size: 15px;
  font-weight: normal;
  line-height: 1.5;
`;

const UsageGuidance = styled.div`
  width: 270px;
  height: 28px;
  display: flex;
  justify-content: space-between;
`;

const Mark = styled.mark`
  all: unset;
  color: ${FontColor};
  font-size: 15px;
  line-height: 28px;
`;

const PointGuidance = styled.span`
  color: ${PlaceholderColor};
  font-size: 14px;
  line-height: 28px;
`;

const TotalLabel = styled(Label)`
  position: absolute;
  right: 0;
  font-size: 16px;
  color: ${FontColor};
`;

const BreakdownWrapper = styled.div`
  overflow-y: scroll;
  height: 290px;
  padding-top: 16px;
  margin-top: 16px;
  border-top: 1px solid ${BorderColor};

  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome
  }
`;

const Breakdown = styled.div`
  position: relative;
  height: 40px;
  margin-bottom: 24px;
`;

const Title = styled.span`
  font-size: 15px;
  color: ${FontColor};
`;

const CreatedAt = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 12px;
  color: ${PlaceholderColor};
`;

const Variance = styled.span`
  position: absolute;
  top: calc(50% - 7.5px);
  right: 0;
  height: 15px;
  font-size: 16px;
  font-weight: 500;
  color: ${PlaceholderColor};
`;

const PointSection = ({ breakdown, totalPoint }) => {
  const createdAtConverter = (createdAt) => {
    const splitedTime = createdAt.split(".")[0].split("T");
    let date = splitedTime[0].split("-");
    let time = splitedTime[1].split(":");
    date = `${date[1]}/${date[2]} `;
    time = `${time[0]}:${time[1]}`;
    return date + time;
  };

  const varianceConverter = (variance) => {
    if (!String(variance).includes("-")) {
      return `+ ${variance}P`;
    } else {
      return `- ${String(variance).slice(1)}P`;
    }
  };

  return (
    <Section>
      <Wrapper>
        <Label>포인트 시스템 안내</Label>
        <SystemGuidance>
          포인트 시스템은 강의평가 서비스와 강의자료 서비스에서 사용하는 가상 포인트를
          적립하고, 사용하는 시스템입니다.
          <br /> 포인트 획득을 위해 허위 / 중복 / 성의없는 정보를 작성할 경우, 허위
          신고하는 경우, 그 외 부적절한 방법으로 포인트 시스템을 남용하는 경우에 서비스
          이용이 영구 제한될 수 있습니다.
        </SystemGuidance>
      </Wrapper>
      <Wrapper>
        <Label>{"포인트 적립 & 사용"}</Label>
        {PointGuidanceArr.map(({ guidance, point }) => (
          <UsageGuidance key={guidance}>
            <Mark>{guidance}</Mark>
            <PointGuidance>{point}</PointGuidance>
          </UsageGuidance>
        ))}
      </Wrapper>
      <div style={{ position: "relative", marginBottom: "24px" }}>
        <Label>내 포인트 내역</Label>
        <TotalLabel>{`합계 : ${totalPoint}P`}</TotalLabel>
        <BreakdownWrapper>
          {breakdown.map(({ id, variance, title, created_at }) => (
            <Breakdown key={id}>
              <Title>{title}</Title>
              <CreatedAt>{createdAtConverter(created_at)}</CreatedAt>
              <Variance>{varianceConverter(variance)}</Variance>
            </Breakdown>
          ))}
        </BreakdownWrapper>
      </div>
    </Section>
  );
};

export default PointSection;
