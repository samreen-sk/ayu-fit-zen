import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, Target, TrendingUp, Calendar } from "lucide-react";

interface StepsTrackerProps {
  className?: string;
}

const StepsTracker = ({ className }: StepsTrackerProps) => {
  const [currentSteps, setCurrentSteps] = useState(0);
  const [dailyGoal] = useState(10000);
  const [weeklyData] = useState([
    { day: "Mon", steps: 8500 },
    { day: "Tue", steps: 9200 },
    { day: "Wed", steps: 7800 },
    { day: "Thu", steps: 10500 },
    { day: "Fri", steps: 9800 },
    { day: "Sat", steps: 11200 },
    { day: "Sun", steps: 6800 },
  ]);

  // Simulate step counting (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSteps(prev => {
        const increment = Math.floor(Math.random() * 50) + 10;
        const newSteps = prev + increment;
        return newSteps > dailyGoal ? dailyGoal : newSteps;
      });
    }, 3000);

    // Initialize with random steps
    setCurrentSteps(Math.floor(Math.random() * 8000) + 2000);

    return () => clearInterval(interval);
  }, [dailyGoal]);

  const progressPercentage = (currentSteps / dailyGoal) * 100;
  const weeklyAverage = Math.round(weeklyData.reduce((sum, day) => sum + day.steps, 0) / weeklyData.length);

  return (
    <div className={className}>
      <Card className="shadow-ayurvedic">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Daily Steps
              </CardTitle>
              <CardDescription>Track your walking activity</CardDescription>
            </div>
            <Badge variant="outline" className="bg-primary/10">
              <Calendar className="h-3 w-3 mr-1" />
              Today
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Steps Display */}
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">
              {currentSteps.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              of {dailyGoal.toLocaleString()} steps goal
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>{Math.round(progressPercentage)}% complete</span>
              <span>{dailyGoal.toLocaleString()}</span>
            </div>
          </div>

          {/* Goal Status */}
          <div className="flex items-center justify-center space-x-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {currentSteps >= dailyGoal 
                ? "🎉 Goal achieved!" 
                : `${(dailyGoal - currentSteps).toLocaleString()} steps to go`
              }
            </span>
          </div>

          {/* Weekly Overview */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">This Week</span>
              <div className="flex items-center text-sm text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1" />
                Avg: {weeklyAverage.toLocaleString()}
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {weeklyData.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">{day.day}</div>
                  <div className="h-12 bg-muted rounded flex items-end justify-center p-1">
                    <div 
                      className="bg-primary rounded w-full opacity-70"
                      style={{ 
                        height: `${Math.max((day.steps / dailyGoal) * 100, 10)}%`,
                        minHeight: '4px'
                      }}
                    />
                  </div>
                  <div className="text-xs mt-1 font-medium">
                    {(day.steps / 1000).toFixed(1)}k
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Tips */}
          <div className="bg-primary/5 rounded-lg p-3">
            <h4 className="text-sm font-medium mb-1">💡 Ayurvedic Tip</h4>
            <p className="text-xs text-muted-foreground">
              Walking after meals aids digestion (Agni). Aim for a gentle 10-minute walk 
              to balance your doshas and improve overall well-being.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepsTracker;