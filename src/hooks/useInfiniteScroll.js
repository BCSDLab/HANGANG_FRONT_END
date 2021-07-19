import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * fetchMore :
 * - 마지막 요소에 스크롤이 다다를 경우 요청하는 콜백 함수입니다.
 * - 매개변수로 entries를 가지며 intersecting value 값이 true일 경우 함수를 실행할 수 있습니다.
 * offsetFromLastElement:
 * - 현 프로젝트에서 targetRef는 불러올 리스트에 넣어주고 있습니다.
 * - offsetFromLastElement는 리스트 중 끝에서 몇번째 요소를 intersect 대상으로 지정할 것인지 나타내는 값입니다.
 * - 지정한 offsetFromLastElement 보다 배열의 길이가 작으면 observe 하지 않고 return 합니다.
 * - default 값은 5입니다.
 * observerParams :
 * - IntersectionObserver API에 넣어주기 위한 parameter 값입니다.
 * - https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#creating_an_intersection_observer
 */
useInfiniteScroll.propTypes = {
  fetchMore: PropTypes.func.isRequired,
  offsetFromLastElement: PropTypes.number,
  observerParams: PropTypes.shape({
    root: PropTypes.object,
    rootMargin: PropTypes.string,
    threshold: PropTypes.number,
  }),
};

export default function useInfiniteScroll(
  fetchMore,
  offsetFromLastElement = 5,
  observerParams
) {
  const params = {
    ...defaultObserverParams,
    ...observerParams,
  };
  const targetRef = useRef();

  useEffect(() => {
    if (!targetRef.current) return;

    let listOnTarget = targetRef.current.children;
    if (listOnTarget.length < offsetFromLastElement) return targetRef;

    let boundaryDOM = listOnTarget[listOnTarget.length - offsetFromLastElement];
    let observer = new IntersectionObserver(fetchMore, params);
    observer.observe(boundaryDOM);

    return () => {
      if (targetRef.current) observer.unobserve(boundaryDOM);
    };
  });

  return { targetRef };
}

const defaultObserverParams = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};
