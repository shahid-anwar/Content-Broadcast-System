import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import Login from "../pages/auth/Login";
import DashboardLayout from "../components/layout/DashboardLayout";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import UploadContent from "../pages/teacher/UploadContent";
import MyContent from "../pages/teacher/MyContent";
import PendingApproval from "../pages/principal/PendingApproval";
import PrincipalDashboard from "../pages/principal/PrincipalDashboard";
import LivePage from "../pages/public/LivePage";
import AllContent from "../pages/principal/AllContent";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/live/:teacherId" element={<LivePage />} />

      {/* Teacher */}
      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="teacher">
              <DashboardLayout>
                <TeacherDashboard />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/upload"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="teacher">
              <DashboardLayout>
                <UploadContent />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/my-content"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="teacher">
              <DashboardLayout>
                <MyContent />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route path="/live/:teacherId" element={<LivePage />} />
      {/* Principal */}
      <Route
        path="/principal/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="principal">
              <DashboardLayout>
                <PrincipalDashboard />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/principal/approvals"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="principal">
              <DashboardLayout>
                <PendingApproval />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/principal/content"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRole="principal">
              <DashboardLayout>
                <AllContent />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
