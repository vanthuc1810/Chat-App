"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, Sparkles } from "lucide-react";
import { ScrollArea } from "./components/ui/scroll-area";
import { ChatInput, ChatMessage, Sidebar } from "./components/chat";
import { EmptyState } from "./components/common";

interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function Home() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "React Best Practices",
      timestamp: "Yesterday",
      messages: [
        {
          id: "1-1",
          role: "user",
          content:
            "What are the best practices for React development?I understand what you're looking for. Here are some key points to consider:\n\n1. First, analyze the core requirements\n2. Consider the constraints and limitations\n3. Evaluate different possible solutions\n4. Choose the approach that best fits your needsI understand what you're looking for. Here are some key points to consider:",
          timestamp: new Date().toISOString(),
        },
        {
          id: "1-2",
          role: "assistant",
          content:
            "Here are some key React best practices:\n\n1. Use functional components and hooks instead of class components\n2. Keep components small and focused on a single responsibility\n3. Use meaningful component and variable names\n4. Implement proper error boundaries\n5. Optimize performance with React.memo and useMemo when needed\n6. Follow consistent folder structure and naming conventions\n7. Use TypeScript for better type safety\n8. Write clean, maintainable code with proper documentation",
          timestamp: new Date().toISOString(),
        },
      ],
    },
    {
      id: "2",
      title: "Python Data Analysis",
      timestamp: "Last week",
      messages: [],
    },
    {
      id: "3",
      title: "Travel Planning Tips",
      timestamp: "Jan 10",
      messages: [],
    },
  ]);

  const [currentChatId, setCurrentChatId] = useState<string>("1");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      timestamp: "Just now",
      messages: [],
    };
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(chats.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(chats[0]?.id || "");
    }
  };

  const simulateAIResponse = (userMessage: string): string => {
    const responses = [
      "That's a great question! Let me help you with that. Based on your query, I would suggest considering multiple perspectives and approaches to find the best solution.",
      "I understand what you're looking for. Here are some key points to consider:\n\n1. First, analyze the core requirements\n2. Consider the constraints and limitations\n3. Evaluate different possible solutions\n4. Choose the approach that best fits your needs",
      "Thanks for asking! This is an interesting topic. Let me break it down for you with some practical examples and actionable insights that you can apply right away.",
      "Great question! The answer depends on several factors. Let me explain the different aspects you should consider to make an informed decision.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = (content: string) => {
    if (!currentChatId) return;

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    // Update chat with user message
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              title:
                chat.messages.length === 0
                  ? content.slice(0, 30) + "..."
                  : chat.title,
            }
          : chat
      )
    );

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: `${Date.now()}-ai`,
        role: "assistant",
        content: simulateAIResponse(content),
        timestamp: new Date().toISOString(),
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      );
      setIsLoading(false);
    }, 1000);
  };

  const handleSelectPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
        <Sidebar
          chats={chats}
          currentChatId={currentChatId}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1 text-center flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h2 className="font-semibold text-gray-800">
              Thuc GPT, Hay code theo cach cua ban
            </h2>
          </div>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>

        {/* Messages Area */}
        <ScrollArea ref={scrollAreaRef} className="flex-1">
          {messages.length === 0 ? (
            <EmptyState onSelectPrompt={handleSelectPrompt} />
          ) : (
            <div>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}
              {isLoading && (
                <ChatMessage
                  role="assistant"
                  content="Thinking..."
                  timestamp={new Date().toISOString()}
                />
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
