import React, {Component} from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import AppRoute from './core/app-route';
import MainLayout from './layouts/main-layout';
import AuthLayout from './layouts/auth-layout';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/auth/login';
import Register from './components/auth/register';
import DiffAll from './components/diff/diff-all';
import DiffCreate from './components/diff/diff-create';
import DiffView from './components/diff/diff-view';
import OcrAll from './components/ocr/ocr-all';
import OcrView from './components/ocr/ocr-view';
import OcrCreate from './components/ocr/ocr-create';

class Routes extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <AppRoute exact path="/register" layout={AuthLayout} component={Register}></AppRoute>
                    <AppRoute exact path="/login" layout={AuthLayout} component={Login}></AppRoute>

                    <AppRoute exact path="/" layout={MainLayout} component={Dashboard}></AppRoute>

                    <AppRoute exact path="/sets" layout={MainLayout} component={DiffAll}></AppRoute>
                    <AppRoute exact path="/sets/create" layout={MainLayout} component={DiffCreate}></AppRoute>
                    <AppRoute exact path="/sets/view/:id" layout={MainLayout} id="" component={DiffView}></AppRoute>

                    <AppRoute exact path="/ocr" layout={MainLayout} component={OcrAll}></AppRoute>
                    <AppRoute exact path="/ocr/create" layout={MainLayout} component={OcrCreate}></AppRoute>
                    <AppRoute exact path="/ocr/view/:id" layout={MainLayout} component={OcrView}></AppRoute>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Routes;

