import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./components/Profile/Profile";
import AdminPage from "./pages/AdminPage";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Sidebar from "./components/Layout/Sidebar";
import ModulePage from "./pages/ModulePage";
import ModuleDetail from "./components/Modules/ModuleDetail";
import SubjectDetailPage from "./components/subject/SubjectDetailPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Sidebar />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/* Routes protégées */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute role="admin">
                    <AdminPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/modules"
                element={
                  <PrivateRoute role="admin">
                    <ModulePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/modules/:moduleId"
                element={
                  <PrivateRoute>
                    <ModuleDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/subjects/:subjectId"
                element={
                  <PrivateRoute>
                    <SubjectDetailPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
