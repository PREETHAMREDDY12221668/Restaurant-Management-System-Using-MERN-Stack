import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton"; // Import skeleton loader
import "react-loading-skeleton/dist/skeleton.css"; // Skeleton styles
import ItemPopup from "./itempopup"; // Import the popup component
import CartButton2, { CartButton1,CartButton } from "./menucart";
import { motion } from "framer-motion";
import styles from './GroceryDetails.module.css';

const GroceryItem = ({ name, description, price, image, category, _id }) => {
  const item = { name, description, price, image, category, _id };
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // State for the selected item
  
  // Animation variants
  const photo = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(5px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  };
  const desp = {
    hidden: { opacity: 0, x: -150 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true); 
    }, 0); // Simulate a loading delay
    return () => clearTimeout(loadTimer); 
  }, []);
  
  
  const handleItemClick = (item) => {
    setSelectedItem(item); // Set the clicked item data
  };

  const closePopup = () => {
    setSelectedItem(null); 
  };

  return (
    <><motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.5, duration: 0.9, type: "spring", delay: 0.6 }}
      className={styles.grocery}
    >
      <div
        className="upper"
        onClick={() => handleItemClick(item)}
      >
        <motion.img
          variants={photo}
          style={{ width: "auto", height: "350px", borderRadius: "15px", zIndex: 1 }}
          src={image}
          alt={name} />

        <motion.p
          style={{ fontWeight: 600, fontSize: '25px' }}
          variants={desp}
        >
          {name}
        </motion.p>
        <div className="price-div">
          <div style={{ display: "flex", flexDirection: "column", marginTop: "2px" }}>
            <motion.p style={{ fontWeight: '400' }} variants={desp}>
              {isLoaded ? (
                `₹ ${price}`
              ) : (
                <Skeleton height={20} width={"40%"} style={{ marginBottom: "0.5rem" }} />
              )}
            </motion.p>
            <motion.p variants={desp}>
              {isLoaded ? (
                description
              ) : (
                <Skeleton height={20} width={"80%"} />
              )}
            </motion.p>
          </div>
        </div>
      </div>
      <div className="lower">
        <CartButton2 item={item} />
      </div>
    </motion.div>
    <div>
    {selectedItem && (
      <ItemPopup
        item={selectedItem}
        onClose={closePopup} // Pass the close handler
      />
    )}
    </div></>
  );
};

export default GroceryItem;






 {/* {isLoaded ? (
        <CartButton item={item} />
      ) : (
        <Skeleton height={40} width={"100%"} style={{ marginTop: "1rem" }} />
      )} */}
      {/* <CartButton item={item} />
      <CartButton1 item={item} /> */}