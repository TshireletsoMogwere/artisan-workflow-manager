import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import InventoryPage from './pages/InventoryPage';

function App() {
 

  return (
  <Router>
<Navbar />
<main className="pt-20 px-4">
<Routes>
<Route path="/" element={<DashboardPage />} />
    <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/inventory" element={<InventoryPage />} />
</Routes>
</main>
</Router>
  )
}

export default App
