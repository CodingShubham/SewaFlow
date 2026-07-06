import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Executions from './pages/Executions';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Invoices from './pages/Invoices';
import BusinessSetup from "./pages/BusinessSetup/BusinessSetup";
import Integrations from "./components/Integrations/Integrations";
import CreateAutomation from "./pages/CreateAutomation"
import Workflow from "./pages/Workflow";
import WorkflowDetails from "./pages/WorkflowDetails";
import EditWorkflow from "./pages/EditWorkflow";


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
       <Route path="/products" element={<Products />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route
    path="/workflows/:id"
    element={<WorkflowDetails />}
/>

<Route

    path="/workflows/:id/edit"

    element={<EditWorkflow />}

/>
        <Route
    path="/workflow"
    element={<Workflow />}
/>
        <Route
    path="/create-automation"
    element={<CreateAutomation />}
/>
        <Route
    path="/integrations"
    element={<Integrations />}

/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;