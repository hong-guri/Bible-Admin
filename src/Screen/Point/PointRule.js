import React, { useState, useEffect } from "react";
import "./Point.css";
import Axios from "axios";
import "../Css/Table.css";

const PointRule = () => {
  const [data, setData] = useState([]);
  const [inputs, setInputs] = useState({});

  const getpointset = () => {
    Axios.get("http://bibliever.com:3001/api/get/pointset").then((res) => {
      setData(res.data[0]);
      setInputs(res.data[0]); // 데이터를 inputs 상태로 설정
    });
  };
  useEffect(() => {
    getpointset();
  }, []);

  const handlePointSave = (pointType, inputValue) => {
    console.log(`${pointType} 포인트 설정 값:`, inputValue);
    Axios.post("http://bibliever.com:3001/api/admin/update/pointset", {
      pointType: pointType,
      inputValue: inputValue,
    }).then((res) => {
      alert("수정 했습니다.");
    });
  };

  const handleInputChange = (e, pointType) => {
    const { value } = e.target;
    setInputs({
      ...inputs,
      [pointType]: value, // 해당 pointType에 대한 값 업데이트
    });
  };

  const pointItems = [
    { key: "read_bible", label: "읽기 포인트 설정", placeholder: "1 줄당" },
    { key: "write_bible", label: "쓰기 포인트 설정", placeholder: "1 줄당" },
    { key: "secpoint", label: "시간 포인트 설정", placeholder: "1 초당" },
    { key: "sol_quiz", label: "문제 풀기", placeholder: "한 문제당" },
    { key: "make_quiz", label: "문제 출제", placeholder: "한 문제당" },
  ];

  return (
    <div className="Main-Container">
      <div className="Header"></div>
      <div className="Point-Main">
        <div className="Main-Header">
          <div className="Table-Header-Col">
            <h1 className="Table-Col-Text">포인트 설정하기</h1>
          </div>
        </div>
        <div className="Main-body">
          {pointItems.map((item) => (
            <div key={item.key} className="Point-Table-Col">
              <p className="Content-Text">{item.label} :</p>
              <p className="Content-Text-Bold">{item.placeholder}</p>
              <input
                type="text"
                className="Point-Input"
                placeholder={data[item.key] || ""}
                value={inputs[item.key] || ""}
                onChange={(e) => handleInputChange(e, item.key)}
              />
              <p className="Content-Text-Bold">포인트</p>
              <button
                className="Point-Button"
                onClick={() => handlePointSave(item.key, inputs[item.key])}
              >
                저장
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointRule;
