import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectTasksPage from './pages/ProjectDetailsPage'

function App() {

  return (
    <div className="app">
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectTasksPage />} />
      </Routes>
    </Layout>
  </div>
  )
}

export default App
