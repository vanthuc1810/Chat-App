export interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
