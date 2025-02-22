import React from "react";
import styles from "./GroceryDetails.module.css";
import { delay, easeInOut, motion } from "framer-motion";
import CartButton2 from "./menucart";
const ItemPopup = ({ item, onClose }) => {
  const right = {
    hidden: { opacity: 0, x: -100, filter: "blur(5px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  };
  const left = {
    hidden: {  x: 0,filte:"blur(5px)" },
    visible: { filte:"blur(0px)" },
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        <motion.div 
        variants={left}
        initial="hidden"
        animate="visible"
        transition={{delay:2.6 ,ease:"easeInOut"}}
        className={styles.left}>
        <motion.img
            initial="hidden"
            animate="visible"
            transition={{
              delay:2.6 ,
              ease:"easeInOut"
            }}
  
          src={item.image || "placeholder.jpg"} // Replace with a placeholder if image is unavailable
          alt={item.name}
          className={styles.itemImage}
        />
        </motion.div>

       <motion.div
        className={styles.right}
        variants={right}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: "easeInOut" ,delay:0.5}}
        >
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{item.name}</h2>
        <p>{item.description || "No description available"}</p>
        <p>
          <strong>Price:</strong> ₹ {item.price || "N/A"}
        </p>
        <button className={styles.addToCartButton}><CartButton2 item={item} /></button>
        </motion.div>
      </div>
    </div>
  );
};

export default ItemPopup;