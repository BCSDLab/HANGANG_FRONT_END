/**
 * 해당 강의가 무슨 요일 몇시에 시작하는지 반환합니다.
 * 예를 들어, 01은 001로 변환되고,
 * 첫 자리 수 0은 월요일이며 01은 9시를 의미합니다.
 */
export const getStartPosition = (elem) => {
  const convertedElem = elem.toString().padStart(3, "0");
  const day = parseInt(convertedElem[0]);
  const hour = parseInt(convertedElem.slice(1));

  return { day, hour };
};
