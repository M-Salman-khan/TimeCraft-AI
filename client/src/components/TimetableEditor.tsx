import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  BookOpen,
  AlertTriangle,
  Edit,
  Save,
  Trash2,
  RotateCcw,
  Plus,
  GripVertical,
  Eye,
  EyeOff,
  Zap
} from 'lucide-react';

interface TimeSlot {
  id: string;
  time: string;
  subject: string;
  faculty: string;
  room: string;
  type: 'core' | 'elective' | 'lab' | 'practical';
  students: number;
  notes?: string;
  capacity?: number;
}

interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

interface ConflictInfo {
  id: string;
  type: 'faculty' | 'room' | 'capacity';
  message: string;
  affectedSlots: string[];
}

export function TimetableEditor() {
  const [selectedProgram, setSelectedProgram] = useState('bed-sem3');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [draggedSlot, setDraggedSlot] = useState<TimeSlot | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null);
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  const [conflicts, setConflicts] = useState<ConflictInfo[]>([]);
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    {
      day: 'Monday',
      slots: [
        { id: 'mon-1', time: '9:00-10:00', subject: 'Educational Psychology', faculty: 'Dr. Sharma', room: 'Room 101', type: 'core', students: 55, capacity: 50 },
        { id: 'mon-2', time: '9:00-10:00', subject: 'Pedagogy of English', faculty: 'Dr. Sharma', room: 'Room 101', type: 'core', students: 40, capacity: 45 },
        { id: 'mon-3', time: '11:30-12:30', subject: 'ICT Lab', faculty: 'Mr. Singh', room: 'Computer Lab', type: 'lab', students: 20, capacity: 25 },
        { id: 'mon-4', time: '2:00-3:00', subject: 'Elective: Art Education', faculty: 'Ms. Gupta', room: 'Art Room', type: 'elective', students: 25, capacity: 30 },
      ]
    },
    {
      day: 'Tuesday',
      slots: [
        { id: 'tue-1', time: '9:00-10:00', subject: 'Philosophy of Education', faculty: 'Dr. Patel', room: 'Room 103', type: 'core', students: 45, capacity: 50 },
        { id: 'tue-2', time: '10:00-11:00', subject: 'Teaching Practice', faculty: 'Prof. Kumar', room: 'Room 101', type: 'practical', students: 45, capacity: 50 },
        { id: 'tue-3', time: '11:30-12:30', subject: 'Mathematics Pedagogy', faculty: 'Dr. Reddy', room: 'Room 104', type: 'core', students: 30, capacity: 35 },
      ]
    },
    {
      day: 'Wednesday',
      slots: [
        { id: 'wed-1', time: '9:00-10:00', subject: 'Child Development', faculty: 'Dr. Sharma', room: 'Room 101', type: 'core', students: 45, capacity: 50 },
        { id: 'wed-2', time: '10:00-11:00', subject: 'Science Laboratory', faculty: 'Prof. Verma', room: 'Science Lab', type: 'lab', students: 20, capacity: 24 },
        { id: 'wed-3', time: '11:30-12:30', subject: 'Elective: Music Education', faculty: 'Ms. Joshi', room: 'Music Room', type: 'elective', students: 15, capacity: 20 },
      ]
    },
    {
      day: 'Thursday',
      slots: [
        { id: 'thu-1', time: '9:00-10:00', subject: 'Assessment & Evaluation', faculty: 'Dr. Patel', room: 'Room 103', type: 'core', students: 45, capacity: 50 },
        { id: 'thu-2', time: '10:00-11:00', subject: 'Language Across Curriculum', faculty: 'Prof. Kumar', room: 'Room 102', type: 'core', students: 40, capacity: 45 },
      ]
    },
    {
      day: 'Friday',
      slots: [
        { id: 'fri-1', time: '9:00-10:00', subject: 'School Experience', faculty: 'All Faculty', room: 'Various Schools', type: 'practical', students: 45, capacity: 50 },
      ]
    }
  ]);

  const [history, setHistory] = useState<DaySchedule[][]>([]);
  const [showConflictsOnly, setShowConflictsOnly] = useState(false);
  const [isAutoOptimizing, setIsAutoOptimizing] = useState(false);

  const timeSlots = ['9:00-10:00', '10:00-11:00', '11:30-12:30', '2:00-3:00', '3:00-4:00'];

  const getTypeColor = (type: TimeSlot['type']) => {
    switch (type) {
      case 'core': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'elective': return 'bg-green-100 text-green-800 border-green-200';
      case 'lab': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'practical': return 'bg-orange-100 text-orange-800 border-orange-200';
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

  // Deep clone schedule to preserve reliable history snapshots
  const cloneSchedule = (s: DaySchedule[]): DaySchedule[] =>
    s.map(day => ({ day: day.day, slots: day.slots.map(slot => ({ ...slot })) }));

  const isSlotConflicted = (slotId: string) => {
    return conflicts.some(conflict => conflict.affectedSlots.includes(slotId));
  };

  const getConflictInfo = (slotId: string) => {
    return conflicts.find(conflict => conflict.affectedSlots.includes(slotId));
  };

  const handleDragStart = (e: React.DragEvent, slot: TimeSlot) => {
    setDraggedSlot(slot);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', slot.id);
  };

  const handleDragOver = (e: React.DragEvent, targetDay: string, targetTime: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverSlot(`${targetDay}-${targetTime}`);
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e: React.DragEvent, targetDay: string, targetTime: string) => {
    e.preventDefault();
    setDragOverSlot(null);

    if (!draggedSlot) return;

    // Save current state to history (deep clone)
    setHistory(prev => [...prev, cloneSchedule(schedule)]);

    const sourceDayIndex = schedule.findIndex(d => d.slots.some(s => s.id === draggedSlot.id));
    const targetDayIndex = schedule.findIndex(d => d.day === targetDay);
    if (sourceDayIndex === -1 || targetDayIndex === -1) {
      setDraggedSlot(null);
      return;
    }

    const newSchedule = cloneSchedule(schedule);
    const sourceDay = newSchedule[sourceDayIndex];
    const targetDayRef = newSchedule[targetDayIndex];

    const sourceSlotIndex = sourceDay.slots.findIndex(s => s.id === draggedSlot.id);
    const sourceSlot = sourceDay.slots[sourceSlotIndex];
    const targetSlotIndex = targetDayRef.slots.findIndex(s => s.time === targetTime);
    const targetSlot = targetSlotIndex >= 0 ? targetDayRef.slots[targetSlotIndex] : null;

    // No-op if dropping onto the same slot
    if (targetSlot && targetSlot.id === draggedSlot.id) {
      setDraggedSlot(null);
      return;
    }

    if (!targetSlot) {
      // Move
      sourceDay.slots.splice(sourceSlotIndex, 1);
      targetDayRef.slots.push({ ...sourceSlot, time: targetTime });
      setSchedule(newSchedule);
      setDraggedSlot(null);
      toast.success('Class moved successfully');
      return;
    }

    // Swap
    if (sourceDayIndex === targetDayIndex) {
      // Same day: swap times
      const tmp = sourceSlot.time;
      sourceDay.slots[sourceSlotIndex] = { ...sourceSlot, time: targetSlot.time };
      targetDayRef.slots[targetSlotIndex] = { ...targetSlot, time: tmp };
    } else {
      // Different days: swap positions and times
      sourceDay.slots.splice(sourceSlotIndex, 1);
      targetDayRef.slots.splice(targetSlotIndex, 1);
      targetDayRef.slots.push({ ...sourceSlot, time: targetTime });
      newSchedule[sourceDayIndex].slots.push({ ...targetSlot, time: sourceSlot.time });
    }

    setSchedule(newSchedule);
    setDraggedSlot(null);
    toast.success('Classes swapped successfully');
  };

  const checkForConflicts = (currentSchedule: DaySchedule[]) => {
    const newConflicts: ConflictInfo[] = [];

    // Faculty and Room groupings by day+time
    const byFaculty: Record<string, { day: string; time: string; id: string }[]> = {};
    const byRoom: Record<string, { day: string; time: string; id: string }[]> = {};

    currentSchedule.forEach((day) => {
      day.slots.forEach((slot) => {
        const f = slot.faculty;
        if (!byFaculty[f]) byFaculty[f] = [];
        byFaculty[f].push({ day: day.day, time: slot.time, id: slot.id });

        const r = slot.room;
        if (!byRoom[r]) byRoom[r] = [];
        byRoom[r].push({ day: day.day, time: slot.time, id: slot.id });

        // Capacity overflow
        if (typeof slot.capacity === 'number' && slot.students > slot.capacity) {
          newConflicts.push({
            id: `capacity-${slot.id}`,
            type: 'capacity',
            message: `Capacity exceeded in ${slot.room} (${slot.students}/${slot.capacity})`,
            affectedSlots: [slot.id],
          });
        }
      });
    });

    const groupByTime = (entries: { day: string; time: string; id: string }[]) => {
      const map: Record<string, string[]> = {};
      entries.forEach((e) => {
        const key = `${e.day}-${e.time}`;
        if (!map[key]) map[key] = [];
        map[key].push(e.id);
      });
      return map;
    };

    // Faculty conflicts
    Object.entries(byFaculty).forEach(([faculty, entries]) => {
      const groups = groupByTime(entries);
      Object.entries(groups).forEach(([key, ids]) => {
        if (ids.length > 1) {
          newConflicts.push({
            id: `faculty-${faculty}-${key}`,
            type: 'faculty',
            message: `${faculty} has overlapping classes at the same time`,
            affectedSlots: ids,
          });
        }
      });
    });

    // Room conflicts
    Object.entries(byRoom).forEach(([room, entries]) => {
      const groups = groupByTime(entries);
      Object.entries(groups).forEach(([key, ids]) => {
        if (ids.length > 1) {
          newConflicts.push({
            id: `room-${room}-${key}`,
            type: 'room',
            message: `Room ${room} is double-booked at the same time`,
            affectedSlots: ids,
          });
        }
      });
    });

    setConflicts(newConflicts);
  };

  // Previous conflict count for notifications
  const prevConflictCountRef = useRef<number>(0);

  // Recompute conflicts automatically on schedule change
  useEffect(() => {
    checkForConflicts(schedule);
  }, [schedule]);

  // Notify user when conflicts appear/disappear
  useEffect(() => {
    const prev = prevConflictCountRef.current;
    const curr = conflicts.length;
    if (curr > 0 && curr !== prev) {
      toast.warning(`${curr} conflict${curr > 1 ? 's' : ''} detected`);
    }
    if (prev > 0 && curr === 0) {
      toast.success('All conflicts resolved');
    }
    prevConflictCountRef.current = curr;
  }, [conflicts]);

  const handleSlotEdit = (slot: TimeSlot) => {
    setEditingSlot({ ...slot });
  };

  const handleSaveEdit = () => {
    if (!editingSlot) return;

    // Save current to history
    setHistory(prev => [...prev, cloneSchedule(schedule)]);

    const newSchedule = schedule.map(day => ({
      ...day,
      slots: day.slots.map(slot =>
        slot.id === editingSlot.id ? editingSlot : slot
      )
    }));

    setSchedule(newSchedule);
    setEditingSlot(null);
    toast.success('Class updated successfully');
  };

  const handleDeleteSlot = (slotId: string) => {
    setHistory(prev => [...prev, cloneSchedule(schedule)]);

    const newSchedule = schedule.map(day => ({
      ...day,
      slots: day.slots.filter(slot => slot.id !== slotId)
    }));

    setSchedule(newSchedule);
    toast.success('Class deleted successfully');
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const previousState = history[history.length - 1];
    setSchedule(previousState);
    setHistory(prev => prev.slice(0, -1));
    toast.success('Action undone');
  };

  const handleAutoOptimize = async () => {
    setIsAutoOptimizing(true);
    toast.info('AI is optimizing your schedule...');

    // Simulate AI optimization
    setTimeout(() => {
      setConflicts([]);
      setIsAutoOptimizing(false);
      toast.success('Schedule optimized! All conflicts resolved.');
    }, 3000);
  };

  const getTotalStats = () => {
    const totalClasses = schedule.reduce((sum, day) => sum + day.slots.length, 0);
    const facultySet = new Set(schedule.flatMap(day => day.slots.map(slot => slot.faculty)));
    const roomSet = new Set(schedule.flatMap(day => day.slots.map(slot => slot.room)));

    return {
      totalClasses,
      conflicts: conflicts.length,
      faculty: facultySet.size,
      rooms: roomSet.size
    };
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl text-slate-800">Interactive Timetable Editor</h2>
          <p className="text-sm text-slate-600">Drag classes to move, click to edit details, or use AI to optimize</p>
        </div>
        <div className="flex gap-2 flex-wrap">
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

          <Button
            variant="outline"
            onClick={() => setShowConflictsOnly(!showConflictsOnly)}
            className={showConflictsOnly ? 'bg-red-50 border-red-200' : ''}
          >
            {showConflictsOnly ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showConflictsOnly ? 'Show All' : 'Conflicts Only'}
          </Button>

          <Button variant="outline" onClick={handleUndo} disabled={history.length === 0}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Undo
          </Button>

          <Button
            variant="outline"
            onClick={handleAutoOptimize}
            disabled={isAutoOptimizing || conflicts.length === 0}
            className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200"
          >
            <Zap className="w-4 h-4 mr-2" />
            {isAutoOptimizing ? 'Optimizing...' : 'AI Optimize'}
          </Button>

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
            <div className="space-y-1">
              <p className="font-medium">{conflicts.length} scheduling conflict{conflicts.length > 1 ? 's' : ''} detected:</p>
              {conflicts.map(conflict => (
                <p key={conflict.id} className="text-sm">• {conflict.message}</p>
              ))}
            </div>
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
            Drag classes to move them, click the edit button to modify details, or drop zones to add new classes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header row */}
              <div className="grid grid-cols-6 gap-4 mb-4">
                <div className="text-sm text-slate-500 p-3 bg-slate-100 rounded-lg text-center">
                  Time Slots
                </div>
                {schedule.map(day => (
                  <div key={day.day} className="text-sm text-slate-700 p-3 bg-slate-50 rounded-lg text-center font-medium">
                    {day.day}
                    <div className="text-xs text-slate-500 mt-1">
                      {day.slots.length} class{day.slots.length !== 1 ? 'es' : ''}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time slots grid */}
              <div className="space-y-3">
                {timeSlots.map(timeSlot => (
                  <div key={timeSlot} className="grid grid-cols-6 gap-4 min-h-[100px]">
                    <div className="text-sm text-slate-600 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg flex items-center justify-center border">
                      <div className="text-center">
                        <div className="font-medium">{timeSlot}</div>
                        <div className="text-xs text-slate-500 mt-1">
                          {timeSlot.split('-')[1]} duration
                        </div>
                      </div>
                    </div>

                    {schedule.map(day => {
                      const slot = day.slots.find(s => s.time === timeSlot);
                      const isConflicted = slot ? isSlotConflicted(slot.id) : false;
                      const conflictInfo = slot ? getConflictInfo(slot.id) : null;
                      const isDragOver = dragOverSlot === `${day.day}-${timeSlot}`;

                      if (showConflictsOnly && slot && !isConflicted) {
                        return (
                          <div key={`${day.day}-${timeSlot}`} className="relative opacity-20">
                            <div className="h-full bg-slate-50 rounded-lg flex items-center justify-center">
                              <span className="text-xs text-slate-400">Hidden</span>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={`${day.day}-${timeSlot}`}
                          className="relative"
                          onDragOver={(e) => handleDragOver(e, day.day, timeSlot)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, day.day, timeSlot)}
                        >
                          {slot ? (
                            <div
                              draggable
                              onDragStart={(e) => handleDragStart(e, slot)}
                              className={`p-3 rounded-lg border-2 cursor-move transition-all hover:shadow-lg group ${selectedSlot === slot.id ? 'ring-2 ring-blue-400 ring-offset-2' : ''
                                } ${isConflicted ? 'border-red-400 bg-red-50' : 'border-transparent'
                                } ${draggedSlot?.id === slot.id ? 'opacity-50 scale-95' : ''
                                }`}
                              style={{
                                backgroundColor: isConflicted ? '#fef2f2' :
                                  slot.type === 'core' ? '#f0f8ff' :
                                    slot.type === 'elective' ? '#f0fff4' :
                                      slot.type === 'lab' ? '#faf0ff' : '#fffaf0'
                              }}
                              onClick={() => setSelectedSlot(prev => (prev === slot.id ? null : slot.id))}
                            >
                              {/* Drag handle */}
                              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <GripVertical className="w-4 h-4 text-slate-400" />
                              </div>

                              {/* Conflict indicator */}
                              {isConflicted && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                  <AlertTriangle className="w-2 h-2 text-white" />
                                </div>
                              )}

                              <div className="flex items-start justify-between mb-2">
                                <Badge className={`text-xs ${getTypeColor(slot.type)}`}>
                                  <span className="flex items-center gap-1">
                                    {getTypeIcon(slot.type)}
                                    {slot.type}
                                  </span>
                                </Badge>

                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0 hover:bg-white/80"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSlotEdit(slot);
                                    }}
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>

                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0 hover:bg-red-100"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteSlot(slot.id);
                                    }}
                                  >
                                    <Trash2 className="w-3 h-3 text-red-500" />
                                  </Button>
                                </div>
                              </div>

                              <h4 className="text-sm text-slate-800 mb-2 font-medium line-clamp-2">
                                {slot.subject}
                              </h4>

                              <div className="text-xs text-slate-600 space-y-1">
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3 flex-shrink-0" />
                                  <span className="truncate">{slot.faculty}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 flex-shrink-0" />
                                  <span className="truncate">{slot.room}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-slate-500">{slot.students} students</span>
                                  {slot.capacity && (
                                    <span className={`text-xs px-1 rounded ${slot.students > (slot.capacity * 0.9) ? 'bg-red-100 text-red-600' :
                                        slot.students > (slot.capacity * 0.75) ? 'bg-yellow-100 text-yellow-600' :
                                          'bg-green-100 text-green-600'
                                      }`}>
                                      {Math.round((slot.students / slot.capacity) * 100)}%
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Conflict tooltip */}
                              {isConflicted && conflictInfo && (
                                <div className="absolute bottom-full left-0 mb-2 p-2 bg-red-600 text-white text-xs rounded shadow-lg z-10 max-w-48">
                                  {conflictInfo.message}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div
                              className={`h-full border-2 border-dashed rounded-lg flex items-center justify-center text-slate-400 transition-all ${isDragOver
                                  ? 'border-blue-400 bg-blue-50 text-blue-600'
                                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                }`}
                            >
                              <div className="text-center">
                                <Plus className="w-4 h-4 mx-auto mb-1" />
                                <span className="text-xs">
                                  {isDragOver ? 'Drop here' : 'Add class'}
                                </span>
                              </div>
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

      {/* Edit Dialog */}
      {editingSlot && (
        <Dialog open={!!editingSlot} onOpenChange={(open) => !open && setEditingSlot(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Class Details</DialogTitle>
              <DialogDescription>
                Modify the class information and settings
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={editingSlot.subject}
                    onChange={(e) => setEditingSlot({ ...editingSlot, subject: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="faculty">Faculty</Label>
                  <Input
                    id="faculty"
                    value={editingSlot.faculty}
                    onChange={(e) => setEditingSlot({ ...editingSlot, faculty: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="room">Room</Label>
                  <Input
                    id="room"
                    value={editingSlot.room}
                    onChange={(e) => setEditingSlot({ ...editingSlot, room: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={editingSlot.type}
                    onValueChange={(value: TimeSlot['type']) => setEditingSlot({ ...editingSlot, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="core">Core Subject</SelectItem>
                      <SelectItem value="elective">Elective</SelectItem>
                      <SelectItem value="lab">Laboratory</SelectItem>
                      <SelectItem value="practical">Practical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="students">Number of Students</Label>
                  <Input
                    id="students"
                    type="number"
                    value={editingSlot.students}
                    onChange={(e) => setEditingSlot({ ...editingSlot, students: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <Label htmlFor="capacity">Room Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={editingSlot.capacity || ''}
                    onChange={(e) => setEditingSlot({ ...editingSlot, capacity: parseInt(e.target.value) || undefined })}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={editingSlot.notes || ''}
                onChange={(e) => setEditingSlot({ ...editingSlot, notes: e.target.value })}
                placeholder="Additional notes or requirements..."
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setEditingSlot(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-blue-600 mb-1">{stats.totalClasses}</div>
            <div className="text-sm text-blue-600">Total Classes</div>
          </CardContent>
        </Card>
        <Card className={`${stats.conflicts > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <CardContent className="p-4 text-center">
            <div className={`text-2xl mb-1 ${stats.conflicts > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {stats.conflicts}
            </div>
            <div className={`text-sm ${stats.conflicts > 0 ? 'text-red-600' : 'text-green-600'}`}>
              Conflicts
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-purple-600 mb-1">{stats.faculty}</div>
            <div className="text-sm text-purple-600">Faculty Used</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-orange-600 mb-1">{stats.rooms}</div>
            <div className="text-sm text-orange-600">Rooms Used</div>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Legend & Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm mb-3">Class Types</h4>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-100 rounded border border-blue-200"></div>
                  <span className="text-sm text-slate-600">Core Subjects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 rounded border border-green-200"></div>
                  <span className="text-sm text-slate-600">Electives</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-100 rounded border border-purple-200"></div>
                  <span className="text-sm text-slate-600">Laboratory</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-100 rounded border border-orange-200"></div>
                  <span className="text-sm text-slate-600">Practical</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm mb-3">Interaction Guide</h4>
              <div className="text-xs text-slate-600 space-y-1">
                <p>• <strong>Drag</strong> classes to move them between time slots</p>
                <p>• <strong>Click</strong> to select a class for detailed view</p>
                <p>• <strong>Edit button</strong> to modify class details</p>
                <p>• <strong>Red border</strong> indicates scheduling conflicts</p>
                <p>• <strong>Green/Yellow/Red %</strong> shows room capacity utilization</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}