import type { UserRole } from '../App';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Users, GraduationCap, Sparkles, Settings } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function Header({ currentRole, onRoleChange }: HeaderProps) {
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin': return <Settings className="w-4 h-4" />;
      case 'faculty': return <Users className="w-4 h-4" />;
      case 'student': return <GraduationCap className="w-4 h-4" />;
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'Admin Dashboard';
      case 'faculty': return 'Faculty Portal';
      case 'student': return 'Student View';
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-blue-200/50 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl text-slate-800 flex items-center gap-2">
              TimeCraft AI
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </h1>
            <p className="text-sm text-slate-600">Turning timetable chaos into clarity</p>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            {getRoleIcon(currentRole)}
            <span>Viewing as:</span>
          </div>
          <Select value={currentRole} onValueChange={(value: UserRole) => onRoleChange(value)}>
            <SelectTrigger className="w-48 bg-white/70">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Admin Dashboard
                </div>
              </SelectItem>
              <SelectItem value="faculty">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Faculty Portal
                </div>
              </SelectItem>
              <SelectItem value="student">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Student View
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}