import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  Download,
  AlertTriangle,
  CheckCircle
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

interface ScheduleSlot {
  id: string;
  day: string;
  time: string;
  subject: string;
  room: string;
  students: number;
  type: 'lecture' | 'practical' | 'tutorial';
  isConflicted: boolean;
}

interface FacultyScheduleViewProps {
  faculty: Faculty;
  onClose: () => void;
}

export function FacultyScheduleView({ faculty, onClose }: FacultyScheduleViewProps) {
  const [selectedWeek, setSelectedWeek] = useState('current');
//   const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  // Mock schedule data
  const scheduleSlots: ScheduleSlot[] = [
    {
      id: '1',
      day: 'Monday',
      time: '9:00-10:00',
      subject: faculty.subjects[0] || 'Subject 1',
      room: 'Room 101',
      students: 45,
      type: 'lecture',
      isConflicted: false
    },
    {
      id: '2',
      day: 'Monday',
      time: '11:00-12:00',
      subject: faculty.subjects[1] || 'Subject 2',
      room: 'Room 102',
      students: 40,
      type: 'practical',
      isConflicted: true
    },
    {
      id: '3',
      day: 'Tuesday',
      time: '10:00-11:00',
      subject: faculty.subjects[0] || 'Subject 1',
      room: 'Room 103',
      students: 42,
      type: 'tutorial',
      isConflicted: false
    },
    {
      id: '4',
      day: 'Wednesday',
      time: '2:00-3:00',
      subject: faculty.subjects[2] || 'Subject 3',
      room: 'Room 104',
      students: 38,
      type: 'lecture',
      isConflicted: false
    },
    {
      id: '5',
      day: 'Thursday',
      time: '9:00-10:00',
      subject: faculty.subjects[1] || 'Subject 2',
      room: 'Lab 1',
      students: 25,
      type: 'practical',
      isConflicted: false
    },
    {
      id: '6',
      day: 'Friday',
      time: '11:00-12:00',
      subject: faculty.subjects[0] || 'Subject 1',
      room: 'Room 105',
      students: 35,
      type: 'lecture',
      isConflicted: false
    }
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00',
    '1:00-2:00', '2:00-3:00', '3:00-4:00', '4:00-5:00'
  ];

  const getTypeColor = (type: ScheduleSlot['type']) => {
    switch (type) {
      case 'lecture': return 'bg-blue-100 text-blue-800';
      case 'practical': return 'bg-green-100 text-green-800';
      case 'tutorial': return 'bg-purple-100 text-purple-800';
    }
  };

  const getScheduleForDayAndTime = (day: string, time: string) => {
    return scheduleSlots.find(slot => slot.day === day && slot.time === time);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onClose}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500">
              <AvatarFallback className="text-white">
                {faculty.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl text-slate-800">{faculty.name}</h2>
              <p className="text-sm text-slate-600">{faculty.department} Department • {faculty.experience} years exp.</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Week</SelectItem>
              <SelectItem value="next">Next Week</SelectItem>
              <SelectItem value="previous">Previous Week</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Total Hours</p>
                <p className="text-lg text-blue-800">{faculty.workload}h</p>
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
                <p className="text-sm text-green-600">Active Classes</p>
                <p className="text-lg text-green-800">{faculty.activeSchedules}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${faculty.conflictedSchedules > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${faculty.conflictedSchedules > 0 ? 'bg-red-100' : 'bg-green-100'}`}>
                {faculty.conflictedSchedules > 0 ? 
                  <AlertTriangle className="w-4 h-4 text-red-600" /> : 
                  <CheckCircle className="w-4 h-4 text-green-600" />
                }
              </div>
              <div>
                <p className={`text-sm ${faculty.conflictedSchedules > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  Conflicts
                </p>
                <p className={`text-lg ${faculty.conflictedSchedules > 0 ? 'text-red-800' : 'text-green-800'}`}>
                  {faculty.conflictedSchedules || 'None'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Total Students</p>
                <p className="text-lg text-purple-800">
                  {scheduleSlots.reduce((sum, slot) => sum + slot.students, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Weekly Schedule
          </CardTitle>
          <CardDescription>
            Current teaching schedule for {faculty.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="grid grid-cols-6 gap-2 mb-4">
                {days.map(day => (
                  <div key={day} className="p-3 bg-slate-50 rounded-lg text-center">
                    <div className="text-sm text-slate-800">{day}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      {scheduleSlots.filter(slot => slot.day === day).length} classes
                    </div>
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                {timeSlots.map(time => (
                  <div key={time} className="grid grid-cols-6 gap-2">
                    {days.map(day => {
                      const slot = getScheduleForDayAndTime(day, time);
                      return (
                        <div key={`${day}-${time}`} className="min-h-[80px] border border-slate-200 rounded-lg p-2">
                          {slot ? (
                            <div className={`h-full rounded p-2 ${slot.isConflicted ? 'bg-red-100 border-red-300' : 'bg-blue-50 border-blue-200'} border`}>
                              <div className="flex items-start justify-between mb-1">
                                <Badge className={getTypeColor(slot.type)}>
                                  {slot.type}
                                </Badge>
                                {slot.isConflicted && (
                                  <AlertTriangle className="w-3 h-3 text-red-600" />
                                )}
                              </div>
                              <div className="text-xs">
                                <div className="text-slate-800 truncate mb-1">{slot.subject}</div>
                                <div className="flex items-center gap-1 text-slate-600">
                                  <MapPin className="w-3 h-3" />
                                  <span className="truncate">{slot.room}</span>
                                </div>
                                <div className="flex items-center gap-1 text-slate-600 mt-1">
                                  <Users className="w-3 h-3" />
                                  <span>{slot.students}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-slate-400 text-xs">
                              <span className="hidden sm:block">{time}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Classes */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Classes</CardTitle>
          <CardDescription>Next classes scheduled for this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduleSlots.slice(0, 4).map(slot => (
              <div key={slot.id} className="flex items-center gap-4 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex-shrink-0">
                  <Badge className={getTypeColor(slot.type)}>
                    {slot.type}
                  </Badge>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-800">{slot.subject}</span>
                    {slot.isConflicted && (
                      <Badge className="bg-red-100 text-red-700">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Conflict
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    {slot.day} • {slot.time} • {slot.room} • {slot.students} students
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}