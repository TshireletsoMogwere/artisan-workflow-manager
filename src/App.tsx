import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';

function App() {
 

  return (
  <Router>
<Navbar />
<main className="pt-20 px-4">
<Routes>
<Route path="/" element={<DashboardPage />} />
</Routes>
</main>
</Router>
  )
}

export default App
