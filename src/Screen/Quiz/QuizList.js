import Axios from "axios";
import { useEffect, useState } from "react";
import "./QuizList.css";
import "../Css/Table.css";
const QuizList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [usersPerPage, setUsersPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [isDetailOpen, setDetailOpen] = useState(false);
  const [type, setType] = useState(0);
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const [firstAnswer, setFirst] = useState("");
  const [secondAnswer, setSecond] = useState("");
  const [thirdAnswer, setThird] = useState("");
  const [fourthAnswer, setFourth] = useState("");
  const [loading, setLoading] = useState(true);

  //pointset state
  const [point, setPoint] = useState([]);

  useEffect(() => {
    didntconfirmquiz();
    GETPointSet();
  }, [searchText]);

  const didntconfirmquiz = () => {
    Axios.get("http://bibliever.com:3001/get/admin/didntconfirmquiz")
      .then((res) => {
        setData(res.data);
 ;
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const GETPointSet = () => {
    Axios.get("http://bibliever.com:3001/api/get/pointset").then((res) => {
      setPoint(res.data);
    });
  };
  const indexOfLastUser = page * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentQuiz = data.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(data.length / usersPerPage);

  const previousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const goToLastPage = () => {
    setPage(totalPages);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSetListnum = (num) => {
    console.log(num);
    setPage(1);
    setUsersPage(num);
  };
  const handleSearch = () => {
    // 검색어와 옵션 값에 따라 적절한 검색 로직을 구현합니다.
    let filteredUsers = [];

    filteredUsers = data.filter((user) =>
      user.nickname.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filteredUsers.length > 0) {
      setPage(1); // 검색 결과가 있으면 페이지를 1로 리셋합니다.
    } else {
      setPage(page); // 검색 결과가 없으면 현재 페이지를 유지합니다.
    }

    // 검색 결과를 업데이트합니다.
    setData(filteredUsers);
  };
  const setCategory = (category) => {
    console.log(category);
    switch (category) {
      case 1:
        return "4지선다";
      case 2:
        return "O.X";
      case 3:
        return "주관식";
      default:
        return "-";
    }
  };
  // 승인 버튼을 클릭했을 때 처리하는 함수
  const handleApprove = (idx, key) => {
    console.log(
      "승인 버튼을 눌렀습니다. 퀴즈 인덱스:",
      idx,
      "KEY:",
      key,
      point
    );
    if (
      idx !== null &&
      idx !== undefined &&
      idx !== "" &&
      key !== null &&
      key !== undefined &&
      key !== ""
    ) {
      Axios.post("http://bibliever.com:3001/api/post/point/pointup", {
        userToken: key,
        point: point[0].make_quiz,
        cate: 4,
      }).then((res) => {
        Axios.post("http://bibliever.com:3001/api/post/admin/confirmquiz", {
          quiznum: idx,
        }).then((res) => {
          alert("승인되었습니다.");
          didntconfirmquiz();
        });
      });
    } else {
      // 조건이 충족되지 않는 경우 알림을 띄우거나 다른 처리를 수행할 수 있음
      alert("승인에 실패하였습니다.");
    }
  };

  const handleRefund = (idx, key) => {
    // 거절 로직
    if (
      idx !== null &&
      idx !== undefined &&
      idx !== "" &&
      key !== null &&
      key !== undefined &&
      key !== ""
    ) {
      Axios.post("http://bibliever.com:3001/api/post/admin/deletequiz", {
        quiznum: idx,
        key: key,
      }).then((res) => {
        alert("거절되었습니다.");
        didntconfirmquiz();
      });
    } else {
      // 조건이 충족되지 않는 경우 알림을 띄우거나 다른 처리를 수행할 수 있음
      alert("거절에 실패하였습니다.");
    }
  };

  //상세 모달
  const handleOpenModal = (data) => {
    setDetailOpen(true);
    setType(setCategory(data.quiz_category));
    setTitle(data.question);
    setDetailAnswer(data);
  };
  // 상세 답안
  const setDetailAnswer = (data) => {
    switch (data.quiz_category) {
      case 1:
        setFirst(data.option1);
        setSecond(data.option2);
        setThird(data.option3);
        setFourth(data.option4);
        setAnswer(data.answer);
        break;
      case 2:
        setAnswer(setOx(data.answer));
        break;
      case 3:
        setAnswer(data.answer);
        break;
      default:
        return "notice";
    }
  };
  // ox 구별
  const setOx = (answer) => {
    switch (answer) {
      case "1":
        return "O";
      case "2":
        return "X";
      default:
        return "-";
    }
  };

  const handleCloseModal = () => {
    setDetailOpen(false);
    setType(0);
    setTitle("");
    setAnswer("");
    setFirst("");
    setSecond("");
    setThird("");
    setFourth("");
  };

  return (
    <div className="Main-Container">
      <div className="Main quiz_main">
        <div className="Header ">
          <div className="button-grid">
            <button className="page_btn" onClick={() => handleSetListnum(5)}>
              5
            </button>
            <button className="page_btn" onClick={() => handleSetListnum(10)}>
              10
            </button>
            <button className="page_btn" onClick={() => handleSetListnum(20)}>
              20
            </button>
            <button className="page_btn" onClick={() => handleSetListnum(50)}>
              50
            </button>
          </div>
          <div className="select_area quiz_select">
            <input
              type="text"
              placeholder="닉네임 검색"
              value={searchText}
              onChange={handleSearchTextChange}
            />
            <button className="page_btn" onClick={handleSearch}>
              검색
            </button>
          </div>
        </div>
        <div className="Main-Header top_line">
          <div className="Table-Header-Col short_table_20">
            <h1 className="Table-Col-Text">번호</h1>
          </div>
          <div className="Table-Header-Col short_table_20">
            <h1 className="Table-Col-Text">유형</h1>
          </div>
          <div className="Table-Header-Col">
            <h1 className="Table-Col-Text">내용</h1>
          </div>
          <div className="Table-Header-Col short_table_50">
            <h1 className="Table-Col-Text">출제자</h1>
          </div>
          <div className="Table-Header-Col short_table_20">
            <h1 className="Table-Col-Text">날짜</h1>
          </div>
          <div className="Table-Header-Col short_table_20">
            <h1 className="Table-Col-Text">정답</h1>
          </div>
          <div className="Table-Header-Col short_table_30">
            <h1 className="Table-Col-Text">승인여부</h1>
          </div>
        </div>
        {loading ? (
          <div className="loading">로딩중...</div>
        ) : (
          <div className="Main-body">
            {currentQuiz.map((item, index) => (
              <div className="User-row" key={item.idx}>
                <div className="Table-Col short_table_20">
                  <p className="Content-Text">{index + 1}</p>
                </div>
                <div className="Table-Col short_table_20">
                  <p className="Content-Text">
                    {setCategory(item.quiz_category)}
                  </p>
                </div>
                <div
                  className="Table-Col pointer"
                  onClick={() => handleOpenModal(item)}
                >
                  <p className="Content-Text link_title">{item.question}</p>
                </div>
                <div className="Table-Col short_table_50">
                  <p className="Content-Text">{item.nickname}</p>
                </div>
                <div className="Table-Col short_table_20">
                  <p className="Content-Text">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="Table-Col short_table_20">
                  <p className="Content-Text">{item.answer}</p>
                </div>
                <div className="Table-Col short_table_30">
                  {item.confirm === "N" && (
                    <div>
                      <button
                        className="table_btn"
                        onClick={() =>
                          handleApprove(item.idx, item.private_key)
                        }
                      >
                        승인
                      </button>
                      <button
                        className="table_btn refund"
                        onClick={() => handleRefund(item.idx, item.private_key)}
                      >
                        거절
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="Pagination">
          <button onClick={previousPage} disabled={page === 1}>
            {`<`}
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setPage(index + 1)}
              style={{
                fontWeight: page === index + 1 ? "bold" : "normal",
                backgroundColor: page === index + 1 ? "#000" : "transparent",
                color: page === index + 1 ? "#fff" : "#000",
              }}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={nextPage} disabled={page === totalPages}>
            {`>`}
          </button>
          <button onClick={goToLastPage} disabled={page === totalPages}>
            {`>>`}
          </button>
        </div>
      </div>
      {isDetailOpen && (
        <div className="Modal">
          <div className="Modal-Content">
            <div className="Modal-Content-Header">
              <h2>문제 상세</h2>
              <button
                className="PointAD-Close-BTN"
                onClick={() => handleCloseModal()}
              >
                닫기
              </button>
            </div>
            <div className="modal_text_area">
              <div className="modal_table_box">
                <div className="table_title">유형</div>
                <div className="table_content">{type}</div>
              </div>
              <div className="modal_table_box">
                <div className="table_title">문제</div>
                <div className="table_content">{title}</div>
              </div>
              <div className="modal_table_box">
                <div className="table_title">답안</div>
                {type === "4지선다" && (
                  <div className="table_content">
                    <div className="answer_box">정답 : {answer}</div>
                    <div>1 : {firstAnswer}</div>
                    <div>2 : {secondAnswer}</div>
                    <div>3 : {thirdAnswer}</div>
                    <div>4 : {fourthAnswer}</div>
                  </div>
                )}
                {type === "4지선다" || (
                  <div className="table_content">
                    <div className="answer_box">{answer}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizList;
