import { DEFAULT_START_VALUE, DEFAULT_START_YEAR } from "static/Shared/DEFAULT_CONSTANTS";

/**
 * 현재 시간으로부터 startYear 까지 설정 가능한 학기 데이터를 반환합니다.
 * 각각 2, 5, 8, 11월 부터 새로운 학기에 시간표를 생성할 수 있습니다.
 * 그러나 시간표 페이지 접근 시 보이는 Default 학기는 getCurrentSemesterValue에 의해 결정됩니다.
 *
 * @param {number} startYear 시작일을 설정할 수 있습니다. 기본 설정값은 2021년입니다.
 * @param {number} startValue 시작값을 설정할 수 있습니다. 기본 설정값은 5입니다.
 */
export const getSemesterOptions = (
  startYear = DEFAULT_START_YEAR,
  startValue = DEFAULT_START_VALUE
) => {
  let semesterData = [];
  let value = startValue;

  for (let i = 0; i < currentYear - startYear; i++) {
    value += 4;
  }

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  if (currentMonth >= 2)
    semesterData.push({ year: `${currentYear}`, label: "1학기", value: ++value });
  if (currentMonth >= 5)
    semesterData.push({ year: `${currentYear}`, label: "여름학기", value: ++value });
  if (currentMonth >= 8)
    semesterData.push({ year: `${currentYear}`, label: "2학기", value: ++value });
  if (currentMonth >= 11)
    semesterData.push({ year: `${currentYear}`, label: "겨울학기", value: ++value });

  return semesterData;
};
