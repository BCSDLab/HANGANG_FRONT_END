/**
 * 백엔드에서 넘겨주는 classTime을 연속된 시간으로 나눕니다.
 * 예를 들어, [10, 11, 12, 13, 204, 205, 206, 207]는 [10, 11, 12, 13], [204, 205, 206, 207] 로 나눕니다.
 */
export const distributeClassTime = (target) => {
  let startIdx = 0;

  let distributedLectureList = target.reduce((acc, curr, idx) => {
    if (idx === target.length - 1 || curr !== target[idx + 1] - 1) {
      let slicedLecture = target.slice(startIdx, idx + 1);
      acc.push(slicedLecture);
      startIdx = idx + 1;
    }
    return acc;
  }, []);

  return distributedLectureList;
};
