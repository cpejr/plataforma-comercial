import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import './login.css';
import { AuthContext } from "./auth";
import appFirebase from '../components/Firebase/firebase.js'
require('firebase/auth')


const Login = ({ history }) => {
  const email="webmaster@cpejr.com.br"
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { password } = event.target.elements;
      try {
        await appFirebase
          .auth()
          .signInWithEmailAndPassword(email, password.value);
        history.push("/main");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/main" />;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <input name="password" type="password" placeholder="Insira a senha" />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default withRouter(Login);
