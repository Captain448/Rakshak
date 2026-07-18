"use client";

import { useState } from "react";
import { MessageSquare, Send, ShieldAlert, CornerDownRight } from "lucide-react";
import WarningBanner from "@/components/ui/WarningBanner";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

const PRESET_ANSWERS = {
  "what is a digital arrest scam?": 
    "A 'Digital Arrest' is a fraud tactic where scammers pose as law enforcement officials (CBI, ED, Customs, or Police) over video calls, claiming you are associated with illegal shipments or financial crimes. They threaten immediate jail time and instruct you to remain on continuous video camera connection (claiming it is 'online custody') until you transfer money as a verification deposit. Government agencies NEVER conduct official business over WhatsApp or place citizens under online arrests.",
  "how do i report a transaction?": 
    "If you have made a fraudulent bank transfer, you must file a complaint immediately on this portal in the 'Report Fraud' tab, or dial 1930. Provide the recipient UPI ID, bank account number, transactional reference ID, and date/time. The National Cyber Crime system coordinates with banks to block suspect mule accounts within the golden hour.",
  "how can i recover my defrauded money?": 
    "Recovery depends on report speed. If reported within 2-4 hours ('Golden Hour'), banks can trigger transactional holds on the receiving account. Once money is withdrawn or routed through multiple accounts, recovery requires formal police investigation. File a case here or visit the nearest Cyber Police station with bank transaction logs.",
  "who runs rakshak ai?": 
    "Rakshak AI is a digital safety initiative coordinating threat intelligence across the Ministry of Home Affairs (MHA), National Cyber Crime Portal, Telecom carriers, and public banking federations."
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Namaste. I am your Digital Safety Assistant. I can help answer queries related to online scams, digital arrest vectors, and guide you on reporting procedures. What would you like to verify today?",
      timestamp: "10:00 AM"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);

    // Analyze answer
    setTimeout(() => {
      const lowerText = textToSend.toLowerCase().trim();
      let replyText = "I apologize, but I don't have a specific record of that query. Please check our official 'National Alert Feed' or dial the cyber crime helpline 1930 directly to speak with an officer.";

      // Check presets
      for (const [q, a] of Object.entries(PRESET_ANSWERS)) {
        if (lowerText.includes(q) || q.includes(lowerText)) {
          replyText = a;
          break;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-2 flex-1 w-full">
      {/* Disclaimer */}
      <WarningBanner
        type="info"
        dismissible={false}
        message="Notice: This safety chatbot is powered by generative intelligence models. Responses are provided for public guidance and verification support. This is not an official legal registration channel. To file formal complaints, use the Report Fraud portal."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
        {/* Left Column: Preset Questions */}
        <div className="bg-white border border-govgray-200 rounded p-5 flex flex-col gap-4">
          <h3 className="font-extrabold text-xs text-navy-900 uppercase tracking-wider border-b border-govgray-200 pb-2 flex items-center gap-1.5">
            <ShieldAlert className="h-4.5 w-4.5 text-saffron-500" />
            Suggested Inquiries
          </h3>

          <div className="flex flex-col gap-2">
            {Object.keys(PRESET_ANSWERS).map((q, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(q)}
                className="text-left p-2.5 rounded text-xs font-semibold border border-govgray-200 text-navy-900 hover:border-navy-900 hover:bg-govgray-50 transition-colors flex items-start gap-1"
              >
                <CornerDownRight className="h-3 w-3 shrink-0 mt-0.5 text-saffron-500" />
                <span className="capitalize">{q}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Chat interface */}
        <div className="md:col-span-2 bg-white border border-govgray-200 rounded flex flex-col h-[500px] shadow-xs">
          {/* Header */}
          <div className="bg-navy-900 text-white p-4 rounded-t flex items-center gap-2.5 border-b border-govgray-200">
            <div className="bg-white/10 p-1.5 rounded">
              <MessageSquare className="h-5 w-5 text-saffron-500" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider">Rakshak Cyber Assistant</h4>
              <p className="text-[10px] text-govgray-200">Online | AI Safety Desk</p>
            </div>
          </div>

          {/* Conversation History */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-govgray-50/50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] flex flex-col gap-1 ${
                  msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <div
                  className={`p-3 rounded text-xs leading-relaxed font-semibold ${
                    msg.sender === "user"
                      ? "bg-navy-900 text-white rounded-br-none"
                      : "bg-white text-navy-900 border border-govgray-200 rounded-bl-none shadow-xs"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-govgray-600 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {loading && (
              <div className="self-start max-w-[80%] flex items-center gap-2 bg-white border border-govgray-200 p-3 rounded rounded-bl-none shadow-xs text-xs font-semibold text-govgray-600">
                <span className="h-2 w-2 bg-saffron-500 rounded-full animate-bounce"></span>
                <span className="h-2 w-2 bg-saffron-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="h-2 w-2 bg-saffron-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                <span>Agent processing query...</span>
              </div>
            )}
          </div>

          {/* Input Panel */}
          <div className="p-3 border-t border-govgray-200 flex gap-2 items-center bg-white rounded-b">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(inputValue)}
              placeholder="Type your safety query here..."
              className="flex-1 bg-white border border-govgray-300 rounded p-2 text-xs font-medium text-govgray-900 focus:outline-none focus:border-navy-700 h-9.5"
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || loading}
              className="bg-navy-900 hover:bg-navy-800 disabled:bg-govgray-200 text-white p-2.5 rounded transition-colors shrink-0 flex items-center justify-center"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
