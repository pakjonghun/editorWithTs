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
- 웹과 상호작용 하는 plugin(캐쉬, 자동 모듈 다운로드)
- iframe 과 editor 간 연동
  - html : srcdoc 이용
  - javascript : message 이벤트 이용
  - iframe 접근 : useRef 이용
- iframe 에 발생하는 오류의 경우
  - 번들링 오류 : 번들링에서 오류 잡아내서 아이프레임 내부에 표시가 아니라 별도 태그 만들어서 메세지를 비슷하게 스타일링 한다.
  - 비동기 오류 : 윈도우에 에러 이벤트를 달아서 해결
  - 동기 오류 : try catch 로 잡힌다. catch 에서 해결
- 리스너에 다비운싱 적용 : resizing(최적화를 위함)
- 시간차 적용
  - 번들링(useEffect 활용) : 최적화를 위함
  - 번들링과 랜더링간 시차 적용 : initial Html 로 초기화 후 번들링 하기 위함

## 문제해결

- 빠르게 리사이징 할때 ui 가 못따라 가는 문제 : 중간에 after 선택자 하나 넘어줘서 가운데 정렬 해주면 해결됨
- 크기 사이즈가 알아서 안줄어드는 iframe 문제 : height 나 width 를 100% 로 하면 부모 범위내에서 조절됨
- sibling 요소와 너비 높이 경쟁없이 남는 공간 100% 차지하는 방법 : flex-grow:1;
- 밀리세컨드 단위로 계속 일어나는 이벤트 최적화 : 디바운스 최적화(이벤트 리스너일 경우)
- 이벤트가 아닌데 밀리세컨드 단위로 계속 스테이트 변경이 일어나는 경우 : useEffect 활용 최적화
