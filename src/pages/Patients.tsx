import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  MoreVertical,
  Calendar,
  Weight,
  Activity,
  Heart
} from "lucide-react";

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDosha, setSelectedDosha] = useState("all");

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: "Rahul Sharma",
      age: 28,
      gender: "Male",
      dosha: "Vata",
      weight: "72 kg",
      lastVisit: "2024-01-15",
      status: "Active",
      email: "rahul@example.com",
      phone: "+91 9876543210",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      name: "Priya Patel",
      age: 35,
      gender: "Female", 
      dosha: "Pitta",
      weight: "58 kg",
      lastVisit: "2024-01-12",
      status: "Active",
      email: "priya@example.com",
      phone: "+91 9876543211",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 3,
      name: "Amit Kumar",
      age: 42,
      gender: "Male",
      dosha: "Kapha", 
      weight: "85 kg",
      lastVisit: "2024-01-10",
      status: "Inactive",
      email: "amit@example.com",
      phone: "+91 9876543212",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 4,
      name: "Sita Devi",
      age: 29,
      gender: "Female",
      dosha: "Vata-Pitta",
      weight: "55 kg", 
      lastVisit: "2024-01-08",
      status: "Active",
      email: "sita@example.com",
      phone: "+91 9876543213",
      avatar: "/api/placeholder/40/40",
    },
  ];

  const getDoshaColor = (dosha: string) => {
    switch (dosha.toLowerCase()) {
      case "vata":
        return "bg-blue-100 text-blue-800";
      case "pitta": 
        return "bg-red-100 text-red-800";
      case "kapha":
        return "bg-green-100 text-green-800";
      default:
        return "bg-purple-100 text-purple-800";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" 
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDosha = selectedDosha === "all" || 
                        patient.dosha.toLowerCase().includes(selectedDosha.toLowerCase());
    return matchesSearch && matchesDosha;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Patients</h1>
          <p className="text-muted-foreground">Manage your patient profiles and track their progress</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-ayurveda hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Add New Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-card border-border">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>
                Create a new patient profile with their basic information and dosha assessment.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter patient name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="Age" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" type="number" placeholder="Weight" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dosha">Primary Dosha</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary dosha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vata">Vata</SelectItem>
                    <SelectItem value="pitta">Pitta</SelectItem>
                    <SelectItem value="kapha">Kapha</SelectItem>
                    <SelectItem value="vata-pitta">Vata-Pitta</SelectItem>
                    <SelectItem value="pitta-kapha">Pitta-Kapha</SelectItem>
                    <SelectItem value="vata-kapha">Vata-Kapha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+91 XXXXXXXXXX" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Medical Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any relevant medical history or notes..."
                  className="resize-none"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-gradient-ayurveda hover:opacity-90">Save Patient</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-ayurvedic">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search patients by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedDosha} onValueChange={setSelectedDosha}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Doshas</SelectItem>
                  <SelectItem value="vata">Vata</SelectItem>
                  <SelectItem value="pitta">Pitta</SelectItem>
                  <SelectItem value="kapha">Kapha</SelectItem>
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

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="shadow-ayurvedic hover:shadow-glow transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={patient.avatar} alt={patient.name} />
                    <AvatarFallback className="bg-gradient-ayurveda text-primary-foreground">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <CardDescription>{patient.email}</CardDescription>
                  </div>
                </div>
                
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Age: {patient.age}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Weight className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.weight}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge className={getDoshaColor(patient.dosha)}>
                  {patient.dosha}
                </Badge>
                <Badge className={getStatusColor(patient.status)}>
                  {patient.status}
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button size="sm" className="flex-1 bg-gradient-ayurveda hover:opacity-90">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <Card className="shadow-ayurvedic">
          <CardContent className="text-center py-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No patients found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try adjusting your search criteria." : "Get started by adding your first patient."}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-ayurveda hover:opacity-90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Patient
                </Button>
              </DialogTrigger>
            </Dialog>
          </CardContent>
        </Card>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-ayurvedic">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{patients.length}</div>
            <div className="text-sm text-muted-foreground">Total Patients</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-ayurvedic">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {patients.filter(p => p.status === "Active").length}
            </div>
            <div className="text-sm text-muted-foreground">Active Cases</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-ayurvedic">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">
              {Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length)}
            </div>
            <div className="text-sm text-muted-foreground">Avg Age</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-ayurvedic">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {patients.filter(p => new Date(p.lastVisit) > new Date(Date.now() - 7*24*60*60*1000)).length}
            </div>
            <div className="text-sm text-muted-foreground">Recent Visits</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Patients;