import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// import useStyles from './styles';

import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import Auth from './components/Auth/Auth'

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";

// layouts

import Admin from "./layouts/Admin.js";
import Auth from "./layouts/Auth.js";

// views without layouts

import Landing from "./views/Landing.js";
import Profile from "./views/Profile.js";
import Index from "./views/Index.js";

// const THEME = createTheme({
//     typography: {
//         "fontFamily": `"Nunito Sans", "Cairo", "Arial", sans-serif`,
//         "fontSize": 14,
//         "fontWeightLight": 300,
//         "fontWeightRegular": 400,
//         "fontWeightMedium": 500
//     }
// });

const App = () => {
    // const classes = useStyles();
    return (
            <BrowserRouter>
                    {/*<Navbar />*/}
                    <Switch>
                        <Route path="/" exact component={LandingPage} />
                        <Route path="/home" exact component={Home} />
                        <Route path="/auth" exact component={Auth} />
                    </Switch>
            </BrowserRouter>
    )
}

export default App;