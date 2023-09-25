import { useEffect, useState } from "react";
import "./UserList.css";
import "../Css/Table.css";
import Axios from "axios";
const UserList = () => {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchOption, setSearchOption] = useState("name");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [usersPerPage, setUsersPage] = useState(5);
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

  const handleSearchOptionChange = (e) => {
    setSearchOption(e.target.value);
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
      <div className="Main">
        <div className="Main-Header">
          <div className="Table-Header-Col short_table_20">
            <div className="Table-Col-Text">번호</div>
          </div>
          <div className="Table-Header-Col">
            <div className="Table-Col-Text">가입일</div>
          </div>
          <div className="Table-Header-Col short_table_20">
            <div className="Table-Col-Text">이름</div>
          </div>
          <div className="Table-Header-Col">
            <div className="Table-Col-Text">이메일</div>
          </div>
          <div className="Table-Header-Col short_table_30">
            <div className="Table-Col-Text">닉네임</div>
          </div>
          <div className="Table-Header-Col ">
            <div className="Table-Col-Text">고유키</div>
          </div>
          <div className="Table-Header-Col short_table_50">
            <div className="Table-Col-Text"> 포인트</div>
          </div>
        </div>
        {loading ? (
          <div className="loading">로딩중...</div>
        ) : (
          <div className="Main-body">
            {currentUsers.map((user, index) => (
              <div className="User-row" key={index}>
                <div className="Table-Col short_table_20">
                  <p className="Content-Text">{indexOfFirstUser + index + 1}</p>
                </div>
                <div className="Table-Col">
                  <p className="Content-Text">{user.join_date}</p>
                </div>
                <div className="Table-Col short_table_20">
                  <p className="Content-Text">{user.name}</p>
                </div>
                <div className="Table-Col">
                  <p className="Content-Text">{user.email}</p>
                </div>
                <div className="Table-Col short_table_30">
                  <p className="Content-Text">{user.nickname}</p>
                </div>
                <div className="Table-Col ">
                  <p className="Content-Text">{user.private_key}</p>
                </div>
                <div className="Table-Col short_table_50">
                  <p className="Content-Text">{user.total_point}</p>
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
    </div>
  );
};
export default UserList;
