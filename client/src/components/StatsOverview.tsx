import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  TrendingUp, 
  Clock, 
  Users, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  MapPin
} from 'lucide-react';

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Schedule Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Schedule Performance
          </CardTitle>
          <CardDescription>Current semester optimization metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Conflict Resolution</span>
              <span className="text-sm text-slate-800">98.5%</span>
            </div>
            <Progress value={98.5} className="h-2" />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Faculty Utilization</span>
              <span className="text-sm text-slate-800">87%</span>
            </div>
            <Progress value={87} className="h-2" />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Room Optimization</span>
              <span className="text-sm text-slate-800">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Student Satisfaction</span>
              <span className="text-sm text-slate-800">94%</span>
            </div>
            <Progress value={94} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            System Health
          </CardTitle>
          <CardDescription>Real-time status of all components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700">AI Scheduling Engine</span>
            </div>
            <Badge className="bg-green-100 text-green-700">Online</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700">Database Connection</span>
            </div>
            <Badge className="bg-green-100 text-green-700">Active</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-yellow-700">External Integrations</span>
            </div>
            <Badge className="bg-yellow-100 text-yellow-700">Partial</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700">Backup Systems</span>
            </div>
            <Badge className="bg-green-100 text-green-700">Ready</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Resource Utilization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-600" />
            Resource Utilization
          </CardTitle>
          <CardDescription>Current usage of institutional resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl text-blue-600 mb-1">45</div>
                <div className="text-sm text-blue-700">Classrooms</div>
                <div className="text-xs text-blue-600">85% utilized</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl text-green-600 mb-1">12</div>
                <div className="text-sm text-green-700">Laboratories</div>
                <div className="text-xs text-green-600">78% utilized</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl text-purple-600 mb-1">8</div>
                <div className="text-sm text-purple-700">Seminar Halls</div>
                <div className="text-xs text-purple-600">92% utilized</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl text-orange-600 mb-1">156</div>
                <div className="text-sm text-orange-700">Equipment</div>
                <div className="text-xs text-orange-600">73% utilized</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NEP-2020 Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            NEP-2020 Compliance
          </CardTitle>
          <CardDescription>Alignment with National Education Policy guidelines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Credit-based System</span>
              <Badge className="bg-green-100 text-green-700">✓ Implemented</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Multidisciplinary Approach</span>
              <Badge className="bg-green-100 text-green-700">✓ Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Skill Development Integration</span>
              <Badge className="bg-green-100 text-green-700">✓ Configured</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Flexible Curriculum Structure</span>
              <Badge className="bg-green-100 text-green-700">✓ Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Research Integration</span>
              <Badge className="bg-yellow-100 text-yellow-700">⚠ Partial</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Community Engagement</span>
              <Badge className="bg-blue-100 text-blue-700">📋 Planned</Badge>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-indigo-700">Overall Compliance</span>
              <span className="text-sm text-indigo-800">87%</span>
            </div>
            <Progress value={87} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}