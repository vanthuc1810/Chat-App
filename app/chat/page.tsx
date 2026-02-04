"use client";

import { useState } from "react";
import { ChatInput } from "../components/chat/ChatInput";

const ChatPage = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <div className="p-4 border-t border-[#262A33]">
        <ChatInput onSend={() => console.log(value)} />
      </div>
    </>
  );
};

export default ChatPage;
