import React, { useState } from "react";
import { Heart, Shield, Users } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-12 h-12 text-blue-600 mr-2" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              UNIMIND
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-6">
            A safe space for students to connect, share, and support each other
            through life's challenges
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Shield className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">
                Safe & Anonymous
              </h3>
              <p className="text-sm text-gray-600">
                Your privacy is protected with anonymous conversations
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Users className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Peer Support</h3>
              <p className="text-sm text-gray-600">
                Connect with fellow students who understand
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Heart className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Moderated</h3>
              <p className="text-sm text-gray-600">
                Professional oversight ensures a safe environment
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                isLogin
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                !isLogin
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Register
            </button>
          </div>

          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}
