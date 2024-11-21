
// import React from "react";
// import { useDispatch } from "react-redux";
// import { addToCart, DecQty, IncQty } from "../redux/guddu/cartRedux/CartAction";

// const CartButton = ({ item }) => {
//   const [count, setCount] = React.useState(0);
//   const dispatch = useDispatch();

//   const handleInc = () => {
//     setCount(count + 1);
//     dispatch(IncQty(item.name));
//   };

//   const handleDec = () => {
//     if (count > 1) {
//       setCount(count - 1);
//       dispatch(DecQty(item.name));
//     }
//   };

//   const handleBtn = () => {
//     setCount(1);
//     dispatch(addToCart(item));
//   };

//   return (
//     <div className="bt">
//       {count === 0 ? (
//         <button className="addcart" onClick={handleBtn}>
//           Add to Cart
//         </button>
//       ) : (
//         <div className="btn-div">
//           <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//             <button
//               className="btn"
//               style={{
//                 padding: "10px",
//                 fontSize: "20px",
//                 width: "45px",
//                 borderRadius: "50%",
//               }}
//               onClick={handleDec}
//             >
//               -
//             </button>
//             <p className="count-item">{count}</p>
//             <button
//               className="btn"
//               style={{
//                 padding: "10px",
//                 fontSize: "20px",
//                 width: "45px",
//                 borderRadius: "50%",
//               }}
//               onClick={handleInc}
//             >
//               +
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartButton;
// import React from "react";
// import { useDispatch } from "react-redux";
// import { addToCart, DecQty, IncQty } from "../redux/guddu/cartRedux/CartAction";

// const CartButton = ({ item }) => {
//   const [count, setCount] = React.useState(0);
//   const dispatch = useDispatch();

//   const handleInc = () => {
//     setCount(count + 1);
//     dispatch(IncQty(item._id)); // Use _id instead of id
//   };

//   const handleDec = () => {
//     if (count > 1) {
//       setCount(count - 1);
//       dispatch(DecQty(item._id)); // Use _id instead of id
//     } else {
//       setCount(0);
//       dispatch({ type: "REM_ONE", payload: item._id }); // Use _id for removal
//     }
//   };

//   const handleBtn = () => {
//     setCount(1);
//     dispatch(addToCart(item)); // Pass entire item object with _id
//   };

//   return (
//     <div className="bt" >
//       {count === 0 ? (
//         <button className="addcart" onClick={handleBtn}>
//           Add to Cart
//         </button>
//       ) : (
//         <div className="btn-div">
//           <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
//             <button
//               className="btn"
//               style={{
//                 padding: "10px",
//                 fontSize: "20px",
//                 width: "50px",
//                 height:"auto",
//                 borderRadius: "50%",
//                 border: "1px solid black"
//               }}
//               onClick={handleDec}
//             >
//               -
//             </button>
//             <p className="count-item">{count}</p>
//             <button
//               className="btn"
//               style={{
//                 padding: "10px",
//                 fontSize: "20px",
//                 width: "50px",
//                 height:"auto",
//                 borderRadius: "50%",
//                 border: "1px solid black"
//               }}
//               onClick={handleInc}
//             >
//               +
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartButton;
// import React from "react";
// import { useDispatch } from "react-redux";
// import { addToCart, DecQty, IncQty } from "../redux/guddu/cartRedux/CartAction";
// import { getAuth } from "firebase/auth"; // Firebase auth import
// import { useNavigate } from "react-router-dom"; // For navigation
// import { toast } from "react-toastify"; // For notifications
// import "react-toastify/dist/ReactToastify.css"; // Toastify styles

// const CartButton = ({ item }) => {
//   const [count, setCount] = React.useState(0);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const auth = getAuth();

//   const handleInc = () => {
//     setCount(count + 1);
//     dispatch(IncQty(item._id)); // Use _id instead of id
//   };

//   const handleDec = () => {
//     if (count > 1) {
//       setCount(count - 1);
//       dispatch(DecQty(item._id)); // Use _id instead of id
//     } else {
//       setCount(0);
//       dispatch({ type: "REM_ONE", payload: item._id }); // Use _id for removal
//     }
//   };

//   const handleBtn = () => {
//     const user = auth.currentUser; // Check if the user is logged in

//     if (user) {
//       // User is logged in
//       setCount(1);
//       dispatch(addToCart(item)); // Pass entire item object with _id
//     } else {
//       // User is not logged in
//       toast.warn("Please log in to add items to the cart!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//       navigate("/login"); // Redirect to login route
//     }
//   };

//   return (
//     <div className="bt">
//       {count === 0 ? (
//         <button className="addcart" onClick={handleBtn}>
//           Add to Cart
//         </button>
//       ) : (
//         <div className="btn-div">
//           <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
//             <button
//               className="btn"
//               style={{
//                 padding: "10px",
//                 fontSize: "20px",
//                 width: "50px",
//                 height: "auto",
//                 borderRadius: "50%",
//                 border: "1px solid black",
//               }}
//               onClick={handleDec}
//             >
//               -
//             </button>
//             <p className="count-item">{count}</p>
//             <button
//               className="btn"
//               style={{
//                 padding: "10px",
//                 fontSize: "20px",
//                 width: "50px",
//                 height: "auto",
//                 borderRadius: "50%",
//                 border: "1px solid black",
//               }}
//               onClick={handleInc}
//             >
//               +
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartButton;
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, DecQty, IncQty } from "../redux/guddu/cartRedux/CartAction";
import { getAuth } from "firebase/auth"; // Firebase auth import
import { useNavigate } from "react-router-dom"; // For navigation
import { toast } from "react-toastify"; // For notifications
import "react-toastify/dist/ReactToastify.css"; // Toastify styles

const CartButton = ({ item }) => {
  const [count, setCount] = React.useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleInc = () => {
    setCount(count + 1); // Update local count
    dispatch(IncQty(item._id)); // Dispatch IncQty with item._id to update Redux store
  };

  const handleDec = () => {
    if (count > 1) {
      setCount(count - 1); // Update local count
      dispatch(DecQty(item._id)); // Dispatch DecQty with item._id to update Redux store
    } else if (count === 1) {
      setCount(0); // Reset count if it's 1
      dispatch({ type: "REM_ONE", payload: item._id }); // Remove item from Redux store
    }
  };

  const handleBtn = () => {
    const user = auth.currentUser; // Check if the user is logged in

    if (user) {
      // User is logged in
      setCount(1); // Start the count at 1 when adding to cart
      dispatch(addToCart(item)); // Dispatch addToCart with the full item object
    } else {
      // User is not logged in
      toast.warn("Please log in to add items to the cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      navigate("/login"); // Redirect to login route
    }
  };

  return (
    <div className="bt">
      {count === 0 ? (
        <button className="addcart" onClick={handleBtn}>
          Add to Cart
        </button>
      ) : (
        <div className="btn-div">
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <button
              className="btn"
              style={{
                padding: "10px",
                fontSize: "20px",
                width: "50px",
                height: "auto",
                borderRadius: "50%",
                border: "1px solid black",
              }}
              onClick={handleDec}
            >
              -
            </button>
            <p className="count-item">{count}</p>
            <button
              className="btn"
              style={{
                padding: "10px",
                fontSize: "20px",
                width: "50px",
                height: "auto",
                borderRadius: "50%",
                border: "1px solid black",
              }}
              onClick={handleInc}
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartButton;
