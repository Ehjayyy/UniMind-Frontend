import React, { useState } from "react";
import { Eye, EyeOff, UserPlus, Upload } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [verificationFile, setVerificationFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (role === "teacher" && !verificationFile) {
      alert("Teachers must upload verification documents");
      return;
    }

    setIsLoading(true);

    try {
      await register(username, password, role, verificationFile || undefined);
    } catch (error) {
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          I am a:
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="student"
              checked={role === "student"}
              onChange={(e) => setRole(e.target.value as "student")}
              className="mr-2 text-blue-600"
            />
            <span className="text-sm">Student</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="teacher"
              checked={role === "teacher"}
              onChange={(e) => setRole(e.target.value as "teacher")}
              className="mr-2 text-blue-600"
            />
            <span className="text-sm">Teacher/Counselor</span>
          </label>
        </div>
      </div>

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div className="relative">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {role === "teacher" && (
        <div>
          <label
            htmlFor="verification"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Verification Document *
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Upload school ID, teaching certificate, or official documentation
          </p>
          <div className="relative">
            <input
              type="file"
              id="verification"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setVerificationFile(e.target.files?.[0] || null)}
              className="hidden"
              required
            />
            <label
              htmlFor="verification"
              className="w-full flex items-center justify-center px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
            >
              <Upload className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-sm text-gray-600">
                {verificationFile
                  ? verificationFile.name
                  : "Upload verification document"}
              </span>
            </label>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-50"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <UserPlus className="w-5 h-5 mr-2" />
            Register
          </>
        )}
      </button>
    </form>
  );
}
