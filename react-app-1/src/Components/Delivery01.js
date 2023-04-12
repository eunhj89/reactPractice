import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Delivery01.css";

const Delivery01 = () => {
  const [category, setCategory] = useState("all");
  const [preference, setPreference] = useState("id");
  const [deliveryList, setDeliveryList] = useState([]);

  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };

  const preferenceHandler = (event) => {
    setPreference(event.target.value);
  };

  const categoryFilterFunction = (inputList) => {
    return inputList.filter((list) => {
      return category === "all" || category === list.category;
    });
  };

  const preferenceSortFunction = (inputList) => {
    return inputList.sort((a, b) => {
      if (preference === "id") {
        return a.id - b.id;
      } else if (preference === "point") {
        return b.point - a.point;
      } else {
        return b.review - a.review;
      }
    });
  };

  const adSortFunction = (inputList) => {
    return inputList.sort((a, b) => {
      if (a.adFlag === "Y" && b.adFlag === "N") {
        return -1;
      } else if (a.adFlag === "N" && b.adFlag === "Y") {
        return 1;
      } else {
        return 1;
      }
    });
  };

  const filteredDeliveryList = adSortFunction(
    preferenceSortFunction(categoryFilterFunction(deliveryList))
  );

  useEffect(() => {
    axios
      .get("http://localhost:3300/dcx/1/shopList")
      .then((response) => {
        setDeliveryList(response.data.shopList);
      })
      .catch((error) => {
        console.log("리스트 추출 실패");
      });
  }, []);

  return (
    <table
      className="delivery-table center"
      style={{ border: "1px solid #444444" }}
    >
      <thead>
        <tr className="center">
          <td className="center" colSpan="4">
            <h1>마곡 요기서 배달</h1>
          </td>
        </tr>
        <tr className="center">
          <td colSpan="1">
            <select value={category} onChange={categoryHandler}>
              <option value="all">전체</option>
              <option value="CK">치킨</option>
              <option value="PZ">피자</option>
              <option value="SF">분식</option>
              <option value="CF">카페</option>
            </select>
          </td>
          <td colSpan="3">
            <select value={preference} onChange={preferenceHandler}>
              <option value="id">기본 정렬순</option>
              <option value="point">별점 높은순</option>
              <option value="review">리뷰 많은순</option>
            </select>
          </td>
        </tr>
      </thead>
      {filteredDeliveryList.map((list) => (
        <tbody key={list.id}>
          <tr>
            <td rowSpan="2">
              <img
                src={`${process.env.PUBLIC_URL}/${list.imageFile}`}
                alt="imageFile"
              />
            </td>
            <td>
              <h3>
                <Link to={`/detail/${list.id}`}>{list.name}</Link>
                {list.adFlag === "Y" ? (
                  <img
                    src={`${process.env.PUBLIC_URL}/ad.png`}
                    alt="adImageFile"
                  />
                ) : null}
              </h3>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                별점 {list.point}, 리뷰 {list.review}
              </p>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default Delivery01;
