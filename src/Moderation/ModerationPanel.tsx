import React, { useState } from "react";
import { X, Eye, Flag, Ban, AlertTriangle, CheckCircle } from "lucide-react";

interface ModerationPanelProps {
  onClose: () => void;
}

interface Report {
  id: string;
  reportedUser: string;
  reportingUser: string;
  reason: string;
  chatId: string;
  timestamp: Date;
  status: "pending" | "reviewed" | "resolved";
}

interface ActiveChat {
  id: string;
  participants: string[];
  topic?: string;
  messageCount: number;
  flaggedWords: string[];
  riskLevel: "low" | "medium" | "high";
}

export default function ModerationPanel({ onClose }: ModerationPanelProps) {
  const [activeView, setActiveView] = useState<"reports" | "chats">("reports");

  const mockReports: Report[] = [
    {
      id: "1",
      reportedUser: "Anonymous_User_123",
      reportingUser: "Anonymous_User_456",
      reason: "Inappropriate language or content",
      chatId: "chat_1",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: "pending",
    },
    {
      id: "2",
      reportedUser: "Anonymous_User_789",
      reportingUser: "Anonymous_User_101",
      reason: "Trolling or not taking seriously",
      chatId: "chat_2",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "pending",
    },
  ];

  const mockActiveChats: ActiveChat[] = [
    {
      id: "chat_1",
      participants: ["Anonymous_User_123", "Anonymous_User_456"],
      topic: "Academic Stress",
      messageCount: 15,
      flaggedWords: [],
      riskLevel: "low",
    },
    {
      id: "chat_2",
      participants: ["Anonymous_User_789", "Anonymous_User_101"],
      messageCount: 8,
      flaggedWords: ["hurt", "end"],
      riskLevel: "high",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Moderation Dashboard
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveView("reports")}
          className={`px-4 py-2 font-medium ${
            activeView === "reports"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Reports ({mockReports.length})
        </button>
        <button
          onClick={() => setActiveView("chats")}
          className={`px-4 py-2 font-medium ${
            activeView === "chats"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Active Chats ({mockActiveChats.length})
        </button>
      </div>

      {/* Reports View */}
      {activeView === "reports" && (
        <div className="space-y-4">
          {mockReports.map((report) => (
            <div
              key={report.id}
              className="border border-gray-200 rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Report #{report.id}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Reported: {report.reportedUser} | By: {report.reportingUser}
                  </p>
                  <p className="text-sm text-gray-500">
                    {report.timestamp.toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    report.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {report.status}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Reason:</strong> {report.reason}
                </p>
              </div>

              <div className="flex space-x-2">
                <button className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View Chat
                </button>
                <button className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Warn User
                </button>
                <button className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm">
                  <Ban className="w-4 h-4 mr-1" />
                  Ban User
                </button>
                <button className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Resolve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Active Chats View */}
      {activeView === "chats" && (
        <div className="space-y-4">
          {mockActiveChats.map((chat) => (
            <div
              key={chat.id}
              className="border border-gray-200 rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Chat #{chat.id}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Participants: {chat.participants.join(" & ")}
                  </p>
                  {chat.topic && (
                    <p className="text-sm text-gray-500">Topic: {chat.topic}</p>
                  )}
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      chat.riskLevel === "high"
                        ? "bg-red-100 text-red-800"
                        : chat.riskLevel === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {chat.riskLevel} risk
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {chat.messageCount} messages
                  </p>
                </div>
              </div>

              {chat.flaggedWords.length > 0 && (
                <div className="bg-red-50 rounded-lg p-3 mb-3">
                  <p className="text-sm text-red-700">
                    <strong>Flagged words detected:</strong>{" "}
                    {chat.flaggedWords.join(", ")}
                  </p>
                </div>
              )}

              <div className="flex space-x-2">
                <button className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                  <Eye className="w-4 h-4 mr-1" />
                  Monitor Chat
                </button>
                {chat.riskLevel === "high" && (
                  <button className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Intervene
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
