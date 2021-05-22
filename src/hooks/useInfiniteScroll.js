import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * fetchMore :
 * - 마지막 요소에 스크롤이 다다를 경우 요청하는 콜백 함수입니다.
 * - 매개변수로 entries를 가지며 intersecting value 값이 true일 경우 함수를 실행할 수 있습니다.
 * observerParams :
 * - IntersectionObserver API에 넣어주기 위한 parameter 값입니다.
 * - https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#creating_an_intersection_observer
 */
useInfiniteScroll.propTypes = {
  fetchMore: PropTypes.func.isRequired,
  observerParams: PropTypes.shape({
    root: PropTypes.object,
    rootMargin: PropTypes.string,
    threshold: PropTypes.number,
  }),
};

export default function useInfiniteScroll(fetchMore, observerParams) {
  const params = {
    ...defaultObserverParams,
    ...observerParams,
  };

  const targetRef = useRef();

  useEffect(() => {
    if (!targetRef.current) return;

    let itemWrapper = targetRef.current.children;
    let lastItem = itemWrapper[itemWrapper.length - 1];

    let observer = new IntersectionObserver(fetchMore, params);
    observer.observe(lastItem);

    return () => {
      observer.unobserve(lastItem);
    };
  });

  return { targetRef };
}

const defaultObserverParams = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};
