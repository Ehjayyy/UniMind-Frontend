import React, { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft, Flag, Shield, AlertTriangle } from "lucide-react";
import { useChat } from "../../contexts/ChatContext";
import ReportModal from "./ReportModal";

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentChat, sendMessage, leaveChat } = useChat();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage("");
    }
  };

  if (!currentChat) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={leaveChat}
                className="mr-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h3 className="font-semibold">{currentChat.participantName}</h3>
                <p className="text-sm opacity-90">
                  {currentChat.topic
                    ? `Topic: ${currentChat.topic}`
                    : "General support chat"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center text-xs bg-white/20 px-2 py-1 rounded-full">
                <Shield className="w-3 h-3 mr-1" />
                Monitored
              </div>
              <button
                onClick={() => setShowReportModal(true)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Flag className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Safety Banner */}
        <div className="bg-yellow-50 border-b border-yellow-100 px-4 py-2">
          <div className="flex items-center text-sm text-yellow-800">
            <AlertTriangle className="w-4 h-4 mr-2" />
            This conversation is monitored by trained professionals for your
            safety
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {currentChat.messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start the conversation by sharing what's on your mind</p>
            </div>
          ) : (
            currentChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.isOwnMessage ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.isOwnMessage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.isOwnMessage ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form
          onSubmit={handleSendMessage}
          className="border-t border-gray-200 p-4"
        >
          <div className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {showReportModal && (
        <ReportModal
          onClose={() => setShowReportModal(false)}
          onReport={(reason) => {
            // Handle report
            console.log("Reported:", reason);
            setShowReportModal(false);
          }}
        />
      )}
    </div>
  );
}
