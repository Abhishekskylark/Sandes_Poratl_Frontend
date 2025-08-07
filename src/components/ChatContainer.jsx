import { LogOut, Plus, Search } from "lucide-react";
import React, { useRef } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import EditProfile from "./EditProfile";

function ChatWindow() {
  const users = [
    { name: "Virat", image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg" },
    { name: "Rohit", image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg" },
    { name: "Sachine", image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg" },
    { name: "Shreyas", image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg" },
    { name: "Bumrah", image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg" },
  ];

  const inputRef = useRef(null);
  const openFile = () => inputRef.current?.click();

  return (
    <div className="flex items-center justify-center min-h-screen p-2 sm:p-6">
      <div className="w-full max-w-7xl h-full sm:h-[90vh] flex flex-col sm:flex-row shadow rounded-lg overflow-hidden">
        
        {/* Sidebar */}
        <div className="bg-[#1D3557] w-full sm:w-[275px] flex flex-col">
          <div className="p-4">
            <div className="bg-white flex items-center gap-2 px-4 py-2 rounded-md border">
              <Search className="text-gray-600" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent focus:outline-none text-gray-600 text-sm"
              />
            </div>
          </div>

          <hr className="h-[1px] bg-white border-0" />

          <div className="overflow-y-auto flex-grow px-4">
            {users.map((user, idx) => (
              <div key={idx} className="flex gap-3 items-center py-2">
                <img src={user.image} alt="user" className="w-10 h-10 rounded-full" />
                <p className="text-white font-medium">{user.name}</p>
              </div>
            ))}
          </div>

          <div className="p-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full bg-transparent border text-white">Profile</Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="flex flex-col gap-4">
                  <EditProfile />
                  <Button className="border bg-[#1D3557] text-white hover:text-white cursor-pointer">
                    <LogOut className="mr-2" /> Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="bg-[#457B9D] text-white flex gap-3 p-4 items-center">
            <img src={users[0].image} alt="profile" className="w-10 h-10 rounded-full" />
            <p className="font-semibold">Username</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {[...Array(6)].map((_, i) => (
              <>
                <div className="chat chat-start" key={`start-${i}`}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="sender" />
                    </div>
                  </div>
                  <div className="chat-header">Obi-Wan Kenobi <time className="text-xs opacity-50">12:45</time></div>
                  <div className="chat-bubble">Hi!</div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
                <div className="chat chat-end" key={`end-${i}`}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="receiver" />
                    </div>
                  </div>
                  <div className="chat-header">Anakin <time className="text-xs opacity-50">12:46</time></div>
                  <div className="chat-bubble">Hello!</div>
                  <div className="chat-footer opacity-50">Seen at 12:46</div>
                </div>
              </>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t flex items-center gap-2">
            <Plus onClick={openFile} className="cursor-pointer" />
            <input ref={inputRef} type="file" className="hidden" />
            <input
              type="text"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type a message..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
