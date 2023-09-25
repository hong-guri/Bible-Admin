import { useEffect, useState } from "react";
import "./Home.css";
import UserList from "../UserList/UserList";
import PointRule from "../Point/PointRule";
import PointAD from "../Point/PointAD";
import QuizList from "../Quiz/QuizList";
import NoticeList from "../Notice/NoticeList";
import AddItem from "../Store/AddItem";
import OrderList from "../Store/OrderList";
import FaqList from "../Faq/FaqList";
// import ItemList from "../Store/ItemList";
const Home = () => {
  const [option, setOption] = useState(1);
  const [usersub, setUserSub] = useState(1);
  const [pointsub, setPointSub] = useState(1);
  const [questionsub, setQuestionSub] = useState(1);
  const [noticesub, setNoticeSub] = useState(1);
  const [productsub, setProductSub] = useState(1);
  const [appset, setAppSet] = useState(1);

  useEffect(() => {
    console.log(pointsub);
  }, [pointsub]);
  let MainContents;
  switch (option) {
    case 1:
      MainContents = <UserList />;
      break;
    case 2:
      MainContents = pointsub === 1 ? <PointRule /> : <PointAD />;
      break;
    case 3:
      MainContents = <QuizList />;
      break;
    case 4:
      MainContents = <NoticeList />;
      break;
    case 5:
      MainContents = productsub === 1 ? <AddItem /> : <OrderList />;
      break;
    case 6:
      MainContents = <FaqList />;
      break;
      case 7:
        MainContents = appset === 1 ? <AddItem /> : <OrderList />;
        break;
    default:
      break;
  }

  return (
    <div className="User-Main-Container">
      <div className="MenuBar-Container">
        <div
          className={`Options  ${option === 1 ? "active" : ""}`}
          onClick={() => setOption(1)}
        >
          <h1 className="Options-Text">회원관리</h1>
        </div>
        <div
          className={`Options  ${option === 2 ? "active" : ""}`}
          onClick={() => setOption(2)}
        >
          <h1 className="Options-Text">포인트관리</h1>
        </div>
        <div
          className={`Options  ${option === 3 ? "active" : ""}`}
          onClick={() => setOption(3)}
        >
          <h1 className="Options-Text">문제확인</h1>
        </div>
        <div
          className={`Options  ${option === 4 ? "active" : ""}`}
          onClick={() => setOption(4)}
        >
          <h1 className="Options-Text">공지사항</h1>
        </div>
        <div
          className={`Options  ${option === 5 ? "active" : ""}`}
          onClick={() => setOption(5)}
        >
          <h1 className="Options-Text">상품관리</h1>
        </div>
        <div
          className={`Options  ${option === 6 ? "active" : ""}`}
          onClick={() => setOption(6)}
        >
          <h1 className="Options-Text">문의사항</h1>
        </div>
        {/* <div
          className={`Options  ${option === 7 ? "active" : ""}`}
          onClick={() => setOption(7)}
        >
          <h1 className="Options-Text">앱 관리</h1>
        </div> */}
      </div>
      <div className="Sub-Menu-Container">
        <div
          className={`Sub-Option ${option === 1 ? "active" : ""}`}
          onClick={() => setUserSub(1)}
        >
          <div
            className={`Sub-Menu-option ${
              option === 1 ? (usersub === 1 ? "active" : "") : ""
            }`}
          >
            <h1
              className={`Sub-Menu-Text ${
                option === 1 ? (usersub === 1 ? "active" : "") : ""
              }`}
            >
              회원리스트
            </h1>
          </div>
        </div>
        <div
          className={`Sub-Option ${
            option === 2 ? (option === 2 ? "active" : "") : ""
          }`}
        >
          <div
            className={`Sub-Menu-option ${option === 2 ? "active" : ""}`}
            onClick={() => setPointSub(1)}
          >
            <h1
              className={`Sub-Menu-Text ${
                option === 2 ? (pointsub === 1 ? "active" : "") : ""
              }`}
              onClick={() => setPointSub(1)}
            >
              포인트 정책
            </h1>
          </div>
          <div
            className={`Sub-Menu-option ${option === 2 ? "active" : ""}`}
            onClick={() => setPointSub(2)}
          >
            <h1
              className={`Sub-Menu-Text ${
                option === 2 ? (pointsub === 2 ? "active" : "") : ""
              }`}
              onClick={() => setPointSub(2)}
            >
              포인트 관리
            </h1>
          </div>
        </div>
        <div
          className={`Sub-Option ${option === 3 ? "active" : ""}`}
          onClick={() => setQuestionSub(1)}
        >
          <div
            className={`Sub-Menu-option ${
              option === 3 ? (questionsub === 1 ? "active" : "") : ""
            }`}
          >
            <h1
              className={`Sub-Menu-Text ${
                option === 3 ? (questionsub === 1 ? "active" : "") : ""
              }`}
            >
              문제리스트
            </h1>
          </div>
        </div>
        <div
          className={`Sub-Option ${option === 4 ? "active" : ""}`}
          onClick={() => setNoticeSub(1)}
        >
          <div
            className={`Sub-Menu-option ${
              option === 4 ? (noticesub === 1 ? "active" : "") : ""
            }`}
          >
            <h1
              className={`Sub-Menu-Text ${
                option === 4 ? (noticesub === 1 ? "active" : "") : ""
              }`}
            >
              공지리스트
            </h1>
          </div>
        </div>
        <div className={`Sub-Option ${option === 5 ? "active" : ""}`}>
          <div
            className={`Sub-Menu-option ${option === 5 ? "active" : ""}`}
            onClick={() => setProductSub(1)}
          >
            <h1
              className={`Sub-Menu-Text ${
                option === 5 ? (productsub === 1 ? "active" : "") : ""
              }`}
            >
              상품등록
            </h1>
          </div>

          <div
            className={`Sub-Menu-option ${option === 5 ? "active" : ""}`}
            onClick={() => setProductSub(3)}
          >
            <h1
              className={`Sub-Menu-Text ${
                option === 5 ? (productsub === 3 ? "active" : "") : ""
              }`}
            >
              주문내역
            </h1>
          </div>
        </div>

        <div
          className={`Sub-Option ${option === 6 ? "active" : ""}`}
          onClick={() => setNoticeSub(1)}
        >
          <div
            className={`Sub-Menu-option ${
              option === 6 ? (noticesub === 1 ? "active" : "") : ""
            }`}
          >
            <h1
              className={`Sub-Menu-Text ${
                option === 6 ? (noticesub === 1 ? "active" : "") : ""
              }`}
            >
              문의리스트
            </h1>
          </div>
        </div>
        {/* <div className={`Sub-Option ${option === 7 ? "active" : ""}`}>
          <div
            className={`Sub-Menu-option ${option === 7 ? "active" : ""}`}
            onClick={() => setAppSet(1)}
          >
            <h1
              className={`Sub-Menu-Text ${
                option === 7 ? (appset === 1 ? "active" : "") : ""
              }`}
            >
              버전
            </h1>
          </div>

          <div
            className={`Sub-Menu-option ${option === 7 ? "active" : ""}`}
            onClick={() => setAppSet(2)}
          >
            <h1
              className={`Sub-Menu-Text ${
                option === 7 ? (appset === 2 ? "active" : "") : ""
              }`}
            >
              업데이트 로그
            </h1>
          </div>
        </div> */}
      </div>
      <div className="Main-Screen">{MainContents}</div>
    </div>
  );
};

export default Home;
