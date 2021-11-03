import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import useStyles from './styles';

import Home from './components/Home/Home';


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
                        <Route path="/home" exact component={Home} />
                    </Switch>
       
            </BrowserRouter>
    )
}

export default App;