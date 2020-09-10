import './index.scss';
import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Index from './pages/index';
import Button from './pages/button';
import Bar from '@/pages/bar';


class App extends Component {
    render() {
        return (
            <HashRouter>
                <Route path='/' component={Index} exact={true} />
                <Route path='/button' component={Button} />
                <Route path='/bar' component={Bar} />
            </HashRouter>
        );
    }
}

export default App;