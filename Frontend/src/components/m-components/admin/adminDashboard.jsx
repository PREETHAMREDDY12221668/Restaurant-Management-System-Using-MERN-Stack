  // import React, { useEffect, useState } from 'react';
  // import axios from 'axios';
  // import  "./adminDashboard.css"
  // import CardSkeleton from '../../surya_ components/skeletonLoading/cardSkeleton';

  // const AdminDashboard = () => {
  //   const [cartItems, setCartItems] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState("");

  //   useEffect(() => {
  //     // Fetch cart data from the backend
  //     const fetchCartItems = async () => {
  //       try {
  //         const response = await axios.get('http://localhost:5000/api/cart/getAll'); // Adjust the endpoint URL if needed
  //         setCartItems(response.data);
  //       } catch (err) {
  //         setError("Failed to fetch cart items. Please try again later.");
  //         console.error(err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchCartItems();
  //   }, []);

  //   if (loading) return <p><CardSkeleton cards={5}/></p>;
  //   if (error) return <p style={{ color: 'red' }}>{error}</p>;

  //   return (
  //     <div className="admin-dashboard">
  //       <h1>Admin Dashboard</h1>
  //       <table className="cart-table">
  //         <thead>
  //           <tr>
  //             <th>User ID</th>
  //             <th>Product ID</th>
  //             <th>Name</th>
  //             <th>Description</th>
  //             <th>Price</th>
  //             <th>Quantity</th>
  //             <th>Category</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {cartItems.length > 0 ? (
  //             cartItems.map((item) => (
  //               <tr key={item._id}>
  //                 <td>{item.userId}</td>
  //                 <td>{item.productId}</td>
  //                 <td>{item.name}</td>
  //                 <td>{item.description}</td>
  //                 <td>{item.price}</td>
  //                 <td>{item.quantity}</td>
  //                 <td>{item.category}</td>
  //               </tr>
  //             ))
  //           ) : (
  //             <tr>
  //               <td colSpan="7" style={{ textAlign: 'center' }}>
  //                 No items found in the cart.
  //               </td>
  //             </tr>
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };

  // export default AdminDashboard;
  // import React, { useEffect, useState } from 'react';
  // import axios from 'axios';
  // import styles from './AdminDashboard.module.css';
  // import CardSkeleton from '../../surya_ components/skeletonLoading/cardSkeleton';
  // import { Popup } from '../../g-components/paymentMethod/Popup';

  // const AdminDashboard = () => {
  //   const [categories, setCategories] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState("");

  //   const updateItem=()=>{
      
  //   }
  //   const deleteItem=()=>{
      
  //   }
  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       try {
  //         const response = await axios.get('http://localhost:5000/api/items');
  //         setCategories(response.data.data);
  //       } catch (err) {
  //         setError("Failed to fetch products. Please try again later.");
  //         console.error(err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchProducts();
  //   }, []);

  //   if (loading) return <p><CardSkeleton cards={5}/></p>;
  //   if (error) return <p style={{ color: 'red' }}>{error}</p>;

  //   return (
  //     <div className={styles.adminDashboard}>
  //       <aside className={styles.sidebar}>
  //         <nav>
  //           <ul>
  //             <li>Products</li>
  //             <li>Deals</li>
  //             <li>Cart</li>
  //           </ul>
  //         </nav>
  //       </aside>
  //       <main className={styles.mainContent}>
  //         <header className={styles.header}>
  //           <h1>Admin Dashboard</h1>
  //           <button className={styles.addButton}>Add Product</button>
  //         </header>
  //         {categories.length > 0 ? (
  //           categories.map(category => (
  //             <section key={category._id} className={styles.categorySection}>
  //               <h2 className={styles.categoryTitle}>{category._id}</h2>
  //               <div className={styles.productGrid}>
  //                 {category.items.map(item => (
  //                   <div key={item._id} className={styles.productCard}>
  //                     <img src={item.image} alt={item.name} className={styles.productImage} />
  //                     <h3 className={styles.productName}>{item.name}</h3>
  //                     <p className={styles.productDescription}>{item.description}</p>
  //                     <p className={styles.productPrice}>₹{item.price}</p>
  //                     <div className={styles.actionButtons}>
  //                       <button className={styles.editButton} onClick={updateItem}>Edit</button>
  //                       <button className={styles.deleteButton} onClick={deleteItem}>Delete</button>
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>
  //             </section>
  //           ))
  //         ) : (
  //           <p className={styles.noItems}>No products available.</p>
  //         )}
  //       </main>
  //     </div>
  //   );
    
  // };

  // export default AdminDashboard;
  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import styles from './AdminDashboard.module.css';
  import CardSkeleton from '../../surya_ components/skeletonLoading/cardSkeleton';
  import { Popup } from '../../g-components/paymentMethod/Popup';
  
  const AdminDashboard = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activePopup, setActivePopup] = useState(false);
    const [popupTitle, setPopupTitle] = useState("");
    const [formData, setFormData] = useState({ name: "", description: "", price: "", image: "" });
    const [editingItemId, setEditingItemId] = useState(null); // Track if updating or adding
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/items');
          setCategories(response.data.data);
        } catch (err) {
          setError("Failed to fetch products. Please try again later.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }, []);
  
    // Function to handle input changes in the form
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // Function to open the popup for adding a product
    const addProduct = () => {
      setFormData({ name: "", description: "", price: "", image: "" });
      setPopupTitle("Add New Product");
      setEditingItemId(null); // Set to null for adding new product
      setActivePopup(true);
    };
  
    // Function to open the popup for updating a product
    const updateItem = (item) => {
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image || "",
        category :item.category || ""
      });
      setPopupTitle("Edit Product");
      setEditingItemId(item._id); // Store item ID for updating
      setActivePopup(true);
    };
  
    // Function to handle form submission for adding/updating
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (editingItemId) {
          // If editing, update the product
          await axios.put(`http://localhost:5000/api/items/${editingItemId}`, formData);
          setCategories((prev) =>
            prev.map((category) => ({
              ...category,
              items: category.items.map((item) =>
                item._id === editingItemId ? { ...item, ...formData } : item
              ),
            }))
          );
        } else {
          // If adding, create a new product
          const response = await axios.post('http://localhost:5000/api/items', formData);
          setCategories((prev) => {
            const updatedCategories = [...prev];
            updatedCategories[0].items.push(response.data); // Assuming adding to the first category
            return updatedCategories;
          });
        }
        setActivePopup(false);
      } catch (err) {
        console.error("Failed to save product:", err);
      }
    };
  
    if (loading) return <p><CardSkeleton cards={5} /></p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
  
    return (
      <div className={styles.adminDashboard}>
        <aside className={styles.sidebar}>
          <nav>
            <ul>
              <li>Products</li>
              <li>Deals</li>
              <li>Cart</li>
            </ul>
          </nav>
        </aside>
        <main className={styles.mainContent}>
          <header className={styles.header}>
            <h1>Admin Dashboard</h1>
            <button className={styles.addButton} onClick={addProduct}>Add Product</button>
          </header>
          {categories.length > 0 ? (
            categories.map(category => (
              <section key={category._id} className={styles.categorySection}>
                <h2 className={styles.categoryTitle}>{category._id}</h2>
                <div className={styles.productGrid}>
                  {category.items.map(item => (
                    <div key={item._id} className={styles.productCard}>
                      <img src={item.image} alt={item.name} className={styles.productImage} />
                      <h3 className={styles.productName}>{item.name}</h3>
                      <p className={styles.productDescription}>{item.description}</p>
                      <p className={styles.productPrice}>₹{item.price}</p>
                      <div className={styles.actionButtons}>
                        <button className={styles.editButton} onClick={() => updateItem(item)}>Edit</button>
                        <button className={styles.deleteButton}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <p className={styles.noItems}>No products available.</p>
          )}
        </main>
  
        {/* Popup Component */}
        {activePopup && (
          <Popup trigger={activePopup}>
            <div className={styles.popupContent}>
              <h2>{popupTitle}</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Product Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="Category"
                  placeholder="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
                <div className={styles.popupButtons}>
                  <button type="submit" className={styles.saveButton}>
                    {editingItemId ? "Update" : "Add"} Product
                  </button>
                  <button type="button" className={styles.cancelButton} onClick={() => setActivePopup(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Popup>
        )}
      </div>
    );
  };
  
  export default AdminDashboard;
  