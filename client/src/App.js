// import React from 'react';
// import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// // import useStyles from './styles';

// import Home from './components/Home/Home';
// import LandingPage from './components/LandingPage/LandingPage';
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "./assets/styles/tailwind.css";

// // layouts

// import Admin from "./layouts/Admin.js";
// import Auth from "./layouts/Auth.js";

// // views without layouts

// import Landing from "./views/Landing.js";
// import Profile from "./views/Profile.js";
// import Index from "./views/Index.js";

// // const THEME = createTheme({
// //     typography: {
// //         "fontFamily": `"Nunito Sans", "Cairo", "Arial", sans-serif`,
// //         "fontSize": 14,
// //         "fontWeightLight": 300,
// //         "fontWeightRegular": 400,
// //         "fontWeightMedium": 500
// //     }
// // });

// const App = () => {
//     // const classes = useStyles();
//     return (
//         <BrowserRouter>
//             {/*<Navbar />*/}
//             <Switch>
//                 {/* <Route path="/" exact component={LandingPage} /> */}
//                 <Route path="/home" exact component={Home} />
//                 {/* add routes with layouts */}
//                 <Route path="/admin" component={Admin} />
//                 <Route path="/auth" component={Auth} />
//                 {/* add routes without layouts */}
//                 <Route path="/landing" exact component={Landing} />
//                 <Route path="/profile" exact component={Profile} />
//                 <Route path="/" exact component={Index} />
//                 {/* add redirect for first page */}
//                 <Redirect from="*" to="/" />
//             </Switch>
//         </BrowserRouter>
//     )
// }

// export default App;

// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
    return (
        <ThemeConfig>
            <ScrollToTop />
            <GlobalStyles />
            <BaseOptionChartStyle />
            <Router />
        </ThemeConfig>
    );
}
