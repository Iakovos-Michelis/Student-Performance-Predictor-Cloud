import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/register/', 
        { username, password }
      )
      localStorage.setItem('token', response.data.token)
      navigate('/predict')
    } catch (err) {
      setError('Username already exists')
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Student Performance Predictor</h1>
      <div style={styles.card}>
        <h2 style={styles.subtitle}>Register</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} placeholder="Username" 
          value={username} onChange={e => setUsername(e.target.value)} />
        <input style={styles.input} placeholder="Password" type="password"
          value={password} onChange={e => setPassword(e.target.value)} />
        <button style={styles.button} onClick={handleRegister}>Register</button>
        <p style={styles.link}>Already have an account? 
          <span onClick={() => navigate('/login')} style={styles.linkText}> Login</span>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: { fontFamily: 'Arial', maxWidth: '500px', margin: '50px auto', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  title: { textAlign: 'center', color: '#2c3e50', whiteSpace: 'nowrap' },
  card: { background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '100%' },
  subtitle: { textAlign: 'center', color: '#2c3e50' },
  input: { width: '100%', padding: '10px', margin: '8px 0', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '10px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' },
  error: { color: 'red', textAlign: 'center' },
  link: { textAlign: 'center', marginTop: '15px' },
  linkText: { color: '#2c3e50', cursor: 'pointer', fontWeight: 'bold' }
}

export default Register