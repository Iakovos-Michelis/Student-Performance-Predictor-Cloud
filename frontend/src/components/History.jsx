import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function History() {
  const [history, setHistory] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/history/',
          { withCredentials: true }
        )
        setHistory(response.data)
      } catch (err) {
        navigate('/login')
      }
    }
    fetchHistory()
  }, [])

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Student Performance Predictor</h1>
      <div style={styles.card}>
        <h2 style={styles.subtitle}>Prediction History</h2>
        {history.length === 0 ? (
          <p style={styles.empty}>No predictions yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Math</th>
                <th style={styles.th}>Reading</th>
                <th style={styles.th}>Writing</th>
                <th style={styles.th}>Result</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{item.math_score}</td>
                  <td style={styles.td}>{item.reading_score}</td>
                  <td style={styles.td}>{item.writing_score}</td>
                  <td style={{...styles.td, color: item.result === 'Pass' ? '#2ecc71' : '#e74c3c', fontWeight: 'bold'}}>
                    {item.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button style={styles.button} onClick={() => navigate('/predict')}>Back to Predictor</button>
      </div>
    </div>
  )
}

const styles = {
  container: { fontFamily: 'Arial', maxWidth: '500px', margin: '50px auto', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  title: { textAlign: 'center', color: '#2c3e50', whiteSpace: 'nowrap' },
  card: { background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '100%' },
  subtitle: { textAlign: 'center', color: '#2c3e50' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { background: '#2c3e50', color: 'white', padding: '12px', textAlign: 'center' },
  td: { padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' },
  button: { width: '100%', padding: '10px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' },
  empty: { textAlign: 'center', color: '#999' }
}

export default History