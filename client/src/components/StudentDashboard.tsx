import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Users,
  MapPin,
  Download,
  Star,
  GraduationCap,
  Award,
  CheckCircle
} from 'lucide-react';

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('timetable');

  const studentInfo = {
    name: 'Priya Patel',
    program: 'B.Ed. (Bachelor of Education)',
    semester: 'Semester 3',
    studentId: 'BED2023001',
    batch: 'Batch A',
    credits: { completed: 45, total: 120, current: 18 }
  };

  const todaySchedule = [
    { 
      time: '9:00-10:00', 
      subject: 'Educational Psychology', 
      faculty: 'Dr. Priya Sharma', 
      room: 'Room 101', 
      type: 'core',
      attendance: 'present'
    },
    { 
      time: '10:00-11:00', 
      subject: 'Pedagogy of English', 
      faculty: 'Prof. Rajesh Kumar', 
      room: 'Room 102', 
      type: 'core',
      attendance: 'present'
    },
    { 
      time: '11:30-12:30', 
      subject: 'ICT Lab', 
      faculty: 'Mr. Amit Singh', 
      room: 'Computer Lab', 
      type: 'lab',
      attendance: 'upcoming'
    },
    { 
      time: '2:00-3:00', 
      subject: 'Art Education (Elective)', 
      faculty: 'Ms. Sunita Gupta', 
      room: 'Art Room', 
      type: 'elective',
      attendance: 'upcoming'
    }
  ];

  const weekSchedule = [
    { day: 'Monday', classes: 4, subjects: ['Ed. Psychology', 'English Pedagogy', 'ICT Lab', 'Art Education'] },
    { day: 'Tuesday', classes: 3, subjects: ['Philosophy of Ed.', 'Teaching Practice', 'Math Pedagogy'] },
    { day: 'Wednesday', classes: 3, subjects: ['Child Development', 'Science Lab', 'Music Education'] },
    { day: 'Thursday', classes: 2, subjects: ['Assessment & Evaluation', 'Language Curriculum'] },
    { day: 'Friday', classes: 1, subjects: ['School Experience'] }
  ];

  const subjects = [
    { name: 'Educational Psychology', credits: 4, faculty: 'Dr. Priya Sharma', attendance: 92, grade: 'A' },
    { name: 'Pedagogy of English', credits: 4, faculty: 'Prof. Rajesh Kumar', attendance: 88, grade: 'B+' },
    { name: 'Philosophy of Education', credits: 3, faculty: 'Dr. Meera Patel', attendance: 95, grade: 'A' },
    { name: 'ICT in Education', credits: 3, faculty: 'Mr. Amit Singh', attendance: 90, grade: 'A-' },
    { name: 'Art Education (Elective)', credits: 2, faculty: 'Ms. Sunita Gupta', attendance: 85, grade: 'B+' },
    { name: 'Teaching Practice', credits: 2, faculty: 'Various Faculty', attendance: 100, grade: 'A' }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'core': return 'bg-blue-100 text-blue-800';
      case 'elective': return 'bg-green-100 text-green-800';
      case 'lab': return 'bg-purple-100 text-purple-800';
      case 'practical': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600';
    if (attendance >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Student Profile Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500">
              <AvatarFallback className="text-white text-lg">
                PP
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl text-slate-800">{studentInfo.name}</h1>
              <p className="text-slate-600">{studentInfo.program}</p>
              <p className="text-sm text-slate-500">{studentInfo.semester} • {studentInfo.studentId} • {studentInfo.batch}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-600 mb-1">Credit Progress</div>
              <div className="text-lg text-slate-800 mb-2">
                {studentInfo.credits.completed}/{studentInfo.credits.total} credits
              </div>
              <Progress value={(studentInfo.credits.completed / studentInfo.credits.total) * 100} className="w-32 h-2" />
              <div className="text-xs text-slate-600 mt-1">
                {studentInfo.credits.current} credits this semester
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl text-blue-800">4</div>
            <div className="text-sm text-blue-600">Classes Today</div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl text-green-800">91%</div>
            <div className="text-sm text-green-600">Overall Attendance</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl text-purple-800">A-</div>
            <div className="text-sm text-purple-600">Current CGPA</div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl text-orange-800">6</div>
            <div className="text-sm text-orange-600">Enrolled Subjects</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full bg-white/50">
          <TabsTrigger value="timetable" className="data-[state=active]:bg-blue-100">
            Today's Classes
          </TabsTrigger>
          <TabsTrigger value="week" className="data-[state=active]:bg-green-100">
            Weekly View
          </TabsTrigger>
          <TabsTrigger value="subjects" className="data-[state=active]:bg-purple-100">
            My Subjects
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-orange-100">
            Academic Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timetable" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Today's Schedule - Monday, Sep 15, 2025
              </CardTitle>
              <CardDescription>Your classes and activities for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((slot, index) => (
                  <div key={index} className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                    slot.attendance === 'present' ? 'bg-green-50 border-l-4 border-green-400' :
                    slot.attendance === 'upcoming' ? 'bg-blue-50 border-l-4 border-blue-400' : 'bg-slate-50'
                  }`}>
                    <div className="text-sm text-slate-600 w-20">
                      {slot.time}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-slate-800">{slot.subject}</h4>
                        <Badge className={`text-xs ${getTypeColor(slot.type)}`}>
                          {slot.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {slot.faculty}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {slot.room}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      {slot.attendance === 'present' && (
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Present
                        </Badge>
                      )}
                      {slot.attendance === 'upcoming' && (
                        <Badge variant="outline">
                          <Clock className="w-3 h-3 mr-1" />
                          Upcoming
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Weekly Schedule Overview
              </CardTitle>
              <CardDescription>Your complete week at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weekSchedule.map((day, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="w-20 text-slate-700">
                      <div className="text-sm font-medium">{day.day}</div>
                      <div className="text-xs text-slate-500">{day.classes} classes</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-1">
                        {day.subjects.map((subject, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Timetable
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                Enrolled Subjects - Semester 3
              </CardTitle>
              <CardDescription>Your current subjects with attendance and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="text-slate-800 mb-1">{subject.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span>{subject.credits} credits</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {subject.faculty}
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">
                        Grade: {subject.grade}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">Attendance:</span>
                        <span className={`text-sm font-medium ${getAttendanceColor(subject.attendance)}`}>
                          {subject.attendance}%
                        </span>
                      </div>
                      <Progress value={subject.attendance} className="w-24 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  Academic Progress
                </CardTitle>
                <CardDescription>Your journey through the program</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Overall Progress</span>
                    <span className="text-sm text-slate-800">{studentInfo.credits.completed}/{studentInfo.credits.total} credits</span>
                  </div>
                  <Progress value={(studentInfo.credits.completed / studentInfo.credits.total) * 100} className="h-3" />
                  <p className="text-xs text-slate-500 mt-1">
                    {Math.round((studentInfo.credits.completed / studentInfo.credits.total) * 100)}% complete
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg text-green-600 mb-1">A-</div>
                    <div className="text-sm text-green-700">Current CGPA</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg text-blue-600 mb-1">91%</div>
                    <div className="text-sm text-blue-700">Attendance</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm text-slate-700">Semester Breakdown:</h5>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Semester 1</span>
                      <Badge className="bg-green-100 text-green-700">Completed - A</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Semester 2</span>
                      <Badge className="bg-green-100 text-green-700">Completed - B+</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Semester 3</span>
                      <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  NEP-2020 Integration
                </CardTitle>
                <CardDescription>Skills and competencies development</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Core Competencies</span>
                    <Badge className="bg-green-100 text-green-700">85% Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Multidisciplinary Learning</span>
                    <Badge className="bg-blue-100 text-blue-700">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Practical Experience</span>
                    <Badge className="bg-purple-100 text-purple-700">Ongoing</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Research Skills</span>
                    <Badge className="bg-yellow-100 text-yellow-700">Developing</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Community Engagement</span>
                    <Badge className="bg-orange-100 text-orange-700">Planned</Badge>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                  <h6 className="text-sm text-indigo-700 mb-2">Next Milestone:</h6>
                  <p className="text-sm text-indigo-600">Complete Teaching Practice (20 hours) by end of semester</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}