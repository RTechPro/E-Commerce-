import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()
  const BASE_URL = "https://e-commerce-0k9a.onrender.com"
  useEffect(() => {
    const auth = localStorage.getItem('user')
    if (auth) {
      navigate("/")
    }
  }, [])
  const handleLogin = async () => {
    console.log("email,password", email, password);
    let result = await fetch(`${BASE_URL}/login`, {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'content-Type': 'application/json'
      }
    })
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user))
      localStorage.setItem("token", JSON.stringify(result.auth))
      navigate("/")


    } else {
      alert("please enter correct details")
    }
  }
  return (
    <div className='login'>
      <input type="text" className='inputBox' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} value={email} />
      <input type="password" className='inputBox' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} value={password} />
      <button onClick={handleLogin} className='appButton' type='button'>Login</button>
    </div>
  )
}

export default Login