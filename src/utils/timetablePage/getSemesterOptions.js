const DEFAULT_START_YEAR = 2021;
const DEFAULT_START_VALUE = 5;

/**
 * 현재 시간으로부터 startYear 까지 설정 가능한 학기 데이터를 반환합니다.
 * @param {number} startYear 시작일을 설정할 수 있습니다. 기본 설정값은 2021년입니다.
 * @param {number} startValue 시작값을 설정할 수 있습니다. 기본 설정값은 5입니다.
 */
export const getSemesterOptions = (
  startYear = DEFAULT_START_YEAR,
  startValue = DEFAULT_START_VALUE
) => {
  let semesterData = [];
  let value = startValue;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  for (let i = 0; i < currentYear - startYear; i++) {
    semesterData.push({ year: `${startYear + i}`, label: "1학기", value: value++ });
    semesterData.push({ year: `${startYear + i}`, label: "2학기", value: value++ });
  }

  if (currentMonth >= 3)
    semesterData.push({ year: `${currentYear}`, label: "1학기", value: value++ });
  if (currentMonth >= 6)
    semesterData.push({ year: `${currentYear}`, label: "여름학기", value: value++ });
  if (currentMonth >= 9)
    semesterData.push({ year: `${currentYear}`, label: "2학기", value: value++ });
  if (currentMonth >= 12)
    semesterData.push({ year: `${currentYear}`, label: "겨울학기", value: value++ });

  return semesterData;
};
