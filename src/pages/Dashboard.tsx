import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StepsTracker from "@/components/StepsTracker";
import { 
  Users, 
  Utensils, 
  TrendingUp, 
  Calendar,
  Leaf,
  Heart,
  Activity,
  BookOpen,
  Plus,
  ArrowRight
} from "lucide-react";

const Dashboard = () => {
  const [currentTime] = useState(new Date().toLocaleString());

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-8 text-center shadow-glow">
        <div className="relative z-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Leaf className="h-8 w-8 text-white floating-animation" />
          </div>
          <h1 className="mb-2 text-4xl font-bold text-white">
            Welcome to AyuFit
          </h1>
          <p className="mb-6 text-lg text-white/90 max-w-2xl mx-auto">
            Harmonizing ancient Ayurvedic wisdom with modern nutrition science for optimal health and wellness
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm">
              <Plus className="mr-2 h-4 w-4" />
              New Patient
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
              <Utensils className="mr-2 h-4 w-4" />
              Generate Diet Plan
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-accent/20 rounded-full blur-lg"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-ayurvedic hover:shadow-glow transition-shadow duration-300 fade-in-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">248</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-ayurvedic hover:shadow-glow transition-shadow duration-300 fade-in-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Diet Plans</CardTitle>
            <Utensils className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">142</div>
            <p className="text-xs text-muted-foreground">
              +8 new this week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-ayurvedic hover:shadow-glow transition-shadow duration-300 fade-in-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">94.2%</div>
            <p className="text-xs text-muted-foreground">
              Patient satisfaction
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-ayurvedic hover:shadow-glow transition-shadow duration-300 fade-in-up">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultations Today</CardTitle>
            <Calendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">12</div>
            <p className="text-xs text-muted-foreground">
              4 appointments remaining
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="shadow-ayurvedic">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest patient interactions and diet plan updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  action: "New patient consultation",
                  patient: "Rahul Sharma",
                  time: "2 hours ago",
                  type: "consultation",
                },
                {
                  action: "Diet plan updated",
                  patient: "Priya Patel", 
                  time: "4 hours ago",
                  type: "diet",
                },
                {
                  action: "Progress report generated",
                  patient: "Amit Kumar",
                  time: "6 hours ago",
                  type: "report",
                },
                {
                  action: "Dosha assessment completed",
                  patient: "Sita Devi",
                  time: "8 hours ago",
                  type: "assessment",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary pulse-gentle"></div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.patient}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Dosha Distribution & Steps Tracker */}
        <div className="space-y-6">
          {/* Steps Tracker */}
          <StepsTracker />

          {/* Dosha Distribution */}
          <Card className="shadow-ayurvedic">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-primary" />
                Dosha Distribution
              </CardTitle>
              <CardDescription>
                Patient constitution breakdown
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Vata</span>
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800">
                    35%
                  </Badge>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{width: '35%'}}></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Pitta</span>
                  <Badge variant="secondary" className="bg-gradient-to-r from-red-100 to-red-200 text-red-800">
                    45%
                  </Badge>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Kapha</span>
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-green-200 text-green-800">
                    20%
                  </Badge>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-gradient-ayurveda h-2 rounded-full" style={{width: '20%'}}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-ayurvedic">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-between bg-gradient-ayurveda hover:opacity-90">
                Add New Patient
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between border-primary text-primary hover:bg-primary/10">
                Generate Diet Plan
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                View Reports
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Current Time Display */}
      <div className="text-center text-sm text-muted-foreground">
        Last updated: {currentTime}
      </div>
    </div>
  );
};

export default Dashboard;