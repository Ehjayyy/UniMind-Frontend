import React from "react";
import { MessageCircle, Clock, Users } from "lucide-react";
import { useChat } from "../../contexts/ChatContext";
import ChatInterface from "./ChatInterface";

export default function ChatsTab() {
  const { currentChat, chatHistory, selectChat } = useChat();

  if (currentChat) {
    return <ChatInterface />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Your Conversations
        </h2>
        <p className="text-gray-600">
          Continue conversations with fellow students you've connected with
        </p>
      </div>

      {chatHistory.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No conversations yet
          </h3>
          <p className="text-gray-600">
            Start matching with other students to begin supportive conversations
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              onClick={() => selectChat(chat.id)}
              className="bg-white rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">
                      {chat.participantName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {chat.topic
                        ? `Topic: ${chat.topic}`
                        : "General conversation"}
                    </p>
                    {chat.messages.length > 0 && (
                      <p className="text-sm text-gray-500 truncate max-w-xs">
                        {chat.messages[chat.messages.length - 1].content}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      chat.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {chat.isActive ? "Active" : "Ended"}
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {chat.lastActivity.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
