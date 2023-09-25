import Axios from "axios";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
function AdminLogin() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      // Enter 키를 누를 경우 로그인 버튼 클릭
      handleLogin();
    }
  };
  const handleLogin = () => {
    Axios.post("http://bibliever.com:3001/post/admin/login", {
      id: id,
      password: password,
    }).then((response) => {
      console.log(response);
      if (response.data.length > 0) {
        
          alert(`환영합니다 ${response.data[0].name}!`);
          console.log("Admin login successful");
          navigate("/Home");
 
      } else {
        alert(`아이디 혹은 비밀번호가 틀렸습니다.`);
        console.log("Admin login failed");
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img className="logo" src="img/main.png" alt="불러오기 실패" />
        <h2 className="Login-Banner-Text">Admin Login</h2>
        <form>
          <div>
            <input
              className="TextIPT"
              type="text"
              value={id}
              placeholder="아이디를 입력하세요."
              onChange={handleUsernameChange}
              onKeyPress={handleEnterKey}
            />
          </div>
          <div>
            <input
              className="TextIPT"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력해 주세요."
              onKeyPress={handleEnterKey}
            />
          </div>
          <button className="Login-BTN" type="button" onClick={handleLogin}>
            로그인
          </button>
        </form>
      </header>
    </div>
  );
}

export default AdminLogin;
