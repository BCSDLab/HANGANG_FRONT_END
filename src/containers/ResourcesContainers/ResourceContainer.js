import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import ResourceAPI from "api/resources";

import SearchForm from "components/Shared/SearchForm";
import FilterBox from "components/Shared/FilterBox";
import ResourceCard from "components/ResourceComponents/ResourceCard";
import LoadingSpinner from "components/Shared/LoadingSpinner";
import ResourceCreateContainer from "containers/ResourcesContainers/ResourceCreateContainer";

import { majorList } from "static/LecturesPage/majorList";
import {
  requestResources,
  requestFinished,
  setDepartment,
  setResources,
} from "store/modules/resources";
import ResourceFilterList from "static/ResourcesPage/ResourceFilterList.json";
import {
  BorderColor,
  ConceptColor,
  FontColor,
  InnerContentWidth,
  PlaceholderColor,
} from "static/Shared/commonStyles";
import { getValueOnLocalStorage } from "utils/localStorageUtils";

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: ${InnerContentWidth};
  height: 833px;
  margin: 90px auto 98px auto;
`;

const SearchSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FilterButton = styled.button`
  all: unset;
  width: 70px;
  height: 32px;
  border-radius: 16px;
  color: ${({ isChosen }) => (isChosen ? `#fcfcfe` : `${FontColor}`)};
  background-color: ${({ isChosen }) =>
    isChosen ? `${ConceptColor}` : `${BorderColor}`};
  font-size: 15px;
  cursor: pointer;
  text-align: center;
`;

const FilterSection = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  height: 32px;

  margin-top: 48px;

  ${FilterButton}:not(:last-child) {
    margin-right: 16px;
  }
`;

const FilterImage = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/lecturespage/filter.png",
  alt: "filter",
})`
  position: absolute;
  right: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ResourcesSection = styled.section`
  position: relative;
  width: 100%;
  height: 1000px;
  padding: 24px 0px 98px 0px;
`;

const SearchResultLabel = styled.label`
  display: block;
  margin-bottom: 24px;

  color: ${FontColor};
  font-size: 20px;
  font-weight: 500;
`;

const ResourceWriteButton = styled.input.attrs({
  type: "button",
  value: "강의자료 작성 >",
})`
  all: unset;
  position: absolute;
  top: calc(0% + 21px);
  right: 0;
  width: 101px;
  height: 28px;
  border-radius: 18.5px;
  border: solid 1px ${ConceptColor};

  font-size: 14px;
  /* text-align: center; */
  padding-left: 16px;
  color: ${PlaceholderColor};
  cursor: pointer;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 133px);
  grid-gap: 30px 18px;

  width: 1135px;
  height: 622px;

  overflow-y: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome
  }
`;

const ResourceContainer = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.authReducer);
  const { isLoading, resources, resource_amount, ...filterOptions } = useSelector(
    (state) => state.resourceReducer
  );
  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const [isCreateFormOpened, setIsCreateFormOpened] = useState(false);

  /**
   * A Function to check user authentication.
   * If user didnt logged in, show alert.
   * else, open create form and request create form id.
   */
  const checkUserHasCreateAuthentication = () => {
    if (!isLoggedIn) return alert("강의 자료 작성을 위해서 로그인이 필요합니다.");
    else setIsCreateFormOpened(true); //  Open create form
  };

  /**
   * 첫 페이지 로드 시 fetch를 위해 !isFetched 일 시 api call을 한다.
   * 이후 필터 버튼 클릭으로 isLoading이 true가 된다면 다시 api call을 한다.
   */
  useEffect(async () => {
    if (!isFetched || isLoading) {
      try {
        let accessToken = isLoggedIn
          ? getValueOnLocalStorage("hangangToken").access_token
          : null;

        const { data } = await ResourceAPI.getResources(filterOptions, accessToken);
        dispatch(setResources(data));
      } catch (error) {
        throw new Error(error);
      } finally {
        dispatch(requestFinished());
        if (!isFetched) setIsFetched(true);
      }
    }
  }, [isFetched, isLoading, isLoggedIn]);

  /**
   * FIXME: 고쳐... 언젠가... 생각나면...
   * case : 유저가 로그인 한 상태로 새로고침을 하게 되면
   * isLoggedIn이 true로 변하기 전에 getResources 를 요청하게 됨
   * 임시로 isLoggedIn이 변하면 재요청 하도록 추가했지만... 두번 페이지가 깜빡이게 됨
   * 추후에 수정해야함
   */
  useEffect(() => {
    if (isLoggedIn) setIsFetched(false);
  }, [isLoggedIn]);

  return (
    <Wrapper>
      {!isFetched && (
        <SpinnerWrapper>
          <LoadingSpinner />
        </SpinnerWrapper>
      )}

      {isFetched && (
        <>
          <SearchSection>
            <SearchForm type="resources" />
          </SearchSection>

          <FilterSection>
            {majorList.map(({ label, department }) => (
              <FilterButton
                key={label}
                name="department"
                onClick={() => {
                  dispatch(setDepartment({ department }));
                  dispatch(requestResources());
                }}
                isChosen={filterOptions.department === department}
              >
                {label}
              </FilterButton>
            ))}
            <FilterImage onClick={() => setIsFilterBoxVisible((prev) => !prev)} />
            {isFilterBoxVisible && (
              <FilterBox
                type="resources"
                filterList={ResourceFilterList}
                setIsFilterBoxVisible={setIsFilterBoxVisible}
              />
            )}
          </FilterSection>

          <ResourcesSection>
            <SearchResultLabel>{`탐색 결과 (${resource_amount})`}</SearchResultLabel>
            <ResourceWriteButton onClick={() => checkUserHasCreateAuthentication()} />
            <CardGrid>
              {resources.map((data) => (
                <ResourceCard data={data} key={data.id} />
              ))}
            </CardGrid>
          </ResourcesSection>

          <ResourceCreateContainer
            isCreateFormOpened={isCreateFormOpened}
            setIsFetched={setIsFetched}
            setIsCreateFormOpened={setIsCreateFormOpened}
          />
        </>
      )}
    </Wrapper>
  );
};

export default ResourceContainer;
