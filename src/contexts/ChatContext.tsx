import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isOwnMessage: boolean;
}

export interface ChatSession {
  id: string;
  participantId: string;
  participantName: string;
  messages: Message[];
  topic?: string;
  isActive: boolean;
  lastActivity: Date;
  reportCount: number;
}

interface ChatContextType {
  currentChat: ChatSession | null;
  chatHistory: ChatSession[];
  isMatching: boolean;
  startMatching: (type: "instant" | "topic", topic?: string) => void;
  stopMatching: () => void;
  sendMessage: (content: string) => void;
  reportUser: (reason: string) => void;
  selectChat: (chatId: string) => void;
  leaveChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [currentChat, setCurrentChat] = useState<ChatSession | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [isMatching, setIsMatching] = useState(false);

  const startMatching = async (type: "instant" | "topic", topic?: string) => {
    setIsMatching(true);

    // Simulate matching process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newChat: ChatSession = {
      id: Math.random().toString(36).substr(2, 9),
      participantId: Math.random().toString(36).substr(2, 9),
      participantName: "Anonymous Student",
      messages: [],
      topic,
      isActive: true,
      lastActivity: new Date(),
      reportCount: 0,
    };

    setCurrentChat(newChat);
    setChatHistory((prev) => [newChat, ...prev]);
    setIsMatching(false);
  };

  const stopMatching = () => {
    setIsMatching(false);
  };

  const sendMessage = (content: string) => {
    if (!currentChat) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: "current-user",
      content,
      timestamp: new Date(),
      isOwnMessage: true,
    };

    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, newMessage],
      lastActivity: new Date(),
    };

    setCurrentChat(updatedChat);
    setChatHistory((prev) =>
      prev.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
    );

    // Simulate response after a delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        senderId: currentChat.participantId,
        content: "Thanks for sharing. I understand how you're feeling.",
        timestamp: new Date(),
        isOwnMessage: false,
      };

      const chatWithResponse = {
        ...updatedChat,
        messages: [...updatedChat.messages, responseMessage],
        lastActivity: new Date(),
      };

      setCurrentChat(chatWithResponse);
      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === currentChat.id ? chatWithResponse : chat
        )
      );
    }, 1000 + Math.random() * 2000);
  };

  const reportUser = (reason: string) => {
    if (!currentChat) return;

    const updatedChat = {
      ...currentChat,
      reportCount: currentChat.reportCount + 1,
    };

    setCurrentChat(updatedChat);
    setChatHistory((prev) =>
      prev.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
    );

    alert(
      `User reported for: ${reason}. Our moderators will review this case.`
    );
  };

  const selectChat = (chatId: string) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setCurrentChat(chat);
    }
  };

  const leaveChat = () => {
    if (currentChat) {
      const updatedChat = { ...currentChat, isActive: false };
      setChatHistory((prev) =>
        prev.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
      );
    }
    setCurrentChat(null);
  };

  return (
    <ChatContext.Provider
      value={{
        currentChat,
        chatHistory,
        isMatching,
        startMatching,
        stopMatching,
        sendMessage,
        reportUser,
        selectChat,
        leaveChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
