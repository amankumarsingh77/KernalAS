
import React, { useState, useEffect } from "react";
import BotWrapper from "../components/chat/BotWrapper";
import HumanWrapper from "../components/chat/HumanWrapper";
import SetSources from "../containers/SetSources";
import { useParams } from "react-router-dom";

import { doc, addDoc, collection, getDoc, setDoc, updateDoc, FieldValue, arrayUnion } from 'firebase/firestore';

import { auth, db } from '../firebase/firebase';
export default function ChatWindow({ embedding_model, app_type, setBotTitle }) {
  const [bot, setBot] = useState(null);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectChat, setSelectChat] = useState(true);
  const usermail = auth?.currentUser?.email;
  const { bot_slug } = useParams();

  const getbot = async () => {
    const docRef = doc(db, "Workspaces", bot_slug);
    const docsnap = await getDoc(docRef);
    setBot(docsnap.data())

    setChats(docsnap.data().chats)
  }
  useEffect(() => {
    if (bot_slug) {
      getbot()
    }
  }, [bot_slug]);

  useEffect(() => {
    const storedChats = localStorage.getItem(`chat_${bot_slug}_${app_type}`);

    if (storedChats) {
      const parsedChats = JSON.parse(storedChats);
      setChats(parsedChats.chats);
    }

  }, [app_type, bot_slug]);
  const addChat = async (payload) => {
    try {

      // Assuming db is a properly initialized Firestore instance
      const workspaceRef = doc(db, 'Workspaces', bot_slug);

      const data = await updateDoc(workspaceRef, {
        chats: arrayUnion(payload)
      });

      console.log('Document successfully updated in Workspaces collection.');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleChatResponse = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const queryInput = e.target.query.value;
    e.target.query.value = "";
    // const collectionRef = collection(db, "Workspaces");
    // const docRef = db.collection("Workspaces").doc(bot_slug);
    // const chatobject = {
    //   sender: "H",
    //   message: queryInput,
    // }
    const chatEntry = {
      sender: "H",
      message: queryInput,
    };
    addChat(chatEntry)



    setChats((prevChats) => [...prevChats, chatEntry]);

    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/get_answer`, {
      method: "POST",
      body: JSON.stringify({
        query: queryInput,
        embedding_model,
        app_type,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.ok) {
      const botResponse = data.response;
      const botEntry = {
        sender: "B",
        message: botResponse,
      };
      setIsLoading(false);
      addChat(botEntry)
      setChats((prevChats) => [...prevChats, botEntry]);
      const savedChats = {
        chats: [...chats, chatEntry, botEntry],
      };

      localStorage.setItem(
        `chat_${bot_slug}_${app_type}`,
        JSON.stringify(savedChats)
      );
    } else {
      // router.reload();
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4 overflow-x-auto h-full pb-8">

          {/* Greeting Message */}
          <BotWrapper>
            Hi, I am {bot?.name}. How can I help you today?
          </BotWrapper>

          {/* Chat Messages */}
          {chats.map((chat, index) => (
            <React.Fragment key={index}>
              {chat.sender === "B" ? (
                <BotWrapper>{chat.message}</BotWrapper>
              ) : (
                <HumanWrapper>{chat.message}</HumanWrapper>
              )}
            </React.Fragment>
          ))}

          {/* Loader */}
          {isLoading && (
            <BotWrapper>
              <div className="flex items-center justify-center space-x-2 animate-pulse">
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
            </BotWrapper>
          )}
        </div>

        <div className="bg-[#1E293B] fixed bottom-0 left-0 right-0 h-28 sm:h-16"></div>

        {/* Query Form */}
        <div className="flex flex-row gap-x-2 sticky bottom-3">
          <SetSources
            setChats={setChats}
            embedding_model={embedding_model}
            setSelectChat={setSelectChat}
            bot_slug={bot_slug}
          />
          {selectChat && (
            <form
              onSubmit={handleChatResponse}
              className="w-full flex flex-col sm:flex-row gap-y-2 gap-x-2 "
            >
              <div className="w-full flex-shrink">
                <input
                  id="query"
                  name="query"
                  type="text"
                  placeholder="Enter your query..."
                  className="text-sm w-full border-2 p-3 border-black rounded-xl focus:outline-none focus:border-blue-800 sm:pl-4 h-11"
                  required
                />
              </div>

              <div className="w-full sm:w-fit">

                <button
                  type="submit"
                  id="sender"
                  disabled={isLoading}
                  className="col-span-2 stroke-slate-300 bg-slate-700 focus:stroke-blue-200 focus:bg-blue-600 border border-slate-600 hover:border-slate-300 rounded-lg p-2 duration-300 flex justify-center items-center h-11">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                    <path d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M10.11 13.6501L13.69 10.0601" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
