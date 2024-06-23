import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Profile from './components/Profile/Profile';
import AdminPage from './pages/AdminPage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Sidebar from './components/Layout/Sidebar';
import ModulePage from './pages/ModulePage';
import ModuleDetail from './components/Modules/ModuleDetail';
import SubjectDetailPage from './components/subject/SubjectDetailPage';
import ProtectedRoute from './context/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Sidebar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
              <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} adminOnly={true} />} />
              <Route path="/modules" element={<ProtectedRoute element={<ModulePage />} adminOnly={true} />} />
              <Route path="/modules/:moduleId" element={<ProtectedRoute element={<ModuleDetail />} />} />
              <Route path="/subjects/:subjectId" element={<SubjectDetailPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
