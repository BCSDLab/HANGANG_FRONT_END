import React from "react";

import Thumbnail from "components/IndexComponents/Thumbnail";
import FetchingBox from "components/Shared/FetchingBox";
import {
  Content,
  Label,
  NoResource,
  LeftSide,
  LeftTopSide,
  LeftBottomSide,
  RightSide,
} from "./styles/RecommendResourceContainer.style";
import { useSelector } from "react-redux";

/**
 * RecommendResourceContainer
 * 추천 강의자료 컨테이너입니다.
 * recommendResources의 크기에 따라 없으면 안내 문구, 있으면 추천 강의자료를 보여줍니다.
 */
const RecommendResourceContainer = () => {
  const { recommendResources, isFetchFinished } = useSelector(
    (state) => state.mainPageReducer
  );

  return (
    <>
      <Label>{RECOMMEND_RESOURCE_LABEL}</Label>
      <Content isData={recommendResources.length !== 0}>
        {!isFetchFinished && <FetchingBox height={183} />}

        {isFetchFinished && recommendResources.length !== 0 && (
          <>
            <LeftSide>
              <LeftTopSide>
                <Thumbnail index={0} />
                <Thumbnail index={1} />
              </LeftTopSide>
              <LeftBottomSide>
                <Thumbnail index={2} />
                <Thumbnail index={3} />
              </LeftBottomSide>
            </LeftSide>
            <RightSide>
              <Thumbnail index={4} />
            </RightSide>
          </>
        )}

        {isFetchFinished && recommendResources.length === 0 && (
          <NoResource>{NO_RECOMMEND_RESOURCE_ALERT}</NoResource>
        )}
      </Content>
    </>
  );
};

const RECOMMEND_RESOURCE_LABEL = "추천 강의자료";
const NO_RECOMMEND_RESOURCE_ALERT =
  "시간표를 작성하지 않았거나 업로드된 강의자료가 없습니다.";

export default RecommendResourceContainer;
