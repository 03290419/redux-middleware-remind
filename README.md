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
