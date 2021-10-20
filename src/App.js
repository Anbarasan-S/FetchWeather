import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import IndexPage from "./Components/IndexPage";
import FetchWeather from "./Components/FetchWeather";
function App() {
  return (
    <Router>
      <Switch>
      <Route path="/" exact component={IndexPage} ></Route>
      <Route path="/fetchweather/:id" exact component={FetchWeather} ></Route>
      </Switch>
    </Router>
  );
}

export default App;
