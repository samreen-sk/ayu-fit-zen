import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Utensils,
  User,
  Zap,
  Clock,
  ChefHat,
  Download,
  Sparkles,
  Leaf
} from "lucide-react";

const DietGenerator = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [generatedDiet, setGeneratedDiet] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock patient data
  const patients = [
    { id: 1, name: "Rahul Sharma", dosha: "Vata", age: 28, weight: "72 kg" },
    { id: 2, name: "Priya Patel", dosha: "Pitta", age: 35, weight: "58 kg" },
    { id: 3, name: "Amit Kumar", dosha: "Kapha", age: 42, weight: "85 kg" },
  ];

  // Mock diet plan
  const mockDietPlan = {
    patient: "Priya Patel",
    dosha: "Pitta",
    duration: "7 days",
    totalCalories: 1800,
    meals: {
      breakfast: [
        { food: "Oatmeal with coconut milk", quantity: "1 cup", calories: 250, time: "7:00 AM" },
        { food: "Fresh berries", quantity: "1/2 cup", calories: 40, time: "7:00 AM" },
        { food: "Herbal tea (mint)", quantity: "1 cup", calories: 0, time: "7:00 AM" },
      ],
      lunch: [
        { food: "Quinoa salad with cucumbers", quantity: "1.5 cups", calories: 320, time: "12:30 PM" },
        { food: "Coconut chutney", quantity: "2 tbsp", calories: 60, time: "12:30 PM" },
        { food: "Buttermilk (cool)", quantity: "1 glass", calories: 80, time: "12:30 PM" },
      ],
      dinner: [
        { food: "Steamed vegetables", quantity: "1 cup", calories: 100, time: "7:00 PM" },
        { food: "Brown rice", quantity: "3/4 cup", calories: 170, time: "7:00 PM" },
        { food: "Ghee", quantity: "1 tsp", calories: 40, time: "7:00 PM" },
      ],
      snacks: [
        { food: "Fresh coconut water", quantity: "1 glass", calories: 60, time: "10:00 AM" },
        { food: "Handful of almonds", quantity: "10 pieces", calories: 70, time: "4:00 PM" },
      ],
    },
    guidelines: [
      "Favor cooling foods and avoid spicy, oily, or fried foods",
      "Eat meals at regular times to support Pitta balance",
      "Stay well hydrated with cool (not ice-cold) water",
      "Include sweet, bitter, and astringent tastes",
      "Avoid eating late at night",
    ],
    restrictions: [
      "Avoid hot spices like chili, cayenne",
      "Limit sour fruits like oranges, grapefruits", 
      "Minimize alcohol and caffeine",
      "Avoid very hot or very cold foods",
    ],
  };

  const handleGenerateDiet = async () => {
    if (!selectedPatient) return;
    
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedDiet(mockDietPlan);
    setIsGenerating(false);
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha.toLowerCase()) {
      case "vata": return "bg-blue-100 text-blue-800";
      case "pitta": return "bg-red-100 text-red-800";
      case "kapha": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gradient">Diet Generator</h1>
        <p className="text-muted-foreground">Generate personalized Ayurvedic diet plans based on patient constitution</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-ayurvedic">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" />
                Patient Selection
              </CardTitle>
              <CardDescription>
                Choose a patient to generate their personalized diet plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="patient">Select Patient</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.name}>
                        <div className="flex items-center justify-between w-full">
                          <span>{patient.name}</span>
                          <Badge className={getDoshaColor(patient.dosha)} variant="secondary">
                            {patient.dosha}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedPatient && (
                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <h4 className="font-medium">Patient Details</h4>
                  {patients
                    .filter(p => p.name === selectedPatient)
                    .map(patient => (
                      <div key={patient.id} className="text-sm space-y-1">
                        <p><span className="font-medium">Name:</span> {patient.name}</p>
                        <p><span className="font-medium">Age:</span> {patient.age}</p>
                        <p><span className="font-medium">Weight:</span> {patient.weight}</p>
                        <p><span className="font-medium">Dosha:</span> 
                          <Badge className={getDoshaColor(patient.dosha)} variant="secondary">
                            {patient.dosha}
                          </Badge>
                        </p>
                      </div>
                    ))}
                </div>
              )}

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Diet Preferences</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Plan Duration</Label>
                  <Select defaultValue="7">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calories">Target Calories/Day</Label>
                  <Input 
                    id="calories" 
                    type="number" 
                    placeholder="1800" 
                    defaultValue="1800"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies/Restrictions</Label>
                  <Textarea 
                    id="allergies" 
                    placeholder="List any food allergies or dietary restrictions..."
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Health Goals</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight-loss">Weight Loss</SelectItem>
                      <SelectItem value="weight-gain">Weight Gain</SelectItem>
                      <SelectItem value="maintenance">Weight Maintenance</SelectItem>
                      <SelectItem value="digestive">Improve Digestion</SelectItem>
                      <SelectItem value="energy">Increase Energy</SelectItem>
                      <SelectItem value="balance">Dosha Balance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleGenerateDiet}
                disabled={!selectedPatient || isGenerating}
                className="w-full bg-gradient-ayurveda hover:opacity-90"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generate Diet Plan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {!generatedDiet ? (
            <Card className="shadow-ayurvedic h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <ChefHat className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">No Diet Plan Generated</h3>
                <p className="text-muted-foreground">
                  Select a patient and generate their personalized Ayurvedic diet plan
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Diet Plan Header */}
              <Card className="shadow-ayurvedic">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Leaf className="mr-2 h-5 w-5 text-primary" />
                        Ayurvedic Diet Plan
                      </CardTitle>
                      <CardDescription>
                        Personalized for {generatedDiet.patient} • {generatedDiet.dosha} Constitution
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getDoshaColor(generatedDiet.dosha)}>
                        {generatedDiet.dosha}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export PDF
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{generatedDiet.duration}</div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent">{generatedDiet.totalCalories}</div>
                      <div className="text-sm text-muted-foreground">Calories/Day</div>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">4</div>
                      <div className="text-sm text-muted-foreground">Meals/Day</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Meal Plan Table */}
              <Card className="shadow-ayurvedic">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Utensils className="mr-2 h-5 w-5 text-primary" />
                    Daily Meal Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Meal</TableHead>
                        <TableHead>Food Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead className="text-right">Calories</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(generatedDiet.meals).map(([mealType, items]) => (
                        (items as any[]).map((item: any, index: number) => (
                          <TableRow key={`${mealType}-${index}`}>
                            {index === 0 && (
                              <TableCell 
                                className="font-medium capitalize" 
                                rowSpan={(items as any[]).length}
                              >
                                <Badge variant="outline" className="mb-2">
                                  {mealType}
                                </Badge>
                              </TableCell>
                            )}
                            <TableCell>{item.food}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                                {item.time}
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {item.calories} kcal
                            </TableCell>
                          </TableRow>
                        ))
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Guidelines and Restrictions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-ayurvedic">
                  <CardHeader>
                    <CardTitle className="text-green-700">Dietary Guidelines</CardTitle>
                    <CardDescription>Follow these recommendations for optimal health</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {generatedDiet.guidelines.map((guideline: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{guideline}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-ayurvedic">
                  <CardHeader>
                    <CardTitle className="text-red-700">Foods to Avoid</CardTitle>
                    <CardDescription>These foods may aggravate your dosha</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {generatedDiet.restrictions.map((restriction: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{restriction}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietGenerator;