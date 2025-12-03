"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/buttons/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { enviarMensajeChatbot } from "@/app/services/ChatBotService/Chatbot.Service";
import { useAlertStore } from "@/app/store/ui/alert.store";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const PREDEFINED_SUGGESTIONS = [
  "¿Cómo puedo reducir mi consumo energético?",
  "¿Qué significan las métricas del dashboard?",
  "¿Cómo interpretar la facturación?",
  "¿Cómo agregar una nueva delegación?",
  "¿Qué son los periodos tarifarios?",
  "¿Cómo funciona el ranking de consumo?"
];

export const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Soy EnergIA, tu asistente inteligente especializado en análisis energético. Estoy aquí para ayudarte a entender tu consumo, optimizar tu facturación y gestionar tus delegaciones de manera eficiente. ¿En qué puedo asistirte hoy?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const showAlert = useAlertStore((state) => state.showAlert);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const data = await enviarMensajeChatbot(textToSend);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.result || "Sin respuesta",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      showAlert("Mensaje enviado correctamente.", "success");
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "❌ Error al conectar con el chatbot. Por favor, inténtalo de nuevo.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      showAlert("Error al enviar mensaje al chatbot.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-10 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-16 w-16 rounded-full shadow-xl bg-gradient-to-br from-[#0B57D0] to-[#4285F4] hover:from-[#062E6F] hover:to-[#0B57D0] border-0 transition-all duration-300 hover:scale-110"
          style={{
            background: isOpen 
              ? 'linear-gradient(135deg, #062E6F 0%, #0B57D0 100%)' 
              : 'linear-gradient(135deg, #0B57D0 0%, #4285F4 100%)'
          }}
        >
          {isOpen ? (
            <X className="h-7 w-7 text-white" />
          ) : (
            <MessageCircle className="h-7 w-7 text-white" />
          )}
        </Button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-28 right-14 z-40 w-96 h-[500px]">
          <Card className="h-full shadow-2xl border-0 bg-background/98 backdrop-blur-md flex flex-col">
            {/* Header */}
            <CardHeader className="pb-2 pt-2 bg-gradient-to-r from-[#4784e6] to-[#67a0fb] text-white rounded-t-lg flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-lg font-bold">🧠</span>
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">
                      EnergIA
                    </CardTitle>
                    <p className="text-sm text-white/90 font-medium">
                      Asistente Inteligente Energético
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 hover:bg-white/20 text-white hover:text-white rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="p-0 flex-1 flex flex-col min-h-0">
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {/* Predefined Suggestions */}
                  {showSuggestions && messages.length === 1 && (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground font-semibold">
                        💡 Consultas frecuentes:
                      </p>
                      <div className="grid gap-2">
                        {PREDEFINED_SUGGESTIONS.slice(0, 3).map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="h-auto p-3 text-xs text-left justify-start hover:bg-gradient-to-r hover:from-[#0B57D0]/10 hover:to-[#4285F4]/10 hover:border-[#0B57D0]/30 transition-all duration-200"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                          message.isUser
                            ? 'bg-gradient-to-r from-[#0B57D0] to-[#4285F4] text-white rounded-br-md'
                            : 'bg-body text-foreground border border-border rounded-bl-md'
                        }`}
                      >
                        <p className="leading-relaxed">{message.text}</p>
                   <p className={`text-xs mt-2 ${
                          message.isUser ? 'text-white/70' : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Loading Indicator */}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-4 rounded-2xl rounded-bl-md border border-border">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-[#0B57D0] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 bg-[#4285F4] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2 h-2 bg-[#7CACF8] rounded-full animate-bounce"></div>
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">
                            EnergIA está pensando...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Invisible element to scroll to */}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border bg-background/50 flex-shrink-0">
                <div className="flex gap-3 items-end">
                  <input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Pregunta algo sobre energía..."
                    className="flex-1 border border-border focus:border-[#0B57D0] focus:ring-[#0B57D0]/20 rounded-xl px-3 py-2 bg-background text-foreground placeholder:text-muted-foreground"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    className="bg-gradient-to-r from-[#0B57D0] to-[#4285F4] hover:from-[#062E6F] hover:to-[#0B57D0] border-0 shrink-0 h-10 w-10 p-0 rounded-xl"
                    disabled={!inputMessage.trim() || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
