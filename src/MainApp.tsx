import React, { useState } from "react";
import { MessageCircle, Search, Menu, Shield } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import MatchingTab from "./Matching/MatchingTab";
import ChatsTab from "./Chat/ChatsTab";
import MenuTab from "./Menu/MenuTab";
import ModerationPanel from "./Moderation/ModerationPanel";

type Tab = "matching" | "chats" | "menu";

export default function MainApp() {
  const [activeTab, setActiveTab] = useState<Tab>("matching");
  const [showModeration, setShowModeration] = useState(false);
  const { user } = useAuth();

  const isTeacherOrAdmin = user?.role === "teacher" || user?.role === "admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <MessageCircle className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                UNIMIND
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {isTeacherOrAdmin && (
                <button
                  onClick={() => setShowModeration(!showModeration)}
                  className="flex items-center px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Moderation
                </button>
              )}
              <div className="text-sm text-gray-600">
                Welcome,{" "}
                {user?.role === "student"
                  ? "Anonymous Student"
                  : user?.username}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showModeration && isTeacherOrAdmin ? (
          <ModerationPanel onClose={() => setShowModeration(false)} />
        ) : (
          <>
            {/* Tab Content */}
            <div className="mb-20">
              {activeTab === "matching" && <MatchingTab />}
              {activeTab === "chats" && <ChatsTab />}
              {activeTab === "menu" && <MenuTab />}
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-around py-2">
                  <button
                    onClick={() => setActiveTab("matching")}
                    className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                      activeTab === "matching"
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <Search className="w-6 h-6 mb-1" />
                    <span className="text-xs">Match</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("chats")}
                    className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                      activeTab === "chats"
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <MessageCircle className="w-6 h-6 mb-1" />
                    <span className="text-xs">Chats</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("menu")}
                    className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                      activeTab === "menu"
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <Menu className="w-6 h-6 mb-1" />
                    <span className="text-xs">Menu</span>
                  </button>
                </div>
              </div>
            </nav>
          </>
        )}
      </div>
    </div>
  );
}
