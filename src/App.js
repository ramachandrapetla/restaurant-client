import './App.css';
import {Footer} from "./Components/Footer/footer";
import {Address} from "./Components/Address/address";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PublicPage from "./Pages/publicPage";

function App() {
  return (
    <div className="App">
        <h1>Bale Bojanam</h1>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" >
                    <PublicPage />
                </Route>
                <Route exact path="/footer" component = {Footer} />
            </Switch>
        </BrowserRouter>
        <Footer />

    </div>
  );
}

export default App;
