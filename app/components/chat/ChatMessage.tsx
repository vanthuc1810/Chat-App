import { Copy, ThumbsUp, ThumbsDown, RefreshCw, Sparkles } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`group w-full ${
        isUser
          ? "bg-transparent"
          : "bg-gradient-to-br from-blue-50/30 to-purple-50/30"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto px-6 py-8 flex gap-6 ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0">
          {isUser ? (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-sm font-semibold text-white shadow-lg">
              U
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className={`space-y-3 ${isUser ? "ml-auto" : "mr-auto"} max-w-[80%]`}
        >
          {!isUser && (
            <div className="font-semibold text-gray-800 flex items-center gap-2">
              Gemini
            </div>
          )}

          <div
            className={`prose prose-gray max-w-none ${isUser ? "ml-auto" : ""}`}
          >
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-[15px]">
              {content}
            </p>
          </div>

          {/* Actions (assistant only) */}
          {!isUser && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity pt-2">
              <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-gray-900 transition-colors">
                <Copy className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-gray-900 transition-colors">
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-gray-900 transition-colors">
                <ThumbsDown className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-gray-900 transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
