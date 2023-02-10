// modules
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes, Switch} from 'react-router-dom';
import axios from "axios";

// stylesheet
import "../assets/css/main.css";

export default function Message() {

    useEffect(()=>{
        if(localStorage.getItem('account') === null) {
            window.location.replace('http://localhost:3000/login')
        }
      }, []);

    const [selectedUser, setSelectedUser] = useState('나');
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    
    function handleSubmit(event) {
        event.preventDefault();
        const message = {
          user: selectedUser,
          text: inputValue,
          timestamp: new Date(),
        };
        axios
          .post('http://localhost:8080/send', message)
          .then((res) => {
            console.log(res.data);
            setMessages([...messages, res.data]);
          });
      }

      function chatRoom(event) {
        event.preventDefault();
        axios.get(`http://localhost:8080/chat/inbox/${selectedUser}`).then((res) => {
          console.log(res.data);
          setMessages(res.data);
        });
      }
    





    // server 연결하면 알림 API 사용 가능
    if (Notification.permission === 'granted') {
        new Notification(`New message from ${selectedUser}: ${inputValue}`);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(
              `New message from ${selectedUser}: ${inputValue}`
            );
          }
        });
      }
    

    return (
        <div className="flex h-screen bg-gray-100">
          <div className="w-1/3 p-4">
            <h1 className="text-3xl font-bold mb-4">메세지</h1>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="selected-user"
              >
                Select User:
              </label>
              <select
                id="selected-user"
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={selectedUser}
                onChange={(event) => setSelectedUser(event.target.value)}
              >
                <option value=''></option> 
              </select>
            </div>
          </div>
          <div className="w-2/3 p-4 overflow-y-auto">
            <ul>
              {messages.map((message, index) => (
                <li
                  key={index}
                  className="p-4 border border-gray-200 bg-white rounded-lg shadow mb-2"
                >
                  <strong className="text-gray-700 font-medium">
                    {message.user}
                  </strong>
                  : {message.text}{' '}
                  <em className="text-gray-500">
                    ({message.timestamp.toLocaleString()})
                  </em>
                </li>
              ))}
            </ul>
            <form className="mt-4" onSubmit={handleSubmit}>
              <input
                type="text"
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                />
                <button
                onSubmit={handleSubmit}                
                  type="submit"
                  className="block mt-4 appearance-none w-full bg-indigo-500 text-white font-medium border border-transparent hover:bg-indigo-600 rounded px-4 py-2 shadow-md focus:outline-none focus:shadow-outline"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        );
    };