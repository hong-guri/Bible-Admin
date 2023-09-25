import Axios from "axios";
import { useEffect, useState } from "react";
import "../Css/Table.css";

const ItemList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [usersPerPage] = useState(10);

  const [changeCategory, setCategory] = useState(false);

  useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = () => {
    Axios.get("http://bibliever.com:3001/api/get/store/pendingitem")
      .then((res) => {
        setData(res.data);
        setCategory(true);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  // 카테고리별 항목 수 계산
  const getCategoryCounts = () => {
    const categoryCounts = {};
    data.forEach((item) => {
      const { idx } = item;
      if (categoryCounts[idx]) {
        categoryCounts[idx]++;
      } else {
        categoryCounts[idx] = 1;
      }
    });
    return categoryCounts;
  };

  const categoryCounts = getCategoryCounts();

  // 카테고리 이름 변환 함수
  const getCategoryName = (cate) => {
    console.log(cate);
    switch (cate) {
      case "1":
        return "알찬미";
      case "2":
        return "5분도 현미 누룽지";
      case "3":
        return "매주 콩 누룽지";
      case "4":
        return "그러니까 힘내세요";
      default:
        return "오류";
    }
  };

  const indexOfLastUser = page * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentOrder = data.slice(indexOfFirstUser, indexOfLastUser);
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

  const handleApprove = (idx) => {
    // 여기에 승인 로직을 작성합니다.
    // 승인 버튼을 누른 퀴즈를 서버에 승인 요청하고, 데이터를 업데이트합니다.
    // console.log("승인 버튼을 눌렀습니다. 퀴즈 인덱스:", idx);
    if (idx !== null && idx !== undefined && idx !== "") {
      Axios.post("http://bibliever.com:3001/api/post/admin/", {
        num: idx,
      }).then((res) => {
        alert("승인되었습니다.");
        getOrderList();
      });
    } else {
      // 조건이 충족되지 않는 경우 알림을 띄우거나 다른 처리를 수행할 수 있음
      alert("승인에 실패하였습니다.");
    }
  };

  const handleRefund = (index, value) => {
    console.log(index, value, "내용 전달");

    if (index !== null && index !== undefined && index !== "") {
      Axios.post("http://bibliever.com:3001/api/post/store/confirmitem", {
        idx: index,
        confirm: value,
      }).then((res) => {
        alert("변경 되었습니다.");
        getOrderList();
      });
    } else {
      // 조건이 충족되지 않는 경우 알림을 띄우거나 다른 처리를 수행할 수 있음
      alert("반려 실패하였습니다.");
    }
  };

  const [selectedMenu, setSelectedMenu] = useState("default");

  useEffect(() => {}, [selectedMenu]);
  const handleConfirmChange = (e, index) => {
    setSelectedMenu(e.target.value); // 선택한 메뉴 업데이트
    handleRefund(index, e.target.value);
  };
  const getClassForOrder = (confirm) => {
    switch (confirm) {
      case "wait":
        return "waiting";
      case "reject":
        return "rejected";
      case "acc":
        return "delivered";
      default:
        return "";
    }
  };
  return (
    <div className="order_container">
      <div className="Main">
        <div className="Main-Header">
          <div className="Table-Header-Col short_table_20">
            <h1 className="Table-Col-Text">주문 번호</h1>
          </div>
          <div className="Table-Header-Col">
            <h1 className="Table-Col-Text">상품명</h1>
          </div>
          <div className="Table-Header-Col">
            <h1 className="Table-Col-Text">주문자</h1>
          </div>
          <div className="Table-Header-Col">
            <h1 className="Table-Col-Text">주소</h1>
          </div>
          <div className="Table-Header-Col">
            <h1 className="Table-Col-Text">전화번호</h1>
          </div>
          <div className="Table-Header-Col short_table_20">
            <h1 className="Table-Col-Text">수량</h1>
          </div>
          <div className="Table-Header-Col ">
            <h1 className="Table-Col-Text">날짜</h1>
          </div>
          <div className="Table-Header-Col ">
            <h1 className="Table-Col-Text">승인여부</h1>
          </div>
        </div>
        <div className="Main-body">
          {currentOrder.map((order, index) => (
            <div className="User-row" key={index}>
              <div className="Table-Col short_table_20">
                <p className="Content-Text">{order.idx}</p>
              </div>
              <div className="Table-Col">
                <p className="Content-Text">{order.item_name}</p>
              </div>
              <div className="Table-Col">
                <p className="Content-Text">{order.name}</p>
              </div>
              <div className="Table-Col">
                <p className="Content-Text">{order.adress}</p>
              </div>
              <div className="Table-Col">
                <p className="Content-Text">{order.phone}</p>
              </div>
              <div className="Table-Col short_table_20">
                <p className="Content-Text">{order.item_ea}</p>
              </div>
              <div className="Table-Col">
                <p className="Content-Text">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="Table-Col">
                <select
                  value={order.confirm}
                  onChange={(e) => handleConfirmChange(e, order.idx)}
                  className={`${getClassForOrder(order.confirm)}`}
                  style={{
                    color: "white",
                    borderWidth: 0,
                    borderRadius: 5,
                    width: "100%",
                    maxWidth: 100,
                    height: 30,
                  }}
                >
                  <option value="wait">대기중</option>
                  <option value="reject">보류</option>
                  <option value="acc">배송</option>
                </select>
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
    </div>
  );
};

export default ItemList;
