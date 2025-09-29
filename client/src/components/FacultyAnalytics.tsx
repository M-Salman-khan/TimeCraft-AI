import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  BarChart3,
  Clock,
  Users,
  BookOpen,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Activity,
  Download
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

interface AnalyticsData {
  performanceScore: number;
  efficiency: number;
  studentSatisfaction: number;
  classUtilization: number;
  punctuality: number;
  weeklyTrend: number[];
  monthlyComparison: { month: string; hours: number; }[];
  subjectDistribution: { subject: string; hours: number; students: number; }[];
}

interface FacultyAnalyticsProps {
  faculty: Faculty;
  onClose: () => void;
}

export function FacultyAnalytics({ faculty, onClose }: FacultyAnalyticsProps) {
  const [timeRange, setTimeRange] = useState('3months');
  // const [metricView, setMetricView] = useState('overview');

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    performanceScore: 87,
    efficiency: 92,
    studentSatisfaction: 85,
    classUtilization: 89,
    punctuality: 96,
    weeklyTrend: [85, 87, 89, 91, 88, 90, 92],
    monthlyComparison: [
      { month: 'Jan', hours: 78 },
      { month: 'Feb', hours: 82 },
      { month: 'Mar', hours: 85 },
      { month: 'Apr', hours: 88 },
      { month: 'May', hours: 90 },
      { month: 'Jun', hours: 87 }
    ],
    subjectDistribution: faculty.subjects.map((subject) => ({
      subject,
      hours: Math.floor(Math.random() * 20) + 10,
      students: Math.floor(Math.random() * 30) + 20
    }))
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 75) return 'bg-yellow-100';
    return 'bg-red-100';
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
              <h2 className="text-xl text-slate-800">{faculty.name} - Analytics</h2>
              <p className="text-sm text-slate-600">{faculty.department} Department • Performance Overview</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className={`${getScoreBgColor(analyticsData.performanceScore)} border-2`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4 text-slate-700" />
              </div>
              <div>
                <p className="text-sm text-slate-700">Performance</p>
                <p className={`text-lg ${getScoreColor(analyticsData.performanceScore)}`}>
                  {analyticsData.performanceScore}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${getScoreBgColor(analyticsData.efficiency)} border-2`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-slate-700" />
              </div>
              <div>
                <p className="text-sm text-slate-700">Efficiency</p>
                <p className={`text-lg ${getScoreColor(analyticsData.efficiency)}`}>
                  {analyticsData.efficiency}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${getScoreBgColor(analyticsData.studentSatisfaction)} border-2`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-slate-700" />
              </div>
              <div>
                <p className="text-sm text-slate-700">Student Rating</p>
                <p className={`text-lg ${getScoreColor(analyticsData.studentSatisfaction)}`}>
                  {analyticsData.studentSatisfaction}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${getScoreBgColor(analyticsData.classUtilization)} border-2`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-slate-700" />
              </div>
              <div>
                <p className="text-sm text-slate-700">Utilization</p>
                <p className={`text-lg ${getScoreColor(analyticsData.classUtilization)}`}>
                  {analyticsData.classUtilization}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${getScoreBgColor(analyticsData.punctuality)} border-2`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-slate-700" />
              </div>
              <div>
                <p className="text-sm text-slate-700">Punctuality</p>
                <p className={`text-lg ${getScoreColor(analyticsData.punctuality)}`}>
                  {analyticsData.punctuality}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workload Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Workload Distribution
            </CardTitle>
            <CardDescription>Current vs. optimal workload allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Current Workload</span>
                  <span className="text-sm text-slate-800">{faculty.workload}/{faculty.maxWorkload} hours</span>
                </div>
                <Progress value={(faculty.workload / faculty.maxWorkload) * 100} className="h-3" />
                <div className="text-xs text-slate-500 mt-1">
                  {Math.round((faculty.workload / faculty.maxWorkload) * 100)}% of maximum capacity
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="text-center">
                  <div className="text-2xl text-blue-600">{faculty.activeSchedules}</div>
                  <div className="text-sm text-slate-600">Active Classes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-green-600">{faculty.totalCourses}</div>
                  <div className="text-sm text-slate-600">Total Courses</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Performance Trends
            </CardTitle>
            <CardDescription>Weekly performance trend over last 7 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.weeklyTrend.map((score, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-16 text-sm text-slate-600">Week {index + 1}</div>
                  <div className="flex-1 bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <div className="w-12 text-sm text-slate-800">{score}%</div>
                  {index > 0 && (
                    <div className="w-8">
                      {score > analyticsData.weeklyTrend[index - 1] ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : score < analyticsData.weeklyTrend[index - 1] ? (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            Subject-wise Analysis
          </CardTitle>
          <CardDescription>Performance breakdown by subjects taught</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.subjectDistribution.map((subject, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-slate-800">{subject.subject}</h4>
                  <Badge variant="outline">{subject.hours} hours/week</Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-slate-600">Weekly Hours</div>
                    <div className="text-lg text-slate-800">{subject.hours}</div>
                  </div>
                  <div>
                    <div className="text-slate-600">Students</div>
                    <div className="text-lg text-slate-800">{subject.students}</div>
                  </div>
                  <div>
                    <div className="text-slate-600">Efficiency</div>
                    <div className="text-lg text-green-600">
                      {Math.floor(Math.random() * 15) + 85}%
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-600">Subject Performance</span>
                    <span className="text-xs text-slate-800">
                      {Math.floor(Math.random() * 20) + 80}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.floor(Math.random() * 20) + 80} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-600" />
            Recommendations & Insights
          </CardTitle>
          <CardDescription>AI-powered suggestions for performance improvement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm text-green-800">Excellent Punctuality</div>
                <div className="text-xs text-green-600 mt-1">
                  96% punctuality rate is well above department average of 89%
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm text-yellow-800">Workload Optimization</div>
                <div className="text-xs text-yellow-600 mt-1">
                  Consider redistributing {faculty.subjects[0]} classes to balance workload better
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm text-blue-800">Performance Improvement</div>
                <div className="text-xs text-blue-600 mt-1">
                  Performance has improved by 7% over the last month. Keep up the great work!
                </div>
              </div>
            </div>

            {faculty.conflictedSchedules > 0 && (
              <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-red-800">Schedule Conflicts</div>
                  <div className="text-xs text-red-600 mt-1">
                    {faculty.conflictedSchedules} schedule conflict(s) detected. Please review and resolve.
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}