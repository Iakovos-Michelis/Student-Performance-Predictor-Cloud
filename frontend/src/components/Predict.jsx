import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Predict() {
  const [mathScore, setMathScore] = useState('')
  const [readingScore, setReadingScore] = useState('')
  const [writingScore, setWritingScore] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handlePredict = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/predict/',
        { math_score: mathScore, reading_score: readingScore, writing_score: writingScore },
        { withCredentials: true }
      )
      setResult(response.data.result)
    } catch (err) {
      setError('Prediction failed. Please login again.')
    }
  }

  const handleLogout = async () => {
    await axios.post('http://localhost:8000/api/logout/', {}, { withCredentials: true })
    navigate('/login')
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Student Performance Predictor</h1>
      <div style={styles.card}>
        <h2 style={styles.subtitle}>Make a Prediction</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input style={styles.input} placeholder="Math Score (0-100)" type="number"
          min="0" max="100" value={mathScore} onChange={e => setMathScore(e.target.value)} />
        <input style={styles.input} placeholder="Reading Score (0-100)" type="number"
          min="0" max="100" value={readingScore} onChange={e => setReadingScore(e.target.value)} />
        <input style={styles.input} placeholder="Writing Score (0-100)" type="number"
          min="0" max="100" value={writingScore} onChange={e => setWritingScore(e.target.value)} />
        <button style={styles.button} onClick={handlePredict}>Predict</button>
        {result && (
          <div style={{...styles.result, background: result === 'Pass' ? '#2ecc71' : '#e74c3c'}}>
            Result: {result}
          </div>
        )}
        <button style={styles.historyButton} onClick={() => navigate('/history')}>View History</button>
        <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
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
  historyButton: { width: '100%', padding: '10px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' },
  logoutButton: { width: '100%', padding: '10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' },
  result: { textAlign: 'center', padding: '15px', borderRadius: '4px', color: 'white', fontWeight: 'bold', fontSize: '20px', marginTop: '15px' },
  error: { color: 'red', textAlign: 'center' }
}

export default Predict