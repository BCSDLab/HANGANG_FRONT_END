import React from "react";
import Thumbnail from "components/IndexComponents/Thumbnail";
import {
  Content,
  Label,
  NoResource,
  LeftSide,
  LeftTopSide,
  LeftBottomSide,
  RightSide,
} from "./styles/RecommendResourceContainer.style";

/**
 * RecommendResourceContainer
 * 추천 강의자료 컨테이너입니다.
 * recommendResources의 크기에 따라 없으면 안내 문구, 있으면 추천 강의자료를 보여줍니다.
 */
const RecommendResourceContainer = ({ recommendResources }) => (
  <>
    <Label>{RECOMMEND_RESOURCE_LABEL}</Label>
    <Content isData={recommendResources.length !== 0}>
      {recommendResources.length === 0 && (
        <NoResource>{NO_RECOMMEND_RESOURCE_ALERT}</NoResource>
      )}
      {recommendResources.length !== 0 && (
        <>
          <LeftSide>
            <LeftTopSide>
              <Thumbnail index={0} recommendResources={recommendResources} />
              <Thumbnail index={1} recommendResources={recommendResources} />
            </LeftTopSide>
            <LeftBottomSide>
              <Thumbnail index={2} recommendResources={recommendResources} />
              <Thumbnail index={3} recommendResources={recommendResources} />
            </LeftBottomSide>
          </LeftSide>
          <RightSide>
            <Thumbnail index={4} recommendResources={recommendResources} />
          </RightSide>
        </>
      )}
    </Content>
  </>
);

const RECOMMEND_RESOURCE_LABEL = "추천 강의자료";
const NO_RECOMMEND_RESOURCE_ALERT =
  "시간표를 작성하지 않았거나 업로드된 강의자료가 없습니다.";

export default RecommendResourceContainer;
