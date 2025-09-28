import React, { useState } from "react";
import { Zap, Hash, Users, ArrowRight } from "lucide-react";
import { useChat } from "../../contexts/ChatContext";

export default function MatchingTab() {
  const [matchingType, setMatchingType] = useState<"instant" | "topic" | null>(
    null
  );
  const [customTopic, setCustomTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const { startMatching, stopMatching, isMatching } = useChat();

  const predefinedTopics = [
    "Academic Stress",
    "Social Anxiety",
    "Depression",
    "Family Issues",
    "Relationship Problems",
    "Financial Stress",
    "Career Anxiety",
    "Body Image",
    "Eating Disorders",
    "Sleep Issues",
    "Loneliness",
    "Grief and Loss",
  ];

  const handleStartMatching = () => {
    if (matchingType === "instant") {
      startMatching("instant");
    } else if (matchingType === "topic") {
      const topic = selectedTopic || customTopic;
      if (topic.trim()) {
        startMatching("topic", topic);
      } else {
        alert("Please select or enter a topic");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Find Your Support
        </h2>
        <p className="text-gray-600">
          Connect anonymously with fellow students who understand what you're
          going through
        </p>
      </div>

      {isMatching ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Finding your match...
          </h3>
          <p className="text-gray-600 mb-6">
            We're connecting you with someone who shares similar experiences
          </p>
          <button
            onClick={stopMatching}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Matching Type Selection */}
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => setMatchingType("instant")}
              className={`p-6 rounded-2xl border-2 transition-all ${
                matchingType === "instant"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-blue-300"
              }`}
            >
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Instant Match
              </h3>
              <p className="text-sm text-gray-600">
                Connect immediately with any available student for general
                support
              </p>
            </button>

            <button
              onClick={() => setMatchingType("topic")}
              className={`p-6 rounded-2xl border-2 transition-all ${
                matchingType === "topic"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white hover:border-green-300"
              }`}
            >
              <Hash className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Topic Match
              </h3>
              <p className="text-sm text-gray-600">
                Find someone dealing with similar challenges or topics
              </p>
            </button>
          </div>

          {/* Topic Selection */}
          {matchingType === "topic" && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Choose a Topic
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {predefinedTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`p-3 text-sm rounded-lg border transition-colors ${
                      selectedTopic === topic
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-green-300 text-gray-700"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>

              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or enter your own topic:
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="e.g., test anxiety, homesickness..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Start Matching Button */}
          {matchingType && (
            <div className="text-center">
              <button
                onClick={handleStartMatching}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <Users className="w-5 h-5 mr-2" />
                Start Matching
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          )}

          {/* Safety Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">
              Safety Reminder
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>
                • Never share personal information like real name, location, or
                contact details
              </li>
              <li>• Report any inappropriate behavior immediately</li>
              <li>
                • Conversations are monitored by trained professionals for your
                safety
              </li>
              <li>
                • If you're having thoughts of self-harm, please contact
                emergency services or a crisis hotline
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
