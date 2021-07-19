import { distributeClassTime } from "./distributeClassTime";

/**
 * [101, 102, 103, 104] 처럼 넘어오는 classTime을
 * 화 1B~3A 와 같은 이름으로 변경합니다.
 */
export const getTimetableClassName = (classTime) => {
  const distributedClassTime = distributeClassTime(JSON.parse(classTime));

  let classNames = distributedClassTime.reduce((acc, time) => {
    let startTime = time[0].toString().padStart(3, "0");
    let endTime = time[time.length - 1].toString().padStart(3, "0");

    const day = getDay(startTime[0]);
    const startName = getTime(startTime.slice(1));
    const endName = getTime(endTime.slice(1));

    acc.push(`${day} ${startName}~${endName}`);
    return acc;
  }, []);

  return classNames.join(", ");
};

const getDay = (dayStringData) => {
  const dayList = {
    0: "월",
    1: "화",
    2: "수",
    3: "목",
    4: "금",
  };
  return dayList[dayStringData];
};

const getTime = (timeStringData) => {
  const convertedTime = parseInt(timeStringData);
  const time = Math.floor(convertedTime / 2) + 1;
  const alphabet = convertedTime % 2 === 0 ? "A" : "B";
  return `${time}${alphabet}`;
};
