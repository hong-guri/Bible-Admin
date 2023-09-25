import axios from "axios";
import { useEffect, useState } from "react";

const ItemList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://bibliever.com:3001/get/admin/store/itemlist")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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

  return (
    <div className="StoreMain">
      <div className="Store-ItemList-Container">
        {data.map((item) => (
          <div className="Store-ItemList" key={item.idx}>
            <h3>{item.item_name}</h3>
            <h3>수량: {item.ea}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
