import React, { useState } from "react";
import { X, Flag } from "lucide-react";

interface ReportModalProps {
  onClose: () => void;
  onReport: (reason: string) => void;
}

export default function ReportModal({ onClose, onReport }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const reportReasons = [
    "Inappropriate language or content",
    "Harassment or bullying",
    "Sharing personal information",
    "Trolling or not taking seriously",
    "Promoting harmful behavior",
    "Spam or irrelevant messages",
    "Threatening behavior",
    "Other",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reason = selectedReason === "Other" ? customReason : selectedReason;
    if (reason.trim()) {
      onReport(reason);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Flag className="w-6 h-6 text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Report User</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Why are you reporting this user?
            </label>
            <div className="space-y-2">
              {reportReasons.map((reason) => (
                <label key={reason} className="flex items-center">
                  <input
                    type="radio"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mr-3 text-red-600"
                  />
                  <span className="text-sm text-gray-700">{reason}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedReason === "Other" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Please specify:
              </label>
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows={3}
                placeholder="Describe the issue..."
              />
            </div>
          )}

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                !selectedReason ||
                (selectedReason === "Other" && !customReason.trim())
              }
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
