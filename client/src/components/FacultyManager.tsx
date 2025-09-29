import { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { FacultyScheduleView } from './FacultyScheduleView';
import { FacultyAnalytics } from './FacultyAnalytics';
import { 
  Users, 
  Search, 
  Calendar,
  Mail,
  Phone,
  MapPin,
  Filter,
  Plus,
  Edit,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Save,
  Activity,
} from 'lucide-react';

interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
  workload: number;
  maxWorkload: number;
  availability: string[];
  phone: string;
  room: string;
  status: 'available' | 'busy' | 'unavailable';
  activeSchedules: number;
  conflictedSchedules: number;
  totalCourses: number;
  qualification: string;
  experience: number;
}

export function FacultyManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'schedule' | 'analytics'>('list');
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  // Initial faculty data
  const [facultyList] = useState<Faculty[]>([
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      email: 'p.sharma@college.edu',
      department: 'Education',
      subjects: ['Educational Psychology', 'Child Development', 'Research Methodology'],
      workload: 18,
      maxWorkload: 20,
      availability: ['Monday 9-5', 'Tuesday 9-5', 'Wednesday 9-2', 'Thursday 9-5'],
      phone: '+91 98765 43210',
      room: 'Faculty Block - 201',
      status: 'available',
      activeSchedules: 12,
      conflictedSchedules: 1,
      totalCourses: 3,
      qualification: 'Ph.D. in Educational Psychology',
      experience: 15
    },
    {
      id: '2',
      name: 'Prof. Rajesh Kumar',
      email: 'r.kumar@college.edu',
      department: 'English',
      subjects: ['Pedagogy of English', 'Language Across Curriculum', 'Creative Writing'],
      workload: 20,
      maxWorkload: 20,
      availability: ['Monday 9-5', 'Tuesday 9-3', 'Thursday 9-5', 'Friday 9-2'],
      phone: '+91 98765 43211',
      room: 'Faculty Block - 105',
      status: 'busy',
      activeSchedules: 15,
      conflictedSchedules: 0,
      totalCourses: 3,
      qualification: 'M.A. English Literature, B.Ed.',
      experience: 12
    },
    {
      id: '3',
      name: 'Dr. Meera Patel',
      email: 'm.patel@college.edu',
      department: 'Philosophy',
      subjects: ['Philosophy of Education', 'Ethics in Teaching', 'Critical Thinking'],
      workload: 15,
      maxWorkload: 20,
      availability: ['Monday 9-5', 'Tuesday 9-5', 'Wednesday 9-5', 'Friday 9-5'],
      phone: '+91 98765 43212',
      room: 'Faculty Block - 302',
      status: 'available',
      activeSchedules: 10,
      conflictedSchedules: 0,
      totalCourses: 3,
      qualification: 'Ph.D. in Philosophy of Education',
      experience: 18
    },
    {
      id: '4',
      name: 'Mr. Amit Singh',
      email: 'a.singh@college.edu',
      department: 'ICT',
      subjects: ['ICT in Education', 'Digital Pedagogy', 'Educational Technology'],
      workload: 16,
      maxWorkload: 18,
      availability: ['Monday 9-5', 'Wednesday 9-5', 'Thursday 9-5', 'Friday 9-3'],
      phone: '+91 98765 43213',
      room: 'Computer Lab - 1',
      status: 'available',
      activeSchedules: 11,
      conflictedSchedules: 2,
      totalCourses: 3,
      qualification: 'M.Tech Computer Science, B.Ed.',
      experience: 8
    },
    {
      id: '5',
      name: 'Ms. Sunita Gupta',
      email: 's.gupta@college.edu',
      department: 'Arts',
      subjects: ['Art Education', 'Creative Arts', 'Aesthetic Education'],
      workload: 12,
      maxWorkload: 16,
      availability: ['Tuesday 9-5', 'Wednesday 9-5', 'Thursday 9-2', 'Friday 9-5'],
      phone: '+91 98765 43214',
      room: 'Art Room - 1',
      status: 'available',
      activeSchedules: 8,
      conflictedSchedules: 0,
      totalCourses: 3,
      qualification: 'M.F.A. Fine Arts, B.Ed.',
      experience: 10
    }
  ]);

  const getStatusColor = (status: Faculty['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
    }
  };

  // const getWorkloadColor = (current: number, max: number) => {
  //   const percentage = (current / max) * 100;
  //   if (percentage >= 90) return 'bg-red-500';
  //   if (percentage >= 75) return 'bg-yellow-500';
  //   return 'bg-green-500';
  // };

  // Simple search filtering
  const filteredFaculty = facultyList.filter(faculty =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate stats
  const totalFaculty = facultyList.length;
  const availableFaculty = facultyList.filter(f => f.status === 'available').length;
  // const totalActiveSchedules = facultyList.reduce((sum, f) => sum + f.activeSchedules, 0);
  const totalConflicts = facultyList.reduce((sum, f) => sum + f.conflictedSchedules, 0);
  const avgWorkload = Math.round(facultyList.reduce((sum, f) => sum + (f.workload / f.maxWorkload * 100), 0) / facultyList.length);

  const handleViewSchedule = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setViewMode('schedule');
  };

  const handleViewAnalytics = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setViewMode('analytics');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedFaculty(null);
  };

  // Render different views based on viewMode
  if (viewMode === 'schedule' && selectedFaculty) {
    return <FacultyScheduleView faculty={selectedFaculty} onClose={handleBackToList} />;
  }

  if (viewMode === 'analytics' && selectedFaculty) {
    return <FacultyAnalytics faculty={selectedFaculty} onClose={handleBackToList} />;
  }

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl text-slate-800">Faculty Management</h2>
          <p className="text-sm text-slate-600">
            Manage faculty workload, availability, and assignments
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Faculty
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      {/* Faculty Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Total Faculty</p>
                <p className="text-lg text-blue-800">{totalFaculty}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600">Available</p>
                <p className="text-lg text-green-800">{availableFaculty}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Avg. Workload</p>
                <p className="text-lg text-purple-800">{avgWorkload}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${totalConflicts > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${totalConflicts > 0 ? 'bg-red-100' : 'bg-green-100'}`}>
                {totalConflicts > 0 ? 
                  <AlertTriangle className="w-4 h-4 text-red-600" /> : 
                  <CheckCircle className="w-4 h-4 text-green-600" />
                }
              </div>
              <div>
                <p className={`text-sm ${totalConflicts > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {totalConflicts > 0 ? 'Conflicts' : 'Conflict-Free'}
                </p>
                <p className={`text-lg ${totalConflicts > 0 ? 'text-red-800' : 'text-green-800'}`}>
                  {totalConflicts > 0 ? totalConflicts : '✓'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Faculty List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFaculty.map(faculty => (
          <Card key={faculty.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500">
                    <AvatarFallback className="text-white">
                      {faculty.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg text-slate-800">{faculty.name}</h3>
                    <p className="text-sm text-slate-600">{faculty.department} Department</p>
                    <p className="text-xs text-slate-500">{faculty.experience} years exp.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(faculty.status)}>
                    {faculty.status}
                  </Badge>
                  {faculty.conflictedSchedules > 0 && (
                    <Badge className="bg-red-100 text-red-700">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      {faculty.conflictedSchedules}
                    </Badge>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      setEditingFaculty(faculty);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 py-2 border-b border-slate-100">
                <div className="text-center">
                  <div className="text-lg text-slate-800">{faculty.activeSchedules}</div>
                  <div className="text-xs text-slate-500">Active</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg ${faculty.conflictedSchedules > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {faculty.conflictedSchedules > 0 ? faculty.conflictedSchedules : '✓'}
                  </div>
                  <div className="text-xs text-slate-500">Conflicts</div>
                </div>
                <div className="text-center">
                  <div className="text-lg text-slate-800">{faculty.totalCourses}</div>
                  <div className="text-xs text-slate-500">Courses</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{faculty.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {faculty.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{faculty.room}</span>
                </div>
              </div>

              {/* Workload */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Workload</span>
                  <span className="text-sm text-slate-800">
                    {faculty.workload}/{faculty.maxWorkload} hours ({Math.round((faculty.workload / faculty.maxWorkload) * 100)}%)
                  </span>
                </div>
                <Progress 
                  value={(faculty.workload / faculty.maxWorkload) * 100} 
                  className="h-2"
                />
              </div>

              {/* Subjects */}
              <div>
                <p className="text-sm text-slate-600 mb-2">Teaching Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  {faculty.subjects.slice(0, 2).map(subject => (
                    <Badge key={subject} variant="outline" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                  {faculty.subjects.length > 2 && (
                    <Badge variant="outline" className="text-xs bg-slate-100">
                      +{faculty.subjects.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleViewSchedule(faculty)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleViewAnalytics(faculty)}
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Faculty Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Faculty Member</DialogTitle>
            <DialogDescription>
              Enter the basic details for the new faculty member
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Dr. John Smith" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.smith@college.edu" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="philosophy">Philosophy</SelectItem>
                    <SelectItem value="ict">ICT</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+91 98765 43210" />
              </div>
            </div>

            <div>
              <Label htmlFor="subjects">Subjects (comma-separated)</Label>
              <Textarea
                id="subjects"
                placeholder="Educational Psychology, Child Development, Research Methodology"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
              <Save className="w-4 h-4 mr-2" />
              Add Faculty
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Faculty Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Faculty Member</DialogTitle>
            <DialogDescription>
              Update faculty information
            </DialogDescription>
          </DialogHeader>
          
          {editingFaculty && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input id="edit-name" defaultValue={editingFaculty.name} />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" type="email" defaultValue={editingFaculty.email} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-department">Department</Label>
                  <Select defaultValue={editingFaculty.department.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="philosophy">Philosophy</SelectItem>
                      <SelectItem value="ict">ICT</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={editingFaculty.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="busy">Busy</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-subjects">Subjects</Label>
                <Textarea
                  id="edit-subjects"
                  defaultValue={editingFaculty.subjects.join(', ')}
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={() => setIsEditDialogOpen(false)}>
              <Save className="w-4 h-4 mr-2" />
              Update Faculty
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}