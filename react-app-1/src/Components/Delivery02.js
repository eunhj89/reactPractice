import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Delivery02.css";

const Delivery02 = () => {
  const [detailInfo, setDetailInfo] = useState({
    id: "",
    name: "",
    point: "",
    review: "",
    distance: "",
    time: "",
    imageFile: "",
  });
  const params = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3300/dcx/1/shopDetail/" + params.id)
      .then((response) => {
        setDetailInfo((prev) => ({
          ...prev,
          id: response.data.shop.id,
          name: response.data.shop.name,
          point: response.data.shop.point,
          review: response.data.shop.review,
          distance: response.data.shop.distance,
          time: response.data.shop.time,
          imageFile: response.data.shop.imageFile,
        }));
        console.log(response.data.shop.id);
      })
      .catch((error) => {
        console.log("상세 페이지 정보 추출 실패");
      });
  });

  return (
    <table
      className="delivery-table center"
      style={{ border: "1px solid #444444" }}
    >
      <thead>
        <tr className="left">
          <img
            src={`${process.env.PUBLIC_URL}/back_arrow.png`}
            alt="goBackBtnImage"
          />
        </tr>
        <tr className="center">
          <td className="center" colSpan="12">
            <h1>{detailInfo.name}</h1>
          </td>
        </tr>
        <tr className="center">
          <td className="center" colSpan="12">
            <img
              src={`${process.env.PUBLIC_URL}/${detailInfo.imageFile}`}
              alt="detailShopImage"
            />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="right" colSpan="1">
            별점
          </td>
          <td className="left" colSpan="3">
            {detailInfo.point}
          </td>
        </tr>
        <tr>
          <td className="right" colSpan="1">
            리뷰
          </td>
          <td className="left" colSpan="3">
            {detailInfo.review}
          </td>
        </tr>
        <tr>
          <td className="right" colSpan="1">
            거리
          </td>
          <td className="left" colSpan="3">
            {detailInfo.distance}
          </td>
        </tr>
        <tr>
          <td className="right" colSpan="1">
            배달시간
          </td>
          <td className="left" colSpan="3">
            {detailInfo.time}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Delivery02;
