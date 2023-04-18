import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Moment from "react-moment";
import "moment/locale/ko";
import axios from "axios";
import "./common.css";

const Dtalk002 = () => {
  const params = useParams();
  const [isScroll, setIsScroll] = useState(false);
  const [chat, setChat] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const [nowTime, setNowTime] = useState(Date.now());
  const chatWindow = useRef();

  const moveScrollToReceiveMessage = useCallback(() => {
    if (chatWindow.current) {
      if (
        chatWindow.current.scrollHeight >
          parseInt(window.getComputedStyle(chatWindow.current).height) &&
        isScroll === false
      ) {
        chatWindow.current.classList.add("scroll");
        setIsScroll(true);
      }
      chatWindow.current.scrollTo({
        top: chatWindow.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isScroll]);

  const sendMessageHandler = () => {
    if (sendMessage !== "") {
      axios
        .get("http://localhost:3300/dcx/3/conversation/" + sendMessage)
        .then((response) => {
          setChat([...chat, sendMessage, response.data.conversation.response]);
          setSendMessage("");
          setNowTime(Date.now());
        })
        .catch((error) => {
          console.log("채팅 실패");
        });
    }
  };

  const enterKeyHandler = (event) => {
    if (event.keyCode === 13) {
      sendMessageHandler();
    }
  };

  useEffect(() => {
    moveScrollToReceiveMessage();
  });

  return (
    <div className="center div">
      <div className="float-left margin">
        <span>
          <Link to={`/`}>
            <img
              src={`${process.env.PUBLIC_URL}/back_arrow.png`}
              alt="goBackBtnImage"
            />
          </Link>
        </span>
      </div>
      <div className="float-center margin">{params.name}</div>
      <div className="box" ref={chatWindow}>
        <ul>
          {chat.map((data, idx) => (
            <li
              key={idx}
              className={`${idx % 2 === 0 ? "right" : "left"} ${
                !data ? "display-none" : "display-block"
              }`}
            >
              <div>
                <span
                  className={`font-bold margin-minus ${
                    idx % 2 === 0 ? "background-blue" : "background-red"
                  }`}
                >
                  {data}
                </span>
              </div>
              <div>
                <Moment format={"a HH:mm"}>{nowTime}</Moment>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          value={sendMessage}
          onChange={(event) => {
            setSendMessage(event.target.value);
          }}
          className="input margin"
          onKeyUp={enterKeyHandler}
        />
        <button className="center margin" onClick={sendMessageHandler}>
          보내기
        </button>
      </div>
    </div>
  );
};

export default Dtalk002;
