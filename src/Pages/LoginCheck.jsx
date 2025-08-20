import React, { useState } from 'react';

function LoginCheck() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data",data);
        
        setMessage(`✅ Login successful! Token: ${data.token || 'No token'}`);
      } else {
        setMessage('❌ Login failed! Check username/password.');
      }
    } catch (error) {
      console.error(error);
      setMessage('⚠️ Error connecting to server.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <h2 className="text-xl font-bold">Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded w-64"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-64"
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>

      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

export default LoginCheck;
