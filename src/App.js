import logo from "./logo.svg";
import "./App.css";
import CounterContainers from "./containers/CounterContainers";
import SampleContainer from "./containers/SampleContainer";

function App() {
  return (
    <div>
      <CounterContainers />
      <SampleContainer />
    </div>
  );
}

export default App;
