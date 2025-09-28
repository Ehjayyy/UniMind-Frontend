import React from "react";
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  Shield,
  BarChart,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function MenuTab() {
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: User, label: "Profile", action: () => console.log("Profile") },
    {
      icon: Settings,
      label: "Settings",
      action: () => console.log("Settings"),
    },
    {
      icon: BarChart,
      label: "Usage Statistics",
      action: () => console.log("Stats"),
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      action: () => console.log("Help"),
    },
    {
      icon: Shield,
      label: "Safety Guidelines",
      action: () => console.log("Safety"),
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Menu</h2>
        <p className="text-gray-600">
          Manage your account and access helpful resources
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {user?.isAnonymous ? "Anonymous Student" : user?.username}
            </h3>
            <p className="text-sm text-gray-600 capitalize">{user?.role}</p>
            {user?.verified && (
              <div className="flex items-center mt-1">
                <Shield className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-xs text-green-600">Verified</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="w-full flex items-center p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
          >
            <item.icon className="w-6 h-6 text-gray-600 mr-4" />
            <span className="text-gray-800">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Crisis Resources */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
        <h4 className="font-semibold text-red-800 mb-3">Crisis Support</h4>
        <div className="space-y-2 text-sm text-red-700">
          <p>
            <strong>National Suicide Prevention Lifeline:</strong> 988
          </p>
          <p>
            <strong>Crisis Text Line:</strong> Text HOME to 741741
          </p>
          <p>
            <strong>International Association for Suicide Prevention:</strong>{" "}
            iasp.info
          </p>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full bg-gray-600 text-white py-3 px-4 rounded-xl hover:bg-gray-700 transition-colors flex items-center justify-center"
      >
        <LogOut className="w-5 h-5 mr-2" />
        Logout
      </button>
    </div>
  );
}
