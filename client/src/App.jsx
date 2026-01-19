import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import TodoPage from './pages/TodoPage'
import DonePage from './pages/DonePage'

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/todo" replace />} />
                    <Route path="/todo" element={<TodoPage />} />
                    <Route path="/done" element={<DonePage />} />
                </Routes>
            </Layout>
        </Router>
    )
}

export default App
