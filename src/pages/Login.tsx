import React, { useState } from 'react'
import { TextInputComponent } from '../components/TextInputComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from 'antd';

export const Login : React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = () =>{
        console.log(username, password)
    }

  return (
    <div style={{ backgroundColor: "#DECFFF", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <img
        src="/images/logo.png"
        alt="Logo"
        style={{
            width: "auto",
            height: "auto",
            maxWidth: "250px",
            maxHeight: "250px"
        }}
        />

      <h1 style={{ color: "#6a0dad", fontWeight: "bold", fontSize: "2rem" }}>Chào mừng đến với Harmon</h1>
      
    <Form layout="horizontal" className="w-96 space-y-2">
        <TextInputComponent
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={<UserOutlined />}
        />
        <TextInputComponent
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<KeyOutlined />}
         />
    </Form>



    <div style={{ marginTop: "50px" }}>
        <ButtonComponent text="Login" onClick={handleLogin} />
      </div>
    </div>
  )
}
