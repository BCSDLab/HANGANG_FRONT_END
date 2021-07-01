import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { debounce } from "lodash";

import ResourceAPI from "api/resources";

import SearchForm from "components/Shared/SearchForm";
import FilterBox from "components/Shared/FilterBox";
import ResourceCard from "components/ResourceComponents/ResourceCard";
import ResourceCreateContainer from "containers/ResourcesContainers/ResourceCreateContainer";

import useInfiniteScroll from "hooks/useInfiniteScroll";
import { majorList } from "static/LecturesPage/majorList";
import {
  requestResources,
  resetResourceModuleState,
  setDepartmentOnResources,
  setNextPageResources,
  setResources,
} from "store/modules/resourcesModule";
import ResourceFilterList from "static/ResourcesPage/ResourceFilterList.json";

import {
  CardGrid,
  FilterButton,
  FilterImage,
  FilterSection,
  ResourcesSection,
  ResourceWriteButton,
  SearchResultLabel,
  SearchSection,
  Wrapper,
} from "./styles/ResourceContainer.style";
import { showAlertModal } from "store/modules/modalModule";
import ALERT_MESSAGE_ON_ERROR_TYPE from "static/Shared/ALERT_MESSAGE_ON_ERROR_TYPE";

const ResourceContainer = () => {
  const dispatch = useDispatch();
  const resourceReducerState = useSelector((state) => state.resourceReducer);

  const {
    isLoading,
    resources,
    resource_amount,
    page,
    max_page,
    ...filterOptions
  } = resourceReducerState;

  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(false);
  const { isCheckedToken, isLoggedIn } = useSelector((state) => state.authReducer);
  /**
   * A Function to check user authentication.
   * If user didnt logged in, show alert.
   * else, open create form and request create form id.
   */
  const [isCreateFormOpened, setIsCreateFormOpened] = useState(false);
  const checkUserHasCreateAuthentication = () => {
    if (!isLoggedIn) {
      dispatch(
        showAlertModal({
          content: "강의 자료 작성을 위해서 로그인이 필요합니다.",
        })
      );
      return;
    } else setIsCreateFormOpened(true);
  };

  useEffect(() => {
    return () => {
      dispatch(resetResourceModuleState());
    };
  }, []);

  useEffect(() => {
    if (isCheckedToken && isLoading) {
      fetchResources({ page, ...filterOptions }, isLoggedIn, dispatch);
    }
  }, [filterOptions]);

  /**
   * 강의자료 페이지에서 제일 마지막 요소에 도달할 경우
   * 다음 페이지에 item 들을 요청한다.
   * 만약 현재 페이지가 max_page일 경우 요청하지 않는다.
   * @param {object} entries IntersectionObserverEntry를 받는다. 하단 링크를 참조한다.
   * https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry
   */
  const fetchMore = debounce((entries) => {
    const target = entries[0];
    if (target.isIntersecting && page <= max_page) {
      fetchNextPageResources({ page, ...filterOptions }, isLoggedIn, dispatch);
    }
  }, 500);
  const { targetRef } = useInfiniteScroll(fetchMore, 2);

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

const fetchResources = async (options, isLoggedIn, dispatch) => {
  try {
    const { data } = await ResourceAPI.getResources(options, isLoggedIn);
    dispatch(setResources(data));
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
    dispatch(showAlertModal({ title, content }));
    throw new Error(error);
  }
};

const fetchNextPageResources = async (options, isLoggedIn, dispatch) => {
  try {
    const { data } = await ResourceAPI.getResources(options, isLoggedIn);
    dispatch(setNextPageResources(data));
  } catch (error) {
    const { title, content } = ALERT_MESSAGE_ON_ERROR_TYPE["NOT_DEFINED_ERROR"];
    dispatch(showAlertModal({ title, content }));
    throw new Error(error);
  }
};

export default ResourceContainer;
