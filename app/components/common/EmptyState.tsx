import { Lightbulb, Code, BookOpen, Sparkles, Zap, Globe, Camera, Music } from 'lucide-react';

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

export function EmptyState({ onSelectPrompt }: EmptyStateProps) {
  const suggestions = [
    {
      icon: Camera,
      title: 'Help me plan',
      description: 'a perfect weekend trip with friends',
      gradient: 'from-pink-400 to-rose-500',
    },
    {
      icon: Code,
      title: 'Explain this code',
      description: 'and suggest improvements',
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Globe,
      title: 'Teach me about',
      description: 'climate change and sustainability',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      icon: Music,
      title: 'Create a playlist',
      description: 'for studying or relaxing',
      gradient: 'from-purple-400 to-indigo-500',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 pb-32">
      {/* Logo with gradient */}
      <div className="mb-8 relative">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl animate-pulse">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <Zap className="w-4 h-4 text-white" />
        </div>
      </div>

      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
        Hello, there
      </h1>
      <p className="text-xl text-gray-600 mb-12">How can I help you today?</p>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(`${suggestion.title} ${suggestion.description}`)}
            className="group flex items-start gap-4 p-5 bg-white hover:bg-gray-50 rounded-2xl text-left transition-all border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${suggestion.gradient} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
              <suggestion.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-gray-800 font-semibold mb-1">{suggestion.title}</div>
              <div className="text-gray-500 text-sm">{suggestion.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
