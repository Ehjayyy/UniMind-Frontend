import React, { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ChatProvider } from "./contexts/ChatContext";
import AuthScreen from "./components/Auth/AuthScreen";
import MainApp from "./components/MainApp";

function AppContent() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return <MainApp />;
}

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
          <AppContent />
        </div>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
