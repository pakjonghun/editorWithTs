## 에디터 페이지

## 적용툴

- redux : redux, redux-tool-kit, redux-saga, redux-readt,
- react
- bundle : esbuild-warm
- caching : localforage
- core structure
  - iframe <-> message event <-> textarea
  - bundle and build

## 진행

- redux 세팅
- 웹과 상호작용 하는 plugin 제작중(캐슁, 자동 모듈 저장 다운로드 등)
- iframe 과 textarea 간 연동
  (민감한 정보는 message 이벤트, iframe 초기화, 메세지 이벤트 설정은 useRef 이용)

## 문제해결

- 빠르게 리사이징 할때 ui 가 못따라 가는 문제 : 중간에 after 선택자 하나 넘어줘서 가운데 정렬 해주면 해결됨
- 크기 사이즈가 알아서 안줄어드는 iframe 문제 : height 나 width 를 100% 로 하면 부모 범위내에서 조절됨
- sibling 요소와 너비 높이 경쟁없이 남는 공간 100% 차지하는 방법 : flex-grow:1;
