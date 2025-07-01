import { useState } from "react";
import { useEffect } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import styles from './Login.module.css';
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className={styles.container}>
      <form action="" className={styles.formAuth}>
          <h1>Login</h1>
          <TextInput type="email" label="Email" hint="sample@email.com" id="login-email" required={true}/>
          <TextInput type="password" label="Password" hint="password" id="login-pwd" required={true}/>
          <div>
              <Link to="register"><Button text="Sign up" /></Link>
              <Link to="home"><Button text="Log in"/></Link>
          </div>
      </form>

      <div>
        <div>
          <h1>Welcome to <span>JournaLite</span></h1>
          <p>Start your journey to better self-awareness today</p>
        </div>
        <p><a href="https://unsplash.com/photos/brown-pencil-on-white-book-page-fVUl6kzIvLg">Picture by Jan Kahánek</a></p>
      </div>
    </div>
  );
}
