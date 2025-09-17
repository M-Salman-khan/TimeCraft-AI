import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';

import { 
  Users, 
  Search, 
  Clock, 
  BookOpen, 
  Calendar,
  Mail,
  Phone,
  MapPin,
  Filter,
  Plus,
  Edit,
  BarChart3
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
}

export function FacultyManager() {
  const [searchTerm, setSearchTerm] = useState('');

  const mockFaculty: Faculty[] = [
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
      status: 'available'
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
      status: 'busy'
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
      status: 'available'
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
      status: 'available'
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
      status: 'available'
    }
  ];

  const getStatusColor = (status: Faculty['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
    }
  };

  const getWorkloadColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const filteredFaculty = mockFaculty.filter(faculty =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl text-slate-800">Faculty Management</h2>
          <p className="text-sm text-slate-600">Manage faculty workload, availability, and assignments</p>
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
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Faculty
          </Button>
        </div>
      </div>

      {/* Faculty Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Total Faculty</p>
                <p className="text-lg text-blue-800">42</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600">Available Now</p>
                <p className="text-lg text-green-800">38</p>
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
                <p className="text-lg text-purple-800">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-orange-600">Subjects Covered</p>
                <p className="text-lg text-orange-800">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Faculty List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFaculty.map(faculty => (
          <Card key={faculty.id} className="hover:shadow-lg transition-shadow cursor-pointer">
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
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(faculty.status)}>
                    {faculty.status}
                  </Badge>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {faculty.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {faculty.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {faculty.room}
                </div>
              </div>

              {/* Workload */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Workload</span>
                  <span className="text-sm text-slate-800">
                    {faculty.workload}/{faculty.maxWorkload} hours
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
                  {faculty.subjects.map(subject => (
                    <Badge key={subject} variant="outline" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <p className="text-sm text-slate-600 mb-2">Availability:</p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {faculty.availability.map(slot => (
                    <div key={slot} className="bg-green-50 text-green-700 px-2 py-1 rounded">
                      {slot}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Schedule
                </Button>
                <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Clock className="w-4 h-4 mr-2" />
                  Update Availability
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Faculty Workload Distribution
          </CardTitle>
          <CardDescription>Visual overview of current workload across all faculty</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockFaculty.map(faculty => {
              const percentage = (faculty.workload / faculty.maxWorkload) * 100;
              return (
                <div key={faculty.id} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-slate-700 truncate">
                    {faculty.name}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${getWorkloadColor(faculty.workload, faculty.maxWorkload)}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-600 w-16">
                        {faculty.workload}/{faculty.maxWorkload}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}