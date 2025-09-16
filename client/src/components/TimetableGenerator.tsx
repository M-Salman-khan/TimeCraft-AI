import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Zap, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  BookOpen,
  Users,
  MapPin,
  Calendar,
  Settings
} from 'lucide-react';

export function TimetableGenerator() {
  const [generationStep, setGenerationStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  const programs = [
    'B.Ed. (Bachelor of Education)',
    'M.Ed. (Master of Education)',
    'FYUP (Four Year Undergraduate Programme)',
    'ITEP (Integrated Teacher Education Programme)'
  ];

  const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];

  const generateSteps = [
    { title: 'Data Validation', description: 'Checking course data, faculty availability, and room capacity', icon: CheckCircle },
    { title: 'Constraint Analysis', description: 'Analyzing NEP-2020 compliance and scheduling constraints', icon: Settings },
    { title: 'AI Optimization', description: 'Generating conflict-free schedule using intelligent algorithms', icon: Zap },
    { title: 'Conflict Resolution', description: 'Resolving any remaining scheduling conflicts', icon: AlertTriangle },
    { title: 'Final Validation', description: 'Ensuring schedule meets all requirements', icon: CheckCircle }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationStep(0);
    
    for (let i = 0; i <= 4; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGenerationStep(i + 1);
    }
    
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Program Selection
            </CardTitle>
            <CardDescription>Choose the program and semester for schedule generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-slate-600 mb-2 block">Program</label>
              <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a program" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map(program => (
                    <SelectItem key={program} value={program}>{program}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-slate-600 mb-2 block">Semester</label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map(semester => (
                    <SelectItem key={semester} value={semester}>{semester}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-green-600" />
              Generation Options
            </CardTitle>
            <CardDescription>Configure advanced scheduling parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="priority-core" defaultChecked />
                <label htmlFor="priority-core" className="text-sm">Prioritize core subjects</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="faculty-preference" defaultChecked />
                <label htmlFor="faculty-preference" className="text-sm">Consider faculty preferences</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="room-optimization" defaultChecked />
                <label htmlFor="room-optimization" className="text-sm">Optimize room utilization</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="nep-compliance" defaultChecked />
                <label htmlFor="nep-compliance" className="text-sm">Ensure NEP-2020 compliance</label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600">Faculty Data</p>
                <p className="text-lg text-green-800">Complete</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Room Data</p>
                <p className="text-lg text-blue-800">Complete</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-yellow-600">Course Data</p>
                <p className="text-lg text-yellow-800">Needs Update</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generation Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            AI Schedule Generator
          </CardTitle>
          <CardDescription>
            Generate optimized, conflict-free timetables using advanced AI algorithms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isGenerating && generationStep === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg text-slate-800 mb-2">Ready to Generate Schedule</h3>
              <p className="text-slate-600 mb-6">
                All systems ready. Click below to start generating your optimized timetable.
              </p>
              <Button 
                onClick={handleGenerate}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                disabled={!selectedProgram || !selectedSemester}
              >
                <Zap className="w-4 h-4 mr-2" />
                Generate Timetable
              </Button>
            </div>
          )}

          {isGenerating && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg text-slate-800 mb-2">Generating Schedule...</h3>
                <p className="text-slate-600">
                  AI is analyzing constraints and optimizing your timetable
                </p>
              </div>

              <Progress value={(generationStep / 5) * 100} className="h-2" />

              <div className="space-y-3">
                {generateSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index < generationStep;
                  const isCurrent = index === generationStep - 1;
                  
                  return (
                    <div key={index} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive ? 'bg-green-50' : isCurrent ? 'bg-blue-50' : 'bg-slate-50'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-green-100' : isCurrent ? 'bg-blue-100' : 'bg-slate-200'
                      }`}>
                        {isActive ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : isCurrent ? (
                          <Clock className="w-4 h-4 text-blue-600 animate-spin" />
                        ) : (
                          <Icon className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <p className={`text-sm ${isActive ? 'text-green-700' : isCurrent ? 'text-blue-700' : 'text-slate-600'}`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-slate-500">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!isGenerating && generationStep === 5 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg text-slate-800 mb-2">Schedule Generated Successfully!</h3>
              <p className="text-slate-600 mb-6">
                Your optimized timetable is ready with 0 conflicts detected.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Preview Schedule
                </Button>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                  <Upload className="w-4 h-4 mr-2" />
                  Publish Schedule
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}