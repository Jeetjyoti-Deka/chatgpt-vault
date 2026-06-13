export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface Conversation {
  title: string;
  url: string;
  exportedAt: string;
  messages: Message[];
}