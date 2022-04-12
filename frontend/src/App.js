import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/main/main';
import './SCSS/index.scss';

function App() {
    return (
        <Router>
            <Main />
        </Router>
    );
}

export default App;
