import { useState } from 'react';
import { Header } from './components/Header';
import { AdminDashboard } from './components/AdminDashboard';
import { FacultyDashboard } from './components/FacultyDashboard';
import { StudentDashboard } from './components/StudentDashboard';

export type UserRole = 'admin' | 'faculty' | 'student';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('admin');

  const renderDashboard = () => {
    switch (currentRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'faculty':
        return <FacultyDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header currentRole={currentRole} onRoleChange={setCurrentRole} />
      {renderDashboard()}
    </div>
  );
}