import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Executions from './pages/Executions';
import Customers from './pages/Customers';
import Inventory from './pages/Inventory';
import Invoices from './pages/Invoices';
import BusinessSetup from "./pages/BusinessSetup/BusinessSetup";
import Integrations from "./components/Integrations/Integrations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/executions" element={<Executions />} />
        <Route path="/business-setup"element={<BusinessSetup />}/>
        <Route path="/customers" element={<Customers />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route
    path="/integrations"
    element={<Integrations />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;