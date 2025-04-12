// import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'

function App() {

  return (
    <div className="app">
    {/* <Header /> */}
    <Layout>
      {/* <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
      </Routes> */}
      <div>App</div>
    </Layout>
    {/* <Footer /> */}
  </div>
  )
}

export default App
