import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TimetableGenerator } from './TimetableGenerator';
import { TimetableEditor } from './TimetableEditor';
import { FacultyManager } from './FacultyManager';
import { StatsOverview } from './StatsOverview';
import { 
  Calendar, 
  Users, 
  BookOpen, 
  CheckCircle, 
  Zap,
  Download,
  Upload,
  Settings
} from 'lucide-react';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Calendar className="w-5 h-5" />
              Active Schedules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-blue-800">24</div>
            <p className="text-sm text-blue-600 mt-1">Across 6 programs</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              Conflict-Free
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-green-800">98.5%</div>
            <p className="text-sm text-green-600 mt-1">Schedule accuracy</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Users className="w-5 h-5" />
              Faculty Load
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-purple-800">87%</div>
            <p className="text-sm text-purple-600 mt-1">Average utilization</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <BookOpen className="w-5 h-5" />
              Total Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-orange-800">312</div>
            <p className="text-sm text-orange-600 mt-1">This semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full bg-white/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-100">
            Overview
          </TabsTrigger>
          <TabsTrigger value="generate" className="data-[state=active]:bg-green-100">
            Generate
          </TabsTrigger>
          <TabsTrigger value="edit" className="data-[state=active]:bg-purple-100">
            Edit Schedule
          </TabsTrigger>
          <TabsTrigger value="faculty" className="data-[state=active]:bg-orange-100">
            Faculty
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-slate-100">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <StatsOverview />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest schedule updates and changes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { action: 'Schedule generated', program: 'B.Ed. Semester 3', time: '2 hours ago', status: 'success' },
                  { action: 'Faculty availability updated', program: 'M.Ed. Core', time: '4 hours ago', status: 'info' },
                  { action: 'Room conflict resolved', program: 'FYUP Year 2', time: '1 day ago', status: 'warning' },
                  { action: 'Elective preferences imported', program: 'ITEP Batch 1', time: '2 days ago', status: 'success' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-slate-600">{activity.program}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.time}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                  <Zap className="w-4 h-4 mr-2" />
                  Generate New Schedule
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Course Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export Timetables
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Faculty
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="generate">
          <TimetableGenerator />
        </TabsContent>

        <TabsContent value="edit">
          <TimetableEditor />
        </TabsContent>

        <TabsContent value="faculty">
          <FacultyManager />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Settings
              </CardTitle>
              <CardDescription>Configure TimeCraft AI for your institution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-3">NEP-2020 Compliance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm">Credit-based scheduling</span>
                      <Badge className="bg-green-100 text-green-700">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm">Multidisciplinary approach</span>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm">Flexible curriculum structure</span>
                      <Badge className="bg-green-100 text-green-700">Configured</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}