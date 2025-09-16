import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Users,
  MapPin,
  Bell,
  Settings,
  CheckCircle,
  AlertTriangle,
  Download,
  Edit
} from 'lucide-react';

export function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState('schedule');

  const facultyInfo = {
    name: 'Dr. Priya Sharma',
    department: 'Education',
    email: 'p.sharma@college.edu',
    workload: 18,
    maxWorkload: 20,
    subjects: ['Educational Psychology', 'Child Development', 'Research Methodology']
  };

  const todaySchedule = [
    { time: '9:00-10:00', subject: 'Educational Psychology', class: 'B.Ed. Sem 3', room: 'Room 101', students: 45 },
    { time: '10:00-11:00', subject: 'Child Development', class: 'B.Ed. Sem 1', room: 'Room 103', students: 50 },
    { time: '2:00-3:00', subject: 'Research Methodology', class: 'M.Ed. Sem 2', room: 'Room 205', students: 25 },
    { time: '3:00-4:00', subject: 'Practical Session', class: 'B.Ed. Sem 3', room: 'Psychology Lab', students: 20 }
  ];

  const weekSchedule = [
    { day: 'Monday', classes: 4, hours: '9:00 AM - 4:00 PM', subjects: ['Ed. Psychology', 'Child Dev.', 'Research'] },
    { day: 'Tuesday', classes: 3, hours: '10:00 AM - 3:00 PM', subjects: ['Child Dev.', 'Ed. Psychology'] },
    { day: 'Wednesday', classes: 2, hours: '9:00 AM - 12:00 PM', subjects: ['Research', 'Practical'] },
    { day: 'Thursday', classes: 4, hours: '9:00 AM - 4:00 PM', subjects: ['Ed. Psychology', 'Child Dev.'] },
    { day: 'Friday', classes: 1, hours: '10:00 AM - 11:00 AM', subjects: ['Seminar'] }
  ];

  const notifications = [
    { type: 'info', message: 'Room changed for Ed. Psychology - now Room 105', time: '2 hours ago' },
    { type: 'warning', message: 'Student count increased for Child Development class', time: '4 hours ago' },
    { type: 'success', message: 'Your availability update has been processed', time: '1 day ago' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Faculty Profile Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500">
              <AvatarFallback className="text-white text-lg">
                PS
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl text-slate-800">{facultyInfo.name}</h1>
              <p className="text-slate-600">{facultyInfo.department} Department</p>
              <p className="text-sm text-slate-500">{facultyInfo.email}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-600 mb-1">Current Workload</div>
              <div className="text-lg text-slate-800 mb-2">
                {facultyInfo.workload}/{facultyInfo.maxWorkload} hours
              </div>
              <Progress value={(facultyInfo.workload / facultyInfo.maxWorkload) * 100} className="w-32 h-2" />
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
            <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl text-green-800">6</div>
            <div className="text-sm text-green-600">Hours Today</div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl text-purple-800">140</div>
            <div className="text-sm text-purple-600">Total Students</div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl text-orange-800">3</div>
            <div className="text-sm text-orange-600">Subjects</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full bg-white/50">
          <TabsTrigger value="schedule" className="data-[state=active]:bg-blue-100">
            Today's Schedule
          </TabsTrigger>
          <TabsTrigger value="week" className="data-[state=active]:bg-green-100">
            Weekly View
          </TabsTrigger>
          <TabsTrigger value="availability" className="data-[state=active]:bg-purple-100">
            Availability
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-orange-100">
            Updates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Today's Schedule - Monday, Sep 15, 2025
              </CardTitle>
              <CardDescription>Your classes and commitments for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((slot, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="text-sm text-slate-600 w-20">
                      {slot.time}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-slate-800 mb-1">{slot.subject}</h4>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {slot.class}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {slot.room}
                        </span>
                        <span>{slot.students} students</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Details
                    </Button>
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
                      <div className="text-sm">{day.day}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <Badge variant="outline">{day.classes} classes</Badge>
                        <span className="text-sm text-slate-600">{day.hours}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {day.subjects.map((subject, idx) => (
                          <Badge key={idx} className="text-xs bg-blue-100 text-blue-700">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Manage Availability
              </CardTitle>
              <CardDescription>Set your preferred teaching hours and availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Your current availability settings are active and being used for schedule optimization.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <h4 className="mb-3">Current Availability</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm text-green-700">Monday</span>
                        <Badge className="bg-green-100 text-green-700">9:00 AM - 5:00 PM</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm text-green-700">Tuesday</span>
                        <Badge className="bg-green-100 text-green-700">9:00 AM - 5:00 PM</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <span className="text-sm text-yellow-700">Wednesday</span>
                        <Badge className="bg-yellow-100 text-yellow-700">9:00 AM - 2:00 PM</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm text-green-700">Thursday</span>
                        <Badge className="bg-green-100 text-green-700">9:00 AM - 5:00 PM</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm text-green-700">Friday</span>
                        <Badge className="bg-green-100 text-green-700">9:00 AM - 3:00 PM</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <span className="text-sm text-red-700">Saturday</span>
                        <Badge className="bg-red-100 text-red-700">Not Available</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Settings className="w-4 h-4 mr-2" />
                    Update Availability
                  </Button>
                  <Button variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Block Time Slots
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-600" />
                Recent Updates
              </CardTitle>
              <CardDescription>Schedule changes and important notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === 'success' ? 'bg-green-500' :
                      notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-slate-800">{notification.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                    </div>
                    {notification.type === 'warning' && (
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-1" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Export Schedule
                </Button>
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                  <Bell className="w-4 h-4 mr-2" />
                  Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}