import { useState, useEffect } from "react";
import "./Faq.css";
import Axios from "axios";
import "../Css/Table.css";

const FaqList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [changeCategory, setMenuCategory] = useState(false);
  const indexOfLastUser = page * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentBoard = data.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(data.length / usersPerPage);
  const [loading, setLoading] = useState(true);
  const [isWriteModalOpen, setWriteModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [content, setContent] = useState("");
  const [faqCate, setFaqCate] = useState("");
  const [faqNum, setFaqNum] = useState("");
  const [completeAnswer, setCompleteAnswer] = useState("");

  useEffect(() => {
    getFaqSet();
  }, []);

  const getFaqSet = () => {
    setLoading(true);
    Axios.get("http://bibliever.com:3001/api/get/admin/getinquiry", {
      params: { cate: "N" },
    }).then((res) => {
      console.log(res.data);
      setData(res.data);
      setMenuCategory(true);
      setLoading(false);
    });
  };
  //   답변 완료 데이터 교체
  const getCompleteSet = () => {
    setLoading(true);
    Axios.get("http://bibliever.com:3001/api/get/admin/getinquiry", {
      params: { cate: "Y" },
    }).then((res) => {
      console.log(res.data);
      setData(res.data);
      setMenuCategory(false);
      setLoading(false);
    });
  };

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

  // 모달 오픈
  const handleOpenModal = (data) => {
    // 클릭동작.
    setFaqCate(data.cate);
    setContent(data.content);
    setFaqNum(data.idx);
    if (changeCategory === false) {
      setCompleteAnswer(data.answer);
    }
    setWriteModalOpen(true);
  };
  const handleCloseModal = () => {
    // 모달 닫을 때 데이터 초기화
    setFaqCate("");
    setContent("");
    setFaqNum("");
    setCompleteAnswer("");
    setAnswer("");

    setWriteModalOpen(false);
  };
  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  //   답변 등록 로직
  const SubmitGive = () => {
    if (
      answer !== null &&
      answer !== undefined &&
      answer !== "" &&
      faqNum !== null &&
      faqNum !== undefined &&
      faqNum !== ""
    ) {
      Axios.post("http://bibliever.com:3001/api/post/admin/inquiryanswer", {
        answer: answer,
        idx: faqNum,
      }).then((res) => {
        handleCloseModal();
        getFaqSet();
      });
    } else {
      // 조건이 충족되지 않는 경우 알림을 띄우거나 다른 처리를 수행할 수 있음
      alert("답변을 입력해주세요.");
    }
  };

  return (
    <div className="faq_container">
      <div className="smallMenu_Container">
        <div
          className={`Options  ${changeCategory === true ? "active" : ""}`}
          onClick={getFaqSet}
        >
          <h1 className="Options-Text">미답변</h1>
        </div>
        <div
          className={`Options  ${changeCategory === false ? "active" : ""}`}
          onClick={getCompleteSet}
        >
          <h1 className="Options-Text">답변완료</h1>
        </div>
      </div>
      {loading ? (
        <div className="loading">로딩중...</div>
      ) : (
        <div className="NoticeMain">
          <div className="Main-Header">
            <div className="Table-Header-Col short_table_20">
              <h1 className="Table-Col-Text">번호</h1>
            </div>
            <div className="Table-Header-Col short_table_20">
              <h1 className="Table-Col-Text">유형</h1>
            </div>
            <div className="Table-Header-Col short_table_20">
              <h1 className="Table-Col-Text">닉네임</h1>
            </div>
            <div className="Table-Header-Col">
              <h1 className="Table-Col-Text">제목</h1>
            </div>
            <div className="Table-Header-Col short_table_30">
              <h1 className="Table-Col-Text">작성일</h1>
            </div>
          </div>
          <div className="Main-body">
            {currentBoard.map((board, index) => (
              <div className="User-row" key={board.idx}>
                <div className="Table-Col short_table_20">
                  <p className="Content-Text">{index + 1}</p>
                </div>
                <div className="Table-Col short_table_20">
                  <p className="Content-Text">{board.cate}</p>
                </div>
                <div className="Table-Col short_table_20">
                  <p className="Content-Text">{board.nickname}</p>
                </div>
                <div
                  className="Table-Col pointer"
                  onClick={() => handleOpenModal(board)}
                >
                  <p className="Content-Text link_title">{board.title}</p>
                </div>
                <div className="Table-Col short_table_30">
                  <p className="Content-Text">
                    {new Date(board.reg_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
      )}
      {isWriteModalOpen && (
        <div className="Modal">
          <div className="Modal-Content">
            <div className="Modal-Content-Header">
              <h2>공지사항 작성</h2>
              <button
                className="PointAD-Close-BTN"
                onClick={() => handleCloseModal()}
              >
                닫기
              </button>
            </div>
            <div className="modal_text_area">
              <div className="modal_select_box">
                <div className="select_title mr20">카테고리</div>
                <div className="select_input">{faqCate}</div>
              </div>
              <div className="modal_text_box">
                <div className="text_title ">문의 내용</div>
                <div className="text_input">
                  <div className="text_box">{content}</div>
                </div>
              </div>
              <div className="modal_text_box">
                <div className="text_title ">답변</div>
                {changeCategory === true && (
                  <div className="text_input">
                    <textarea
                      className="modal_textarea"
                      type="text"
                      placeholder="답변을 입력하세요"
                      value={answer}
                      onChange={handleAnswer}
                    ></textarea>
                  </div>
                )}
                {changeCategory === false && (
                  <div className="text_input">
                    <textarea
                      className="modal_textarea"
                      type="text"
                      placeholder="답변을 입력하세요"
                      value={completeAnswer}
                      disabled
                    ></textarea>
                  </div>
                )}
              </div>
            </div>
            {changeCategory === true && (
              <button className="success_btn" onClick={() => SubmitGive()}>
                등록
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqList;
