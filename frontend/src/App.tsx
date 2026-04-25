import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import Page from "./components/Page"
import OrganizationManagement from "./components/leadership-management/OrganizationManagement"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/employees" element={<Page />} />
          <Route path="/organization" element={<OrganizationManagement />} />
          <Route path="/" element={<Navigate to="/employees" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App