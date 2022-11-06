function* generatorFunction() {
  console.log("안녕하세요");
  yield 1;
  console.log("제너레이터 함수");
  yield 2;
  console.log("function*");
  yield 3;
  return 4;
}
const generator = generatorFunction();
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());

function* sumGenerator() {
  console.log(`sumGenerator가 만들어졌습니다.`);
  let a = yield;
  let b = yield;
  yield a + b;
}

const sum = sumGenerator();
console.log(sum.next());
console.log(sum.next(1));
console.log(sum.next(2));
console.log(sum.next());
console.log(sum.next());
/**
 * 제너레이터가 처음 만들어지면 함수의 흐름은 멈춰있는 상태이다. next()가 호출되면 다음 yield 가 있는 곳까지 호출하고 다시 함수가 멈춘다.
 * 제너레이터 함수를 사용하면 도중에 멈출 수도 있고, 순차적으로 여러 값을 반환시킬 수도 있다.
 * next 함수에 파라미터를 넣으면 제너레이터 함수에서 yield를 사용하여 해당 값을 조회할 수도 있다.
 */

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

console.log(watch.next());
console.log(watch.next({ type: "TEST" }));
console.log(watch.next({ type: "HELLO" }));
console.log(watch.next({ type: "null" }));
