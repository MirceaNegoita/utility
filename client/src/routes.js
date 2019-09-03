import React, {Component} from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import MainLayout from './layouts/main-layout';
import AuthLayout from './layouts/auth-layout';
import AppRoute from './core/app-route';
import Login from './components/auth/login';
import Register from './components/auth/register';
import DiffAll from './components/diff/diff-all';
import DiffCreate from './components/diff/diff-create';
import DiffView from './components/diff/diff-view';

class Routes extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <AppRoute exact path="/" layout={MainLayout} component={DiffAll}></AppRoute>
                    <AppRoute exact path="/create" layout={MainLayout} component={DiffCreate}></AppRoute>
                    <AppRoute exact path="/view/:id" layout={MainLayout} id="" component={DiffView}></AppRoute>
                    <AppRoute exact path="/register" layout={AuthLayout} component={Register}></AppRoute>
                    <AppRoute exact path="/login" layout={AuthLayout} component={Login}></AppRoute>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Routes;

