import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
  Plus,
  Search,
  Filter,
  Thermometer,
  Snowflake,
  Flame,
  Leaf,
  Apple,
  Wheat,
} from "lucide-react";

const FoodDatabase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRasa, setSelectedRasa] = useState("all");

  // Mock food database
  const foods = [
    {
      id: 1,
      name: "Basmati Rice",
      category: "Grains",
      calories: 130,
      rasa: "Sweet",
      virya: "Cooling",
      vipaka: "Sweet",
      dosha: "Balances Pitta",
      properties: ["Cooling", "Easy to digest", "Nourishing"],
      description: "Long-grain rice with cooling properties, ideal for Pitta constitution."
    },
    {
      id: 2,
      name: "Ghee",
      category: "Fats",
      calories: 112,
      rasa: "Sweet",
      virya: "Cooling",
      vipaka: "Sweet", 
      dosha: "Balances Vata & Pitta",
      properties: ["Nourishing", "Promotes digestion", "Cooling"],
      description: "Clarified butter with excellent digestive properties."
    },
    {
      id: 3,
      name: "Turmeric",
      category: "Spices",
      calories: 24,
      rasa: "Bitter, Pungent",
      virya: "Heating",
      vipaka: "Pungent",
      dosha: "Balances Kapha",
      properties: ["Anti-inflammatory", "Heating", "Purifying"],
      description: "Golden spice with powerful healing properties."
    },
    {
      id: 4,
      name: "Coconut",
      category: "Fruits",
      calories: 354,
      rasa: "Sweet",
      virya: "Cooling",
      vipaka: "Sweet",
      dosha: "Balances Pitta",
      properties: ["Cooling", "Nourishing", "Hydrating"],
      description: "Tropical fruit with cooling and hydrating properties."
    },
    {
      id: 5,
      name: "Quinoa",
      category: "Grains",
      calories: 120,
      rasa: "Sweet, Astringent",
      virya: "Heating",
      vipaka: "Sweet",
      dosha: "Balances Vata",
      properties: ["Complete protein", "Warming", "Grounding"],
      description: "Ancient grain rich in protein and minerals."
    },
    {
      id: 6,
      name: "Cucumber",
      category: "Vegetables",
      calories: 16,
      rasa: "Sweet, Astringent", 
      virya: "Cooling",
      vipaka: "Sweet",
      dosha: "Balances Pitta",
      properties: ["Cooling", "Hydrating", "Light"],
      description: "Cooling vegetable perfect for hot weather and Pitta types."
    }
  ];

  const getViyaColor = (virya: string) => {
    return virya === "Heating" 
      ? "bg-red-100 text-red-800"
      : "bg-blue-100 text-blue-800";
  };

  const getViyaIcon = (virya: string) => {
    return virya === "Heating" ? Flame : Snowflake;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Grains": "bg-amber-100 text-amber-800",
      "Vegetables": "bg-green-100 text-green-800", 
      "Fruits": "bg-purple-100 text-purple-800",
      "Spices": "bg-orange-100 text-orange-800",
      "Fats": "bg-yellow-100 text-yellow-800",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         food.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || food.category === selectedCategory;
    const matchesRasa = selectedRasa === "all" || food.rasa.includes(selectedRasa);
    return matchesSearch && matchesCategory && matchesRasa;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Food Database</h1>
          <p className="text-muted-foreground">Explore Ayurvedic properties of foods with detailed nutritional information</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-ayurveda hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Add New Food
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-card border-border">
            <DialogHeader>
              <DialogTitle>Add New Food Item</DialogTitle>
              <DialogDescription>
                Add a new food item to the database with its Ayurvedic properties.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="foodName">Food Name</Label>
                  <Input id="foodName" placeholder="Enter food name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grains">Grains</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="spices">Spices</SelectItem>
                      <SelectItem value="fats">Fats</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="legumes">Legumes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calories">Calories (per 100g)</Label>
                  <Input id="calories" type="number" placeholder="Calories" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rasa">Rasa (Taste)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Primary taste" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sweet">Sweet</SelectItem>
                      <SelectItem value="sour">Sour</SelectItem>
                      <SelectItem value="salty">Salty</SelectItem>
                      <SelectItem value="bitter">Bitter</SelectItem>
                      <SelectItem value="pungent">Pungent</SelectItem>
                      <SelectItem value="astringent">Astringent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="virya">Virya (Energy)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Energy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="heating">Heating</SelectItem>
                      <SelectItem value="cooling">Cooling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vipaka">Vipaka (Post-digestive)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Post-digestive effect" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sweet">Sweet</SelectItem>
                      <SelectItem value="sour">Sour</SelectItem>
                      <SelectItem value="pungent">Pungent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dosha">Dosha Effect</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Primary dosha balance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balances-vata">Balances Vata</SelectItem>
                      <SelectItem value="balances-pitta">Balances Pitta</SelectItem>
                      <SelectItem value="balances-kapha">Balances Kapha</SelectItem>
                      <SelectItem value="increases-vata">Increases Vata</SelectItem>
                      <SelectItem value="increases-pitta">Increases Pitta</SelectItem>
                      <SelectItem value="increases-kapha">Increases Kapha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-gradient-ayurveda hover:opacity-90">Save Food Item</Button>
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
                placeholder="Search foods by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Grains">Grains</SelectItem>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Fruits">Fruits</SelectItem>
                  <SelectItem value="Spices">Spices</SelectItem>
                  <SelectItem value="Fats">Fats</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedRasa} onValueChange={setSelectedRasa}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tastes</SelectItem>
                  <SelectItem value="Sweet">Sweet</SelectItem>
                  <SelectItem value="Sour">Sour</SelectItem>
                  <SelectItem value="Salty">Salty</SelectItem>
                  <SelectItem value="Bitter">Bitter</SelectItem>
                  <SelectItem value="Pungent">Pungent</SelectItem>
                  <SelectItem value="Astringent">Astringent</SelectItem>
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

      {/* Foods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => {
          const ViyaIcon = getViyaIcon(food.virya);
          return (
            <Card key={food.id} className="shadow-ayurvedic hover:shadow-glow transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      {food.name}
                    </CardTitle>
                    <CardDescription>{food.description}</CardDescription>
                  </div>
                  
                  <Badge className={getCategoryColor(food.category)}>
                    {food.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Nutritional Info */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Calories</span>
                  <span className="font-bold text-primary">{food.calories} kcal</span>
                </div>
                
                {/* Ayurvedic Properties */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Rasa (Taste)</span>
                    <Badge variant="outline">{food.rasa}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Virya (Energy)</span>
                    <Badge className={getViyaColor(food.virya)}>
                      <ViyaIcon className="mr-1 h-3 w-3" />
                      {food.virya}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Vipaka</span>
                    <Badge variant="secondary">{food.vipaka}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dosha Effect</span>
                    <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800">
                      {food.dosha}
                    </Badge>
                  </div>
                </div>
                
                {/* Properties */}
                <div className="space-y-2">
                  <span className="text-sm font-medium">Properties:</span>
                  <div className="flex flex-wrap gap-1">
                    {food.properties.map((property, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {property}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-ayurveda hover:opacity-90" size="sm">
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredFoods.length === 0 && (
        <Card className="shadow-ayurvedic">
          <CardContent className="text-center py-12">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Apple className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No foods found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedCategory !== "all" || selectedRasa !== "all" 
                ? "Try adjusting your search criteria." 
                : "Get started by adding foods to the database."}
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-ayurveda hover:opacity-90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Food
                </Button>
              </DialogTrigger>
            </Dialog>
          </CardContent>
        </Card>
      )}

      {/* Database Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-ayurvedic">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{foods.length}</div>
            <div className="text-sm text-muted-foreground">Total Foods</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-ayurvedic">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">
              {new Set(foods.map(f => f.category)).size}
            </div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-ayurvedic">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {foods.filter(f => f.virya === "Cooling").length}
            </div>
            <div className="text-sm text-muted-foreground">Cooling Foods</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-ayurvedic">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {foods.filter(f => f.virya === "Heating").length}
            </div>
            <div className="text-sm text-muted-foreground">Heating Foods</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FoodDatabase;