import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Form from './pages/form';
import Main from './pages/main';
import Edit from './pages/edit';
import Index from './pages/index';
import Login from './pages/login';
import { AuthProvider } from './pages/auth';
import PrivateRoute from './services/privateRoute'

export default function Routes(){
    return(
        <AuthProvider>
            <BrowserRouter>
                <Route path="/" exact component={ Login } />
                {/* <Route path="/signUp" exact component={ SignUp } /> */}
                <PrivateRoute path="/new" component={ Form } />
                <PrivateRoute path="/main" component={ Main } /> 
                <PrivateRoute path="/leads" component={ Index } />
                <PrivateRoute path={"/edit/:id"} component={ Edit } /> 
            </BrowserRouter>
        </AuthProvider>
    );
}