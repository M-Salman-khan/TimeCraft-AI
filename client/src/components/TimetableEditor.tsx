import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Edit,
  Move,
  Save
} from 'lucide-react';

interface TimeSlot {
  id: string;
  time: string;
  subject: string;
  faculty: string;
  room: string;
  type: 'core' | 'elective' | 'lab' | 'practical';
  students: number;
}

interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

export function TimetableEditor() {
  const [selectedProgram, setSelectedProgram] = useState('bed-sem3');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [conflicts, setConflicts] = useState<string[]>([]);

  const mockSchedule: DaySchedule[] = [
    {
      day: 'Monday',
      slots: [
        { id: 'mon-1', time: '9:00-10:00', subject: 'Educational Psychology', faculty: 'Dr. Sharma', room: 'Room 101', type: 'core', students: 45 },
        { id: 'mon-2', time: '10:00-11:00', subject: 'Pedagogy of English', faculty: 'Prof. Kumar', room: 'Room 102', type: 'core', students: 40 },
        { id: 'mon-3', time: '11:30-12:30', subject: 'ICT Lab', faculty: 'Mr. Singh', room: 'Computer Lab', type: 'lab', students: 20 },
        { id: 'mon-4', time: '2:00-3:00', subject: 'Elective: Art Education', faculty: 'Ms. Gupta', room: 'Art Room', type: 'elective', students: 25 },
      ]
    },
    {
      day: 'Tuesday',
      slots: [
        { id: 'tue-1', time: '9:00-10:00', subject: 'Philosophy of Education', faculty: 'Dr. Patel', room: 'Room 103', type: 'core', students: 45 },
        { id: 'tue-2', time: '10:00-11:00', subject: 'Teaching Practice', faculty: 'Prof. Kumar', room: 'Room 101', type: 'practical', students: 45 },
        { id: 'tue-3', time: '11:30-12:30', subject: 'Mathematics Pedagogy', faculty: 'Dr. Reddy', room: 'Room 104', type: 'core', students: 30 },
      ]
    },
    {
      day: 'Wednesday',
      slots: [
        { id: 'wed-1', time: '9:00-10:00', subject: 'Child Development', faculty: 'Dr. Sharma', room: 'Room 101', type: 'core', students: 45 },
        { id: 'wed-2', time: '10:00-11:00', subject: 'Science Laboratory', faculty: 'Prof. Verma', room: 'Science Lab', type: 'lab', students: 20 },
        { id: 'wed-3', time: '11:30-12:30', subject: 'Elective: Music Education', faculty: 'Ms. Joshi', room: 'Music Room', type: 'elective', students: 15 },
      ]
    },
    {
      day: 'Thursday',
      slots: [
        { id: 'thu-1', time: '9:00-10:00', subject: 'Assessment & Evaluation', faculty: 'Dr. Patel', room: 'Room 103', type: 'core', students: 45 },
        { id: 'thu-2', time: '10:00-11:00', subject: 'Language Across Curriculum', faculty: 'Prof. Kumar', room: 'Room 102', type: 'core', students: 40 },
      ]
    },
    {
      day: 'Friday',
      slots: [
        { id: 'fri-1', time: '9:00-10:00', subject: 'School Experience', faculty: 'All Faculty', room: 'Various Schools', type: 'practical', students: 45 },
      ]
    }
  ];

  const getTypeColor = (type: TimeSlot['type']) => {
    switch (type) {
      case 'core': return 'bg-blue-100 text-blue-800';
      case 'elective': return 'bg-green-100 text-green-800';
      case 'lab': return 'bg-purple-100 text-purple-800';
      case 'practical': return 'bg-orange-100 text-orange-800';
    }
  };

  const getTypeIcon = (type: TimeSlot['type']) => {
    switch (type) {
      case 'core': return <BookOpen className="w-3 h-3" />;
      case 'elective': return <Users className="w-3 h-3" />;
      case 'lab': return <MapPin className="w-3 h-3" />;
      case 'practical': return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl text-slate-800">Timetable Editor</h2>
          <p className="text-sm text-slate-600">Drag and drop to reorganize, click to edit details</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedProgram} onValueChange={setSelectedProgram}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bed-sem3">B.Ed. Semester 3</SelectItem>
              <SelectItem value="med-sem1">M.Ed. Semester 1</SelectItem>
              <SelectItem value="fyup-y2">FYUP Year 2</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-green-600 hover:bg-green-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Conflicts Alert */}
      {conflicts.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            {conflicts.length} scheduling conflict{conflicts.length > 1 ? 's' : ''} detected. Click on highlighted slots to resolve.
          </AlertDescription>
        </Alert>
      )}

      {/* Schedule Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Weekly Schedule - B.Ed. Semester 3
          </CardTitle>
          <CardDescription>
            Drag slots to move, click to edit details. Red border indicates conflicts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-6 gap-4 mb-4">
                <div className="text-sm text-slate-500 p-2">Time</div>
                {mockSchedule.map(day => (
                  <div key={day.day} className="text-sm text-slate-700 p-2 bg-slate-50 rounded-lg text-center">
                    {day.day}
                  </div>
                ))}
              </div>

              {/* Time slots grid */}
              <div className="space-y-2">
                {['9:00-10:00', '10:00-11:00', '11:30-12:30', '2:00-3:00'].map(timeSlot => (
                  <div key={timeSlot} className="grid grid-cols-6 gap-4 min-h-[80px]">
                    <div className="text-sm text-slate-600 p-2 bg-slate-50 rounded-lg flex items-center">
                      {timeSlot}
                    </div>
                    {mockSchedule.map(day => {
                      const slot = day.slots.find(s => s.time === timeSlot);
                      return (
                        <div key={`${day.day}-${timeSlot}`} className="relative">
                          {slot ? (
                            <div 
                              className={`p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                                selectedSlot === slot.id ? 'border-blue-400 shadow-lg' : 'border-transparent'
                              }`}
                              style={{ backgroundColor: slot.type === 'core' ? '#f0f8ff' : 
                                                    slot.type === 'elective' ? '#f0fff4' :
                                                    slot.type === 'lab' ? '#faf0ff' : '#fffaf0' }}
                              onClick={() => setSelectedSlot(slot.id)}
                            >
                              <div className="flex items-start justify-between mb-1">
                                <Badge className={`text-xs ${getTypeColor(slot.type)}`}>
                                  <span className="flex items-center gap-1">
                                    {getTypeIcon(slot.type)}
                                    {slot.type}
                                  </span>
                                </Badge>
                                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-white/50">
                                  <Edit className="w-3 h-3" />
                                </Button>
                              </div>
                              <h4 className="text-sm text-slate-800 mb-1">{slot.subject}</h4>
                              <div className="text-xs text-slate-600 space-y-0.5">
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {slot.faculty}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {slot.room}
                                </div>
                                <div className="text-slate-500">
                                  {slot.students} students
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="h-full border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer">
                              <span className="text-xs">Drop here</span>
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

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 rounded border"></div>
              <span className="text-sm text-slate-600">Core Subjects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 rounded border"></div>
              <span className="text-sm text-slate-600">Electives</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 rounded border"></div>
              <span className="text-sm text-slate-600">Laboratory</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-100 rounded border"></div>
              <span className="text-sm text-slate-600">Practical</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-blue-600 mb-1">18</div>
            <div className="text-sm text-slate-600">Total Classes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-green-600 mb-1">0</div>
            <div className="text-sm text-slate-600">Conflicts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-purple-600 mb-1">8</div>
            <div className="text-sm text-slate-600">Faculty Used</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-orange-600 mb-1">12</div>
            <div className="text-sm text-slate-600">Rooms Used</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}