import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Login from './pages/Login';
import Home from './pages/Home';
import AllocationList from './pages/AllocationList';
import AllocationBasisList from './pages/AllocationBasisList';
import AllocationBasisForm from './pages/AllocationBasisForm';
import AllocationForm from './pages/AllocationForm';
import TransferList from './pages/TransferList';
import TransferForm from './pages/TransferForm';
import AccountManagement from './pages/AccountManagement';
import AccountDetail from './pages/AccountDetail';
import SystemManagement from './pages/SystemManagement';
import ChangePassword from './pages/ChangePassword';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/allocation-list" element={<AllocationList />} />
          <Route path="/allocation-basis-list" element={<AllocationBasisList />} />
          <Route path="/allocation-basis-form/new" element={<AllocationBasisForm />} />
          <Route path="/allocation-basis-form/edit/:id" element={<AllocationBasisForm />} />
          <Route path="/allocation-form/new" element={<AllocationForm />} />
          <Route path="/allocation-form/edit/:id" element={<AllocationForm />} />
          <Route path="/transfer-list" element={<TransferList />} />
          <Route path="/transfer-form/new" element={<TransferForm />} />
          <Route path="/transfer-form/edit/:id" element={<TransferForm />} />
          <Route path="/account-management" element={<AccountManagement />} />
          <Route path="/account-detail/:id" element={<AccountDetail />} />
          <Route path="/system-management" element={<SystemManagement />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App; 