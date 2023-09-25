import Axios from "axios";
import { useEffect, useState } from "react";
import "./Point.css";
import "../Css/Table.css";
const PointAD = () => {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchOption, setSearchOption] = useState("name");
  const [searchText, setSearchText] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModaltwoOpen, setModaltwoOpen] = useState(false);
  const [usersPerPage, setUsersPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [pointad, setPointAD] = useState("");
  const [giveres, setGiveres] = useState("");
  const handlePoint = (e) => {
    const inputPoint = e.target.value;
    // 숫자가 아닌 문자 제거하여 숫자만 추출
    const numericValue = inputPoint.replace(/[^0-9]/g, "");
    setPointAD(inputPoint);
  };
  const handleres = (e) => {
    setGiveres(e.target.value);
  };
  const SubmitGive = () => {
    console.log(giveres, pointad, selectedUsers);

    // giveres, pointad, selectedUsers 변수들이 null 또는 undefined가 아니면서 빈 문자열도 아닐 때 실행
    if (
      giveres !== null &&
      giveres !== undefined &&
      giveres !== "" &&
      pointad !== null &&
      pointad !== undefined &&
      pointad !== "" &&
      selectedUsers !== null &&
      selectedUsers !== undefined &&
      selectedUsers.length > 0
    ) {
      Axios.post("http://bibliever.com:3001/post/admin/givepoint", {
        giveres: giveres,
        pointad: pointad,
        users: selectedUsers,
      }).then((res) => {
        handleCloseModal();
      });
    } else {
      // 조건이 충족되지 않는 경우 알림을 띄우거나 다른 처리를 수행할 수 있음
      alert("모든 필수 정보를 입력해주세요.");
    }
  };

  const SubmitGiveALL = () => {
    console.log(giveres, pointad, selectedUsers);
    Axios.post("http://bibliever.com:3001/post/admin/giveall", {
      giveres: giveres,
      pointad: pointad,
    }).then((res) => {
      handleCloseModaltwo();
    });
  };
  useEffect(() => {
    Axios.get("http://bibliever.com:3001/get/admin/userlist")
      .then((res) => {
        const formattedData = res.data.map((user) => ({
          ...user,
          join_date: new Date(user.join_date).toLocaleDateString("ko-KR"),
        }));
        setUserData(formattedData);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [searchText]);
  useEffect(() => {
    console.log(selectedUsers);
  }, [selectedUsers]);

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setPointAD(0);
    setGiveres("");
  };
  const handleOpenModaltwo = () => {
    setModaltwoOpen(true);
  };
  const handleCloseModaltwo = () => {
    setModaltwoOpen(false);
    setPointAD(0);
    setGiveres("");
  };
  const handlePointUserButtonClick = () => {
    handleOpenModal();
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

    if (searchOption === "name") {
      filteredUsers = userData.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (searchOption === "nickname") {
      filteredUsers = userData.filter((user) =>
        user.nickname.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (searchOption === "email") {
      filteredUsers = userData.filter((user) =>
        user.email.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (searchOption === "private_key") {
      filteredUsers = userData.filter((user) =>
        user.private_key.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    // 검색 결과에 따라 페이지를 리셋하거나 현재 페이지를 유지할 수 있습니다.
    if (filteredUsers.length > 0) {
      setPage(1); // 검색 결과가 있으면 페이지를 1로 리셋합니다.
    } else {
      setPage(page); // 검색 결과가 없으면 현재 페이지를 유지합니다.
    }

    // 검색 결과를 업데이트합니다.
    setUserData(filteredUsers);
  };

  const indexOfLastUser = page * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(userData.length / usersPerPage);

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
  const handleSelectUser = (user) => {
    const userIndex = selectedUsers.findIndex(
      (selectedUser) => selectedUser.idx === user.idx
    );

    if (userIndex !== -1) {
      // 이미 선택된 사용자인 경우 선택 해제
      const updatedUsers = [...selectedUsers];
      updatedUsers.splice(userIndex, 1);
      setSelectedUsers(updatedUsers);
    } else {
      // 새로 선택된 사용자인 경우 선택
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    }
  };

  const buttonColors = {
    backgroundColor: "#5076dd",
    color: "white",
    width: "100px",
    height: "20px",
    margin: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div className="Main-Container">
      <div className="Header">
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
        <div className="select_area">
          <select value={searchOption} onChange={handleSearchOptionChange}>
            <option value="name">이름</option>
            <option value="nickname">닉네임</option>
            <option value="email">이메일</option>
            <option value="private_key">고유키</option>
          </select>
          <input
            type="text"
            placeholder="검색"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <button className="page_btn" onClick={handleSearch}>
            검색
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="Modal">
          <div className="Modal-Content">
            <div className="Modal-Content-Header">
              <h2>포인트 추가/차감</h2>
              <button
                className="PointAD-Close-BTN"
                onClick={() => handleCloseModal()}
              >
                닫기
              </button>
            </div>

            <div className="Modal-Content-Body">
              {selectedUsers.map((user, index) => (
                <div key={index}>
                  <p>{user.name},</p>
                  {/* 추가 정보나 입력 필드 등을 표시할 수 있습니다. */}
                </div>
              ))}
            </div>
            <div className="Modal-Content-Bottom">
              <div className="modal_bottom_box">
                <div className="modal_title">포인트 :</div>
                <input
                  type="text"
                  placeholder="예시) 추가 : 10 / 차감 : -10"
                  value={pointad}
                  onChange={handlePoint}
                  inputMode="numeric"
                  className="modal_input"
                />
              </div>
              <div className="modal_bottom_box">
                <div className="modal_title">내용 :</div>
                <input
                  type="text"
                  placeholder="내용 입력"
                  onChange={handleres}
                  className="modal_input"
                />
              </div>
            </div>
            <button className="Modal-Content-BTN" onClick={SubmitGive}>
              확인
            </button>
          </div>
        </div>
      )}
      {isModaltwoOpen && (
        <div className="Modal">
          <div className="Modal-Content">
            <div className="Modal-Content-Header">
              <h2>포인트 추가/차감</h2>
              <button
                className="PointAD-Close-BTN"
                onClick={() => handleCloseModaltwo()}
              >
                닫기
              </button>
            </div>

            <div className="Modal-Content-Body">
              <h2>전체 인원에 대하여 지급하는 부분입니다.</h2>
            </div>
            <div className="Modal-Content-Bottom">
              <div className="modal_bottom_box">
                <div className="modal_title">포인트 :</div>
                <input
                  type="text"
                  placeholder="예시) 추가 : 10 / 차감 : -10"
                  value={pointad}
                  onChange={handlePoint}
                  inputMode="numeric"
                  className="modal_input"
                />
              </div>
              <div className="modal_bottom_box">
                <div className="modal_title">내용 :</div>
                <input
                  type="text"
                  placeholder="내용 입력"
                  onChange={handleres}
                  className="modal_input"
                />
              </div>
            </div>
            <button className="Modal-Content-BTN" onClick={SubmitGiveALL}>
              확인
            </button>
          </div>
        </div>
      )}
      <div className="Main">
        <div className="Main-Header">
          <div className="Table-Header-Col short_table_20">
            <h1 className="Table-Col-Text">선택</h1>
          </div>
          <div className="Table-Header-Col short_table_20">
            <h1 className="Table-Col-Text">번호</h1>
          </div>
          <div className="Table-Header-Col">
            <h1 className="Table-Col-Text">가입일</h1>
          </div>
          <div className="Table-Header-Col short_table_30">
            <h1 className="Table-Col-Text">이름</h1>
          </div>
          <div className="Table-Header-Col">
            <h1 className="Table-Col-Text">이메일</h1>
          </div>
          <div className="Table-Header-Col short_table_30">
            <h1 className="Table-Col-Text">닉네임</h1>
          </div>
          <div className="Table-Header-Col">
            <h1 className="Table-Col-Text">고유키</h1>
          </div>
          <div className="Table-Header-Col short_table_50">
            <h1 className="Table-Col-Text"> 포인트</h1>
          </div>
        </div>
        {loading ? (
          <div className="loading">로딩중...</div>
        ) : (
          <div className="Main-body">
            {currentUsers.map((user, index) => (
              <div className="User-row" key={index}>
                <div className="Table-Col short_table_20">
                  <input
                    type="checkbox"
                    className="CB"
                    checked={selectedUsers.some(
                      (selectedUser) => selectedUser.idx === user.idx
                    )}
                    onChange={() => handleSelectUser(user)}
                  />
                </div>
                <div className="Table-Col short_table_20">
                  <p className="Content-Text">{indexOfFirstUser + index + 1}</p>
                </div>
                <div className="Table-Col">
                  <p className="Content-Text">{user.join_date}</p>
                </div>
                <div className="Table-Col short_table_30">
                  <p className="Content-Text">{user.name}</p>
                </div>
                <div className="Table-Col">
                  <p className="Content-Text">{user.email}</p>
                </div>
                <div className="Table-Col short_table_30">
                  <p className="Content-Text">{user.nickname}</p>
                </div>
                <div className="Table-Col">
                  <p className="Content-Text">{user.private_key}</p>
                </div>
                <div className="Table-Col short_table_50">
                  <p className="Content-Text">{user.total_point}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="Give-Point-Container">
          <button
            className="Point-User-Button"
            onClick={handlePointUserButtonClick}
          >
            선택 포인트 지급
          </button>
          <button
            className="Point-All-User-Button"
            onClick={handleOpenModaltwo}
          >
            전체 포인트 지급
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
    </div>
  );
};
export default PointAD;
