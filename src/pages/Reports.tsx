import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Download,
  Printer,
  Filter,
  Calendar,
  User,
  TrendingUp,
  BarChart3,
  PieChart,
  Eye,
} from "lucide-react";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [selectedType, setSelectedType] = useState("all");

  // Mock reports data
  const reports = [
    {
      id: 1,
      type: "Diet Plan",
      patient: "Rahul Sharma",
      dosha: "Vata",
      generated: "2024-01-15",
      status: "Active",
      calories: 2200,
      duration: "14 days",
      compliance: 87,
    },
    {
      id: 2,
      type: "Progress Report", 
      patient: "Priya Patel",
      dosha: "Pitta",
      generated: "2024-01-12",
      status: "Completed",
      calories: 1800,
      duration: "30 days",
      compliance: 94,
    },
    {
      id: 3,
      type: "Dosha Assessment",
      patient: "Amit Kumar",
      dosha: "Kapha",
      generated: "2024-01-10",
      status: "Active",
      calories: 1600,
      duration: "7 days",
      compliance: 76,
    },
    {
      id: 4,
      type: "Diet Plan",
      patient: "Sita Devi",
      dosha: "Vata-Pitta",
      generated: "2024-01-08",
      status: "Active", 
      calories: 1900,
      duration: "21 days",
      compliance: 91,
    },
  ];

  const getDoshaColor = (dosha: string) => {
    switch (dosha.toLowerCase()) {
      case "vata": return "bg-blue-100 text-blue-800";
      case "pitta": return "bg-red-100 text-red-800"; 
      case "kapha": return "bg-green-100 text-green-800";
      default: return "bg-purple-100 text-purple-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 90) return "text-green-600";
    if (compliance >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredReports = reports.filter(report => {
    if (selectedType === "all") return true;
    return report.type.toLowerCase().includes(selectedType.toLowerCase());
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Reports</h1>
          <p className="text-muted-foreground">Download and manage patient diet charts and progress reports</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print All
          </Button>
          <Button className="bg-gradient-ayurveda hover:opacity-90">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-ayurvedic">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold text-primary">{reports.length}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-ayurvedic">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Plans</p>
                <p className="text-2xl font-bold text-green-600">
                  {reports.filter(r => r.status === "Active").length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-ayurvedic">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Compliance</p>
                <p className="text-2xl font-bold text-accent">
                  {Math.round(reports.reduce((sum, r) => sum + r.compliance, 0) / reports.length)}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Patient adherence
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-ayurvedic">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-primary">
                  {reports.filter(r => new Date(r.generated) > new Date(Date.now() - 30*24*60*60*1000)).length}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              New reports
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-ayurvedic">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="all-time">All Time</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="diet">Diet Plans</SelectItem>
                  <SelectItem value="progress">Progress Reports</SelectItem>
                  <SelectItem value="dosha">Dosha Assessments</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="shadow-ayurvedic">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>
            Patient reports and diet charts generated in the selected period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Report Type</TableHead>
                <TableHead>Dosha</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/api/placeholder/32/32" alt={report.patient} />
                        <AvatarFallback className="bg-gradient-ayurveda text-primary-foreground text-xs">
                          {report.patient.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{report.patient}</div>
                        <div className="text-sm text-muted-foreground">
                          {report.calories} cal/day
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline">
                      {report.type}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getDoshaColor(report.dosha)}>
                      {report.dosha}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                      {new Date(report.generated).toLocaleDateString()}
                    </div>
                  </TableCell>
                  
                  <TableCell>{report.duration}</TableCell>
                  
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-ayurveda"
                          style={{ width: `${report.compliance}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${getComplianceColor(report.compliance)}`}>
                        {report.compliance}%
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card className="shadow-ayurvedic">
        <CardHeader>
          <CardTitle className="flex items-center">
            <PieChart className="mr-2 h-5 w-5 text-primary" />
            Report Templates
          </CardTitle>
          <CardDescription>
            Generate standard reports for your practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-border hover:shadow-glow transition-shadow">
              <CardContent className="p-4 text-center">
                <FileText className="mx-auto h-8 w-8 text-primary mb-3" />
                <h4 className="font-medium mb-2">Monthly Summary</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete overview of all patient activities
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-border hover:shadow-glow transition-shadow">
              <CardContent className="p-4 text-center">
                <BarChart3 className="mx-auto h-8 w-8 text-accent mb-3" />
                <h4 className="font-medium mb-2">Compliance Analysis</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Patient adherence and success rates
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-border hover:shadow-glow transition-shadow">
              <CardContent className="p-4 text-center">
                <PieChart className="mx-auto h-8 w-8 text-primary mb-3" />
                <h4 className="font-medium mb-2">Dosha Distribution</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Patient constitution breakdown
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <Card className="shadow-ayurvedic">
          <CardContent className="text-center py-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No reports found</h3>
            <p className="text-muted-foreground mb-4">
              No reports match your current filter criteria.
            </p>
            <Button className="bg-gradient-ayurveda hover:opacity-90">
              <Download className="mr-2 h-4 w-4" />
              Generate New Report
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Reports;