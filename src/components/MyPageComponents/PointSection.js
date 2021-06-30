import React from "react";
import { useSelector } from "react-redux";

import {
  Section,
  Wrapper,
  Label,
  SystemGuidance,
  UsageGuidance,
  Mark,
  PointGuidance,
  PointBreakdownSection,
  TotalLabel,
  BreakdownWrapper,
  Breakdown,
  Title,
  CreatedAt,
  Variance,
} from "components/MyPageComponents/styles/PointSection.style";
import { PointGuidanceArr } from "static/MyPage/PointGuidance";

const PointSection = () => {
  const { pointRecords, infos } = useSelector((state) => state.myPageReducer);

  return (
    <Section>
      <Wrapper>
        <Label>{POINT_SYSTEM_LABEL}</Label>
        <SystemGuidance>{POINT_SYSTEM_GUIDE}</SystemGuidance>
      </Wrapper>
      <Wrapper>
        <Label>{POINT_USAGE_LABEL}</Label>
        {PointGuidanceArr.map(({ guidance, point }) => (
          <UsageGuidance key={guidance}>
            <Mark>{guidance}</Mark>
            <PointGuidance>{point}</PointGuidance>
          </UsageGuidance>
        ))}
      </Wrapper>
      <PointBreakdownSection>
        <Label>{POINT_BREAKDOWN_LABEL}</Label>
        <TotalLabel>{getTotalPointLabel(infos.point)}</TotalLabel>
        <BreakdownWrapper>
          {pointRecords
            .sort((prev, next) => next.id - prev.id)
            .map(({ id, variance, title, created_at }) => (
              <Breakdown key={id}>
                <Title>{title}</Title>
                <CreatedAt>{createdAtConverter(created_at)}</CreatedAt>
                <Variance>{varianceConverter(variance)}</Variance>
              </Breakdown>
            ))}
        </BreakdownWrapper>
      </PointBreakdownSection>
    </Section>
  );
};

/**
 * DB에 저장되있는 time을 기획에 맞게 보여줍니다.
 * @param {string} createdAt
 */
const createdAtConverter = (createdAt) => {
  const splitedTime = createdAt.split(".")[0].split("T");
  let date = splitedTime[0].split("-");
  let time = splitedTime[1].split(":");
  date = `${date[1]}/${date[2]} `;
  time = `${time[0]}:${time[1]}`;
  return date + time;
};

/**
 * - 를 포함하지 않는다면 + 를 붙여주고,
 * 아니라면 - 를 붙여줍니다.
 * @param {number} variance
 */
const varianceConverter = (variance) => {
  if (!String(variance).includes("-")) {
    return `+ ${variance}P`;
  } else {
    return `- ${String(variance).slice(1)}P`;
  }
};

const getTotalPointLabel = (point) => `합계 : ${point}P`;

const POINT_SYSTEM_LABEL = "포인트 시스템 안내";
const POINT_SYSTEM_GUIDE =
  "포인트 시스템은 강의평가 서비스와 강의자료 서비스에서 사용하는 가상 포인트를 적립하고, 사용하는 시스템입니다.\n포인트 획득을 위해 허위 / 중복 / 성의없는 정보를 작성할 경우, 허위 신고하는 경우, 그 외 부적절한 방법으로 포인트 시스템을 남용하는 경우에 서비스 이용이 영구 제한될 수 있습니다.";
const POINT_USAGE_LABEL = "포인트 적립 & 사용";
const POINT_BREAKDOWN_LABEL = "내 포인트 내역";

export default PointSection;
