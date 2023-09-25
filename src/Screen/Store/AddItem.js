import { useEffect, useState } from "react";
import "./Store.css";
import "./Storet.css";
import Axios from "axios";
const AddItem = () => {
  const [products, setProducts] = useState([]);
  //상품 수량 등록
  const handleConfirm = (itemIdx, quantity) => {
    if (quantity > 0) {
      Axios.post("http://bibliever.com:3001/post/admin/store/additem", {
        idx: itemIdx,
        ea: quantity,
      })
        .then((res) => {
          console.log(res.data);
          // 등록이 성공하면 해당 상품의 수량을 업데이트
          const updatedProducts = products.map((product) =>
            product.idx === itemIdx
              ? { ...product, ea: product.ea + quantity }
              : product
          );
          setProducts(updatedProducts);
          alert("상품이 추가 되었습니다.");
          setModal(false);
        })
        .catch((err) => console.log(err));
    } else {
      alert("수량을 입력해주세요.");
    }
  };

  useEffect(() => {
    Axios.get("http://bibliever.com:3001/get/admin/store/itemlist")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modal, setModal] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    console.log("open", selectedProduct, modal);
  };

  const modalOpen = (product) => {
    handleProductClick(product);
    setModal(true);
  };
  const handleModalClose = () => {
    setSelectedProduct(null);
    setModal(false);
  };

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value, 10);
    setSelectedProduct({ ...selectedProduct, quantity: quantity });
  };
  const ModalView = () => {
    if (modal) {
      return (
        <div className="modal-background">
          <div className="modal-content-detail">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>{selectedProduct.item_name}</h2>
            <p>{selectedProduct.item_fullname}</p>
            <label htmlFor="quantity">수량:</label>
            <input
              type="number"
              id="quantity"
              min="0"
              value={selectedProduct.quantity || 0}
              onChange={handleQuantityChange}
            />
            <button
              className="confirm-button" // Add a new class "confirm-button"
              onClick={() =>
                handleConfirm(selectedProduct.idx, selectedProduct.quantity)
              }
            >
              확인
            </button>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="add-item-container">
      <h2 className="add-item-title">상품 목록</h2>
      <div className="product-list">
        {products.map((product) => (
          <div
            className="product-item"
            key={product.idx}
            onClick={() => modalOpen(product)}
          >
            <div>
              <strong>{product.item_name}</strong>
              <p>{product.item_fullname}</p>
              <p>카테고리: {product.item_cate}</p>
              <p>수량: {product.ea}</p>
            </div>
          </div>
        ))}
      </div>
      {ModalView()}
    </div>
  );
};

export default AddItem;
