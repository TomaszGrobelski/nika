import { Label } from "../styles/LoginPage.styles";
import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import EmailLabel from "../components/LoginRegister/EmailLabel";
import PasswordLabel from "../components/LoginRegister/PasswordLabel";
import ButtonCustom from "../components/Buttons/ButtonCustom";
import Formh1 from "../components/LoginRegister/Formh1";
import {IoCreate} from 'react-icons/io5';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e: FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        useCredential.user.getIdToken().then((userToken) => {
          localStorage.setItem("user", userToken);
          navigate("/home");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleRegisterClick = () => {
    navigate("/registration");
  };
  return (
    <Formh1 onSubmit={signIn} h1="Login">
      <EmailLabel>
        <Label type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </EmailLabel>
      <PasswordLabel>
        <Label
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </PasswordLabel>
      <button type="button" onClick={handleRegisterClick} className="flex items-center gap-1 self-end mt-1 mb-5">
        Register Now <IoCreate />
      </button>
      <ButtonCustom type="submit" className="w-28 h-12">
        Login
      </ButtonCustom>
      <div className="mt-8">
        <h2>Demo Account:</h2>
        <div  className="mt-4">Email: <span className="font-bold">bleniog@wp.pl</span> </div>
        <div>Password: <span className="font-bold">tomasz</span></div>
      </div>
    </Formh1>
  );
}

export default LoginPage;