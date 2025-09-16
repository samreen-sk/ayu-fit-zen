import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Bot,
  Send,
  User,
  Lightbulb,
  Heart,
  Leaf,
  Zap,
  BookOpen,
  MessageCircle
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Namaste! I'm your Ayurvedic AI assistant. I can help you with questions about doshas, food properties, nutrition, and traditional Ayurvedic practices. How can I assist you today?",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    { text: "What foods balance Vata dosha?", icon: Leaf },
    { text: "How to improve digestion naturally?", icon: Heart },
    { text: "Best foods for Pitta constitution?", icon: Zap },
    { text: "Ayurvedic remedies for better sleep?", icon: BookOpen },
  ];

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAyurvedicResponse(inputMessage),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAyurvedicResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('vata')) {
      return "For balancing Vata dosha, focus on warm, moist, and grounding foods. Include: cooked grains like rice and oats, warm milk, ghee, sweet fruits like bananas and dates, root vegetables, and warming spices like ginger and cinnamon. Avoid cold, dry, and raw foods. Regular meal times and warm oil massages also help balance Vata.";
    } else if (lowerQuestion.includes('pitta')) {
      return "To balance Pitta dosha, emphasize cool, sweet, and bitter foods. Recommended foods include: cucumber, coconut, leafy greens, sweet fruits like grapes and melons, cooling herbs like coriander and fennel, and dairy products. Avoid spicy, acidic, and fried foods. Stay hydrated and avoid eating during peak heat hours.";
    } else if (lowerQuestion.includes('kapha')) {
      return "For Kapha balance, choose light, warm, and spicy foods. Include: light grains like quinoa and millet, legumes, vegetables like broccoli and cauliflower, warming spices like turmeric and black pepper, and herbal teas. Minimize heavy, oily, and sweet foods. Regular exercise and staying active is crucial for Kapha types.";
    } else if (lowerQuestion.includes('digestion') || lowerQuestion.includes('agni')) {
      return "To strengthen Agni (digestive fire): Start meals with a small piece of fresh ginger with a pinch of salt. Eat your largest meal at midday when Agni is strongest. Include digestive spices like cumin, coriander, and fennel. Avoid drinking cold water with meals. Take a short walk after eating. Practice mindful eating in a calm environment.";
    } else if (lowerQuestion.includes('sleep')) {
      return "For better sleep according to Ayurveda: Establish a regular bedtime routine. Drink warm milk with a pinch of nutmeg before bed. Practice gentle yoga or meditation. Avoid heavy meals and screens before sleep. Keep your bedroom cool and dark. Try self-massage with warm sesame oil on your feet and scalp.";
    } else {
      return "Based on Ayurvedic principles, I recommend consulting your constitution (Prakriti) and current imbalances (Vikriti). Each person's needs are unique. Focus on eating according to your dosha, maintaining regular routines, and incorporating practices like yoga, meditation, and oil massage. For specific health concerns, please consult with a qualified Ayurvedic practitioner.";
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <div className="w-12 h-12 bg-gradient-ayurveda rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">AI Ayurvedic Assistant</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get personalized Ayurvedic guidance powered by AI. Ask questions about doshas, 
          nutrition, herbs, lifestyle practices, and traditional remedies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Questions Sidebar */}
        <div className="lg:col-span-1">
          <Card className="shadow-ayurvedic">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Quick Questions
              </CardTitle>
              <CardDescription>
                Popular Ayurvedic topics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickQuestions.map((question, index) => {
                const Icon = question.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-3"
                    onClick={() => handleQuickQuestion(question.text)}
                  >
                    <Icon className="h-4 w-4 mr-2 shrink-0" />
                    <span className="text-sm">{question.text}</span>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="shadow-ayurvedic h-[600px] flex flex-col">
            <CardHeader className="flex-none">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <CardTitle>Chat with AI Assistant</CardTitle>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Online
                </Badge>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 px-6">
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'ai' 
                          ? 'bg-gradient-ayurveda text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        {message.type === 'ai' ? (
                          <Bot className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">
                            {message.type === 'ai' ? 'AI Assistant' : 'You'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className={`p-3 rounded-lg ${
                          message.type === 'ai' 
                            ? 'bg-muted' 
                            : 'bg-primary text-primary-foreground ml-auto max-w-xs'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-ayurveda flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <Separator />

              {/* Input Area */}
              <div className="p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask me about Ayurvedic nutrition, doshas, herbs, or lifestyle practices..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-ayurveda hover:opacity-90 px-6"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Press Enter to send • This AI provides general Ayurvedic guidance and is not a substitute for professional medical advice
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;