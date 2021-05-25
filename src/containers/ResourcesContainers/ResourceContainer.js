import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { debounce } from "lodash";

import ResourceAPI from "api/resources";

import SearchForm from "components/Shared/SearchForm";
import FilterBox from "components/Shared/FilterBox";
import ResourceCard from "components/ResourceComponents/ResourceCard";
import LoadingSpinner from "components/Shared/LoadingSpinner";
import ResourceCreateContainer from "containers/ResourcesContainers/ResourceCreateContainer";

import useInfiniteScroll from "hooks/useInfiniteScroll";
import { majorList } from "static/LecturesPage/majorList";
import {
  requestResources,
  requestResourcesFinished,
  setDepartmentOnResources,
  setResources,
  setResourcesNextPage,
} from "store/modules/resourcesModule";
import ResourceFilterList from "static/ResourcesPage/ResourceFilterList.json";

import { getValueOnLocalStorage } from "utils/localStorageUtils";
import {
  CardGrid,
  FilterButton,
  FilterImage,
  FilterSection,
  ResourcesSection,
  ResourceWriteButton,
  SearchResultLabel,
  SearchSection,
  SpinnerWrapper,
  Wrapper,
} from "./styles/ResourceContainer.style";

const ResourceContainer = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    isFetchedOnFirstResourcesMount,
    resources,
    resource_amount,
    page,
    max_page,
    ...filterOptions
  } = useSelector((state) => state.resourceReducer);

  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);
  const { isLoggedIn, isCheckedToken } = useSelector((state) => state.authReducer);
  /**
   * A Function to check user authentication.
   * If user didnt logged in, show alert.
   * else, open create form and request create form id.
   */
  const [isCreateFormOpened, setIsCreateFormOpened] = useState(false);
  const checkUserHasCreateAuthentication = () => {
    if (!isLoggedIn) return alert("강의 자료 작성을 위해서 로그인이 필요합니다.");
    else setIsCreateFormOpened(true);
  };

  /**
   * 특정한 상황에서 resources를 fetch 합니다.
   * 1. 유저 token 체크가 끝나 로그인 여부가 파악되고, 아직 resource를 fetch 하지 않았을 때
   * 2. 필터를 클릭할 때마다 isLoading을 true로 만들며, 이 때 fetchResources를 실행한다.
   */

  const fetchResources = async (options) => {
    try {
      let accessToken = isLoggedIn
        ? getValueOnLocalStorage("hangangToken").access_token
        : null;

      const { data } = await ResourceAPI.getResources(options, accessToken);
      dispatch(setResources(data));
    } catch (error) {
      throw new Error(error);
    } finally {
      dispatch(requestResourcesFinished());
    }
  };

  useEffect(() => {
    if ((isCheckedToken && !isFetchedOnFirstResourcesMount) || isLoading)
      fetchResources({ page, ...filterOptions });
  }, [isCheckedToken, isFetchedOnFirstResourcesMount, isLoading]);

  /**
   * 강의자료 페이지에서 제일 마지막 요소에 도달할 경우
   * 다음 페이지에 item 들을 요청한다.
   * 만약 현재 페이지가 max_page일 경우 요청하지 않는다.
   * @param {object} entries IntersectionObserverEntry를 받는다. 하단 링크를 참조한다.
   * https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry
   */
  const fetchMore = debounce((entries) => {
    const target = entries[0];
    if (target.isIntersecting && page < max_page) {
      fetchResources({ page: page + 1, ...filterOptions });
      dispatch(setResourcesNextPage());
    }
  }, 500);

  const { targetRef } = useInfiniteScroll(fetchMore);

  return (
    <Wrapper>
      {!isFetchedOnFirstResourcesMount && (
        <SpinnerWrapper>
          <LoadingSpinner />
        </SpinnerWrapper>
      )}

      {isFetchedOnFirstResourcesMount && (
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
                  dispatch(setDepartmentOnResources({ department }));
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
            <CardGrid ref={targetRef}>
              {resources.map((data) => (
                <ResourceCard data={data} key={data.id} />
              ))}
            </CardGrid>
          </ResourcesSection>

          <ResourceCreateContainer
            isCreateFormOpened={isCreateFormOpened}
            setIsCreateFormOpened={setIsCreateFormOpened}
          />
        </>
      )}
    </Wrapper>
  );
};

export default ResourceContainer;
