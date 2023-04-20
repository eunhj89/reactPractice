import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./common.css";

const Dtalk001 = () => {
  const [isFamilyOpen, setIsFamilyOpen] = useState(false);
  const [isFriendOpen, setIsFriendOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [targetList, setTargetList] = useState([]);

  const familyBtnHandler = (event) => {
    event.preventDefault();
    setIsFamilyOpen((prev) => !prev);
  };

  const friendBtnHandler = (event) => {
    event.preventDefault();
    setIsFriendOpen((prev) => !prev);
  };

  const companyBtnHandler = (event) => {
    event.preventDefault();
    setIsCompanyOpen((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3300/dcx/3/groupMember")
      .then((response) => {
        setTargetList(response.data.groupMember);
      })
      .catch((error) => {
        console.log("리스트 추출 실패");
      });
  }, []);

  return (
    <table className="table center">
      <thead>
        <tr className="center">
          <td className="center" colSpan="4">
            <h1>DCX Talk</h1>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan="4">
            <hr />
          </td>
        </tr>
        <tr style={{ height: "50px" }}>
          <td className="left" colSpan="3">
            <h3>가족</h3>
          </td>
          <td className="right" colSpan="1">
            <img
              src={
                isFamilyOpen
                  ? `${process.env.PUBLIC_URL}/close.png`
                  : `${process.env.PUBLIC_URL}/open.png`
              }
              alt="imageFile"
              onClick={familyBtnHandler}
            />
          </td>
        </tr>
        {isFamilyOpen &&
          targetList
            .filter((list) => {
              return list.group_id === "10";
            })[0]
            .member.map((list) => (
              <tr key={list.id}>
                <td className="center width-small" colSpan="1">
                  <Link to={`/detail/${list.name}`}>
                    <img
                      src={`${process.env.PUBLIC_URL}/${list.imageFile}`}
                      alt="imageFile"
                    />
                  </Link>
                </td>
                <td className="left" colSpan="3">
                  <Link to={`/detail/${list.name}`}>{list.name}</Link>
                </td>
              </tr>
            ))}
        <tr>
          <td colSpan="4">
            <hr />
          </td>
        </tr>
        <tr className="height-title">
          <td className="left" colSpan="3">
            <h3>친구</h3>
          </td>
          <td className="right" colSpan="1">
            <img
              src={
                isFriendOpen
                  ? `${process.env.PUBLIC_URL}/close.png`
                  : `${process.env.PUBLIC_URL}/open.png`
              }
              alt="imageFile"
              onClick={friendBtnHandler}
            />
          </td>
        </tr>
        {isFriendOpen &&
          targetList
            .filter((list) => {
              return list.group_id === "20";
            })[0]
            .member.map((list) => (
              <tr key={list.id}>
                <td className="center width-small" colSpan="1">
                  <Link to={`/detail/${list.name}`}>
                    <img
                      src={`${process.env.PUBLIC_URL}/${list.imageFile}`}
                      alt="imageFile"
                    />
                  </Link>
                </td>
                <td className="left" colSpan="3">
                  <Link to={`/detail/${list.name}`}>{list.name}</Link>
                </td>
              </tr>
            ))}
        <tr>
          <td colSpan="4">
            <hr />
          </td>
        </tr>
        <tr className="height-title">
          <td className="left" colSpan="3">
            <h3>직장동료</h3>
          </td>
          <td className="right" colSpan="1">
            <img
              src={
                isCompanyOpen
                  ? `${process.env.PUBLIC_URL}/close.png`
                  : `${process.env.PUBLIC_URL}/open.png`
              }
              alt="imageFile"
              onClick={companyBtnHandler}
            />
          </td>
        </tr>
        {isCompanyOpen &&
          targetList
            .filter((list) => {
              return list.group_id === "30";
            })[0]
            .member.map((list) => (
              <tr key={list.id}>
                <td className="center width-small" colSpan="1">
                  <Link to={`/detail/${list.name}`}>
                    <img
                      src={`${process.env.PUBLIC_URL}/${list.imageFile}`}
                      alt="imageFile"
                    />
                  </Link>
                </td>
                <td className="left" colSpan="3">
                  <Link to={`/detail/${list.name}`}>{list.name}</Link>
                </td>
              </tr>
            ))}
        <tr>
          <td colSpan="4">
            <hr />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Dtalk001;
