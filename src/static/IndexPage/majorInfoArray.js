const srcConverter = (src) => {
  return `https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/major/${src}.png`;
};

const MajorInfoArray = [
  { src: "culture", label: "교양학부" },
  { src: "hrd", label: "HRD학과" },
  { src: "machine", label: "기계공학부" },
  { src: "design", label: "디자인 건축 공학부" },
  { src: "mecha", label: "메카트로닉스 공학부" },
  { src: "industrial", label: "산업경영학부" },
  { src: "energe", label: "에너지신소재 화학 공학부" },
  { src: "electrocity", label: "전기전자통신공학부" },
  { src: "computer", label: "컴퓨터공학부" },
  { src: "fusion", label: "융합학과" },
];

export default MajorInfoArray.map(({ src, label }) => ({
  src: srcConverter(src),
  label,
}));
