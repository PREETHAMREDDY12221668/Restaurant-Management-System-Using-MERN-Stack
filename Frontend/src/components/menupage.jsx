
// import React, { useEffect, useRef, useState } from "react";
// import CartButton from "./menucart";
// import GroceryItem from "./menuitem";
// import Sidebar from "./sidebar";
// import styles from './GroceryDetails.module.css'; // Import the new CSS
// import { motion, spring } from "framer-motion";

// const GroceryDetails = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const cat_heading = {
//     hidden: { opacity: 0, x: -50},
//     visible: { opacity: 1, x: 0},
//   };

//   // Create refs for each category
//   const categoryRefs = useRef({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/items");
//         if (!response.ok) {
//           throw new Error("Failed to fetch menu data");
//         }
//         const result = await response.json();
//         setData(result.data); // Expecting 'data' as an array of category groups
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Scroll to the selected category when it changes
//   useEffect(() => {
//     if (selectedCategory && categoryRefs.current[selectedCategory]) {
//       categoryRefs.current[selectedCategory].scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }, [selectedCategory]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//       <motion.div
//           initial="hidden"  // Initial animation state
//           animate="visible"  // Animation state after component mounts
//           transition={{ staggerChildren: 0.5, duration: 0.3 , delay:0.6}} // Delays between items and duration of animation
//         >
//       <Sidebar onCategorySelect={setSelectedCategory} className={styles.side} />
//       <div className={styles.container}>
//         {data.map((categoryGroup) => (
//           <div
//             key={categoryGroup._id}
//             ref={(el) => (categoryRefs.current[categoryGroup._id] = el)}
//             className={styles.categorySection}
            
//           >
//             <motion.h2
//                 className={styles.categoryHeading} // Add a custom CSS class for styling if needed
//                 variants={cat_heading} // Apply heading animation
//                 transition={{ duration: 0.6, ease: "easeInOut",type:spring }}
//               >
//                 {categoryGroup._id}
//               </motion.h2>
//             {categoryGroup.items.map((item) => (
//               <div key={item._id || item.id} className={styles.categoryItem}>
//                 <GroceryItem {...item} />
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//       </motion.div>
//     </>
//   );
// };

// export default GroceryDetails;
import React, { useEffect, useRef, useState, useCallback } from "react";
import CartButton from "./menucart";
import GroceryItem from "./menuitem";
import Sidebar from "./sidebar";
import styles from './GroceryDetails.module.css';
import Navbar from "./shhivajiscompo/navbar/Navbar";
import { motion, spring } from "framer-motion";

const GroceryDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleCategories, setVisibleCategories] = useState({});

  const cat_heading = {
    hidden: { opacity: 0, x: -50, filter: "blur(5px)" },
    visible: { opacity: 1, x: 0,filter:"blur(0px)" },
  };

  // Create refs for each category
  const categoryRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/items");
        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }
        const result = await response.json();
        setData(result.data); // Expecting 'data' as an array of category groups
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Scroll to the selected category when it changes
  useEffect(() => {
    if (selectedCategory && categoryRefs.current[selectedCategory]) {
      categoryRefs.current[selectedCategory].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedCategory]);

  // Lazy load categories with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCategories((prev) => ({
              ...prev,
              [entry.target.dataset.category]: true,
            }));
          }
        });
      },
      { rootMargin: "0px 0px 200px 0px" } // Load before fully visible
    );

    Object.keys(categoryRefs.current).forEach((categoryId) => {
      if (categoryRefs.current[categoryId]) {
        observer.observe(categoryRefs.current[categoryId]);
      }
    });

    return () => {
      Object.keys(categoryRefs.current).forEach((categoryId) => {
        if (categoryRefs.current[categoryId]) {
          observer.unobserve(categoryRefs.current[categoryId]);
        }
      });
    };
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <Navbar />
     <Sidebar onCategorySelect={setSelectedCategory} className={styles.side} />
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.6, duration: 0.3, delay: 0.6 }}
      >
       
        <div className={styles.container}>
          {data.map((categoryGroup) => (
            <div
              key={categoryGroup._id}
              ref={(el) => (categoryRefs.current[categoryGroup._id] = el)}
              data-category={categoryGroup._id}
              className={styles.categorySection}
            >
              <motion.h2
                className={styles.categoryHeading}
                variants={cat_heading}
                transition={{ duration: 0.6, ease: "easeInOut", type: spring }}
              >
                {categoryGroup._id}
              </motion.h2>
              {visibleCategories[categoryGroup._id] &&
                categoryGroup.items.map((item) => (
                  <div key={item._id || item.id} 
                  className={styles.categoryItem} 
                  style={
                    {
                      boxShadow :" 10px 10px 19px rgba(0, 0, 0, 0.3)",
                      margin:"20px",
                      borderRadius:"35px",
                      padding:"20px",
                      width:"380px",
                      display:"flex",
                      alignItems:"center",
                      borderLeft:""
                    }
                  }
                  >
                    <GroceryItem {...item} />
                  </div>
                ))}
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default GroceryDetails;
