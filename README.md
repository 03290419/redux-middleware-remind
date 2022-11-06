# Redux Middleware

리덕스 미들웨어는 액션을 디스패치 했을 때, 리듀서에서 이를 처리하기에 앞서 사전에 지정된 작업들을 실행한다.
미들웨어는 액션과 리듀서 사이의 중간자라고 볼 수 있다.

`action` -> `middleware` -> `red ucer` -> `store`

리듀서가 액션을 처리하기 전에 미들웨어가 할 수 있는 작업

- 전달받은 액션을 콘솔에 기록한다.
- 전달받은 액션 정보를 기반으로 액션을 아예 취소한다.
- 다른 종류의 액션을 추가로 디스패치한다.
- 조건에 따라 액션 정보를 가로채서 변경한 후 리듀서에게 전달해준다.
- 특정 액션에 기반하여 새로운 액션을 여러 번 디스패치할 수 있다.

```js
const loggerMiddleware = (store) => (next) => (action) => {
  import loggerMiddleware from "./loggerMiddleware";
  //미들웨어 기본 구조
};

const loggerMiddleware = function loggerMiddleware(store) {
  return function (next) {
    return function (action) {};
  };
};
```

미들웨어는 결국 함수를 반환하는 함수를 반환하는 함수이다. store는 리덕스 스토어 인스턴스를, action은 디스패치된 액션을 가리킨다.
next를 호출하면 그다음 처리해야 할 미들웨어에게 액션을 넘겨주고, 만약 그다음 미들웨어가 없다면 리듀서에게 액션을 넘겨준다.
미들웨어에서 next를 사용하지 않으면 액션이 리듀서에게 전달되지 않는다.

## Redux-thunk

리덕스를 사용하는 프로젝트에서 비동기 작업을 처리할 때 가장 기본적으로 사용하는 미들웨어.
Thunk란 특정 작업을 나중에 할 수 있도록 미루기 위해 함수 형태로 감싼 것을 의미한다.
redux-thunk 라이브러리를 사용하면 thunk 함수를 만들어서 디스패치할 수 있다. 그러면 리덕스 미들웨어가 그 함수를 전달받아, store의 dispatch 와 getState를 파라미터로 넣어서 호출해준다.

```js
const sampleThunk = () => (dispatch, getState) => {
  //현재 상태를 참조할 수 있고,
  //새 액션을 디스패치할 수도 있다.
};
```

redux-thunk는 액션 생성 함수에서 일반 액션 객체를 반환하는 대신에 함수를 반환한다.

## Redux-saga

redux-saga는 다음과 같은 상황에서 유용하다.

- 기존 요청을 취소 처리해야 할 때(불필요한 중복 요청 방지)
- 특정 액션이 발생헀을 때, 다른 액션을 발생시키거나, API요청 등 리덕스와 관계없는 코드를 실행할 때
- 웹소켓을 사용할 때
- API 요청 실패 시 다시 요청해야 할때
  redux-saga 는 generator 함수 문법을 사용한다.
  이 문법의 핵심 기능은 함수를 작성할 때 함수를 특정 구간에 멈춰 놓을 수도 있고, 원할 때 다시 돌아가게 할 수도 있다는 것이다.

redux-saga 는 제너레이터 함수 문법을 기반으로 비동기 작업을 관리해 준다. 디스패치하는 액션을 모니터링해서 그에 따라 필요한 작업을 따로 수행할 수 있는 미들웨어다.

```js
function* watchGenerator() {
  console.log("모니터링 중....");
  let prevAction = null;
  while (true) {
    const action = yield;
    console.log("이전 액션", prevAction);
    prevAction = action;
    if (action.type === "HELLO") {
      console.log("안녕하세요");
    }
  }
}
const watch = watchGenerator();
```

redux-saga 는 위 함수와 비슷한 원리로 작동한다.

- all 함수 : 여러 사가를 합쳐주는 역할을 한다.
- call 함수: Promise를 반환하는 함수를 호출하고, 기다릴 수 있다. 첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수이다.
- takeEvery 함수 : 들어오는 모든 액션에 대해 특정 작업을 처리해준다.
- takeLatest 함수 : 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행한다.
- put 함수 : 파라미터로 action을 받아 오면 액션의 정보를 조회할 수 있다.
