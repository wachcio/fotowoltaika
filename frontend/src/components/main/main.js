import { Switch, Route, Redirect } from 'react-router-dom';
import ChartsDay from '../charts/chartsDay';
import ChartsMonth from '../charts/chartsMonth';
import Home from '../home/home';
import MinMaxInverterData from '../minMaxInverterData/minMaxInverterData';
import Nav from '../nav/nav';
import UpdateAllData from '../updateAllData/updateAllData';

function Main() {
    return (
        <div className="App w-full min-h-full  p-4">
            <UpdateAllData />
            <Nav />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/day" exact component={ChartsDay} />
                <Route path="/month" exact component={ChartsMonth} />
                <Route path="/max" exact component={MinMaxInverterData} />
                {/* <Route path="*" component={Home}/> */}
                <Redirect from="*" to="/" />
            </Switch>
        </div>
    );
}

export default Main;
