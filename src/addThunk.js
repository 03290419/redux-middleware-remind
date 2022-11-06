const addOne = (x) => x + 1;
function addOneThunk(x) {
  const thunk = () => addOne(x);
  return thunk;
}

const fn = addOneThunk(1);
setTimeout(() => {
  const value = fn(); // fn이 실행되는 시점에 연산
  console.log(value);
}, 1000);
