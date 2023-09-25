import { useState, useEffect } from "react";
import "./Notice.css";
import Axios from "axios";
import "../Css/Table.css";

const NoticeList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [isWriteModalOpen, setWriteModalOpen] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [selectOption, setSelectOption] = useState("notice");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedBoard, setSelectedBoard] = useState(null);

  const [changeCategory, setCategory] = useState(false);

  const handleTitle = (e) => {
    // setSelectData({ title: e.target.value });
    setTitle(e.target.value);
  };
  const handleContent = (e) => {
    // setSelectData({ content: e.target.value });
    setContent(e.target.value);
  };
  const handleSelectOptionChange = (e) => {
    // setSelectData({ selectOption: e.target.value });
    setSelectOption(e.target.value);
  };
  const getNoticeSet = () => {
    Axios.get("http://bibliever.com:3001/api/get/notify", {
      params: { cate: 1 },
    }).then((res) => {
      setData(res.data);
      setCategory(true);
      console.log(res.data); // 첫번째 데이터 확인용 코드
    });
  };

  //   이벤트 데이터 교체
  const getEventSet = () => {
    Axios.get("http://bibliever.com:3001/api/get/notify", {
      params: { cate: 2 },
    }).then((res) => {
      setData(res.data);
      setCategory(false);
      console.log(res.data); // 첫번째 데이터 확인용 코드
    });
  };

  useEffect(() => {
    getNoticeSet();
  }, []);

  const indexOfLastUser = page * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentBoard = data.slice(indexOfFirstUser, indexOfLastUser);
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

  const handleOpenModal = () => {
    // 클릭동작.
    setWriteModalOpen(true);
  };
  const handleCloseModal = () => {
    // 모달 닫을 때 데이터 초기화
    setTitle("");
    setContent("");
    setSelectOption("notice");

    setWriteModalOpen(false);
    setUpdate(false);
  };

  const handleBoardClick = (board) => {
    setSelectedBoard(board);
    setUpdate(true);
  };

  const showDetail = (board) => {
    handleBoardClick(board);
    setWriteModalOpen(true);
    // 업데이트 모달 호출 시에 데이터 담아주기
    setTitle(board.title);
    setContent(board.content);
    setSelectOption(setCategoryUpdate(board.cate));
  };

  const setCategoryUpdate = (cate) => {
    switch (cate) {
      case "[공지사항]":
        return "notice";
      case "[이벤트]":
        return "event";
      default:
        return "notice";
    }
  };

  const SubmitGive = () => {
    console.log(
      "title : ",
      title,
      "content : ",
      content,
      "selectOption : ",
      selectOption
    );

    if (
      title !== null &&
      title !== undefined &&
      title !== "" &&
      content !== null &&
      content !== undefined &&
      content !== "" &&
      selectOption !== null &&
      selectOption !== undefined &&
      selectOption !== ""
    ) {
      Axios.post("http://bibliever.com:3001/api/post/admin/addnotice", {
        title: title,
        content: content,
        selectOption: selectOption,
      }).then((res) => {
        handleCloseModal();
        getNoticeSet();
      });
    } else {
      // 조건이 충족되지 않는 경우 알림을 띄우거나 다른 처리를 수행할 수 있음
      alert("모든 필수 정보를 입력해주세요.");
    }
  };

  const handleDelete = (key) => {
    //  삭제 로직
    if (key !== null && key !== undefined && key !== "") {
      Axios.post("http://bibliever.com:3001/api/post/admin/deletenotice", {
        key: key,
      }).then((res) => {
        alert("삭제되었습니다.");
      });
    } else {
      // 조건이 충족되지 않는 경우 알림을 띄우거나 다른 처리를 수행할 수 있음
      alert("삭제에 실패하였습니다.");
    }
  };

  return (
    <div className="Notice_container">
      <div className="smallMenu_Container">
        <div
          className={`Options  ${changeCategory === true ? "active" : ""}`}
          onClick={getNoticeSet}
        >
          <h1 className="Options-Text">공지사항</h1>
        </div>
        <div
          className={`Options  ${changeCategory === false ? "active" : ""}`}
          onClick={getEventSet}
        >
          <h1 className="Options-Text">이벤트</h1>
        </div>
      </div>
      <div className="NoticeMain">
        <div className="Main-Header">
          <div className="Table-Header-Col short_table_20">
            <h1 className="Table-Col-Text">번호</h1>
          </div>
          <div className="Table-Header-Col">
            <h1 className="Table-Col-Text">제목</h1>
          </div>
          <div className="Table-Header-Col short_table_30">
            <h1 className="Table-Col-Text">작성일</h1>
          </div>
          <div className="Table-Header-Col short_table_20">
            <h1 className="Table-Col-Text">삭제</h1>
          </div>
        </div>
        <div className="Main-body">
          {currentBoard.map((board, index) => (
            <div className="User-row" key={board.idx}>
              <div className="Table-Col short_table_20">
                <p className="Content-Text">{index + 1}</p>
              </div>
              <div
                className="Table-Col pointer"
                onClick={() => showDetail(board)}
              >
                <p className="Content-Text link_title">{board.title}</p>
              </div>
              <div className="Table-Col short_table_30">
                <p className="Content-Text">
                  {new Date(board.date).toLocaleDateString()}
                </p>
              </div>
              <div className="Table-Col short_table_20">
                <button
                  className="delete_btn"
                  onClick={() => handleDelete(board.idx)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="write_container">
          <button className="write_button" onClick={handleOpenModal}>
            등록
          </button>
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
      {isWriteModalOpen && (
        <div className="Modal">
          <div className="Modal-Content">
            <div className="Modal-Content-Header">
              {!isUpdate && <h2>공지사항 작성</h2>}
              {isUpdate && <h2>공지사항 수정</h2>}
              <button
                className="PointAD-Close-BTN"
                onClick={() => handleCloseModal()}
              >
                닫기
              </button>
            </div>
            <div className="modal_text_area">
              <div className="modal_select_box">
                <div className="select_title">카테고리</div>
                <div className="select_input">
                  <select
                    value={selectOption}
                    onChange={handleSelectOptionChange}
                  >
                    <option value="notice">공지사항</option>
                    <option value="event">이벤트</option>
                  </select>
                </div>
              </div>
              <div className="modal_text_box">
                <div className="text_title">제목</div>
                <div className="text_input">
                  <input
                    className="modal_input"
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={handleTitle}
                  ></input>
                </div>
              </div>
              <div className="modal_text_box">
                <div className="text_title">내용</div>
                <div className="text_input">
                  <textarea
                    className="modal_textarea"
                    type="text"
                    placeholder="내용을 입력하세요"
                    value={content}
                    onChange={handleContent}
                  ></textarea>
                </div>
              </div>
            </div>
            {!isUpdate && (
              <button className="success_btn" onClick={SubmitGive}>
                등록
              </button>
            )}
            {isUpdate && (
              <button
                className="success_btn"
                onClick={() =>
                  console.log(
                    "title",
                    title,
                    "content",
                    content,
                    "selectOption",
                    selectOption
                  )
                }
              >
                수정
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default NoticeList;
