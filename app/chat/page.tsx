"use client"

import { useState } from "react";
import { ChatInput } from "../components/chat/ChatInput";

export default function ChatPage() {
  const [value, setValue] = useState("");

  return (
    <>
      {/* <MessageList /> */}
      <div className="p-4 border-t border-[#262A33]">
        <ChatInput
          value={value}
          onChange={setValue}
          onSend={() => console.log(value)}
        />
      </div>
    </>
  );
}
