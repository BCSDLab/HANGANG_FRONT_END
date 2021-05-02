# HANGANG_WEB

✏️ 한강(Hangang) - 한기대 강의평가 프론트엔드 저장소입니다.

## Project Guideline

[한강 프로젝트 FE 가이드라인](https://docs.google.com/document/d/1_-EnZk-9KotVCJ6cLr9_Ixjoyu4I-NGRdCHYofLaEPI/edit)

## Patch Notes

- 0.0.1 (3/21/2021) : 한강 프론트엔드 프로젝트 repository 생성 및 초기 설정
- 0.0.2 (3/29/2021) : 로그인 페이지 구현
- 0.0.3 (4/2/2021) : 메인 페이지 구현
- 0.0.4 (4/5/2021) : 마이 페이지 구현
- 0.0.5 (4/12/2021) : 강의평 페이지 구현

## TODOS

- [ ] TODO: README TODOS 다 지우고 가이드라인 S3에 올리고 내부링크 생성
- [ ] 백엔드 정렬 order 에 넣는거면 값이 지금 안들어감 + 이름 sort로 통일 가능할까요...
- [ ] 현재 lectures/ resources 가져올 경우 limit 1000으로 모든 데이터를 요청하는데, 이를 limit 제한 걸고 무한 스크롤 형태로 매번 요청하는게 나은지, 아니면 처음에 한번 요청하는게 나은지 판단하기
- [ ] 전공 버튼 다시 눌렀을 시 초기화
- [ ] 강의자료 페이지 첫 렌더링 이후 네비게이션 이동했다 오면 렌더링 안되는 문제 발생
- [ ] console.log(err) => new Error("~~~")로 바꾸기

## ResourceSection TODO

- [ ] 좋아요 연동 => 좋아요시 따봉 파란색
- [ ] 새로 고침 시 유저가 좋아요한 내역 받아와야 함 (Promise.all...)
- [ ] 자료 썸네일 받아오기
