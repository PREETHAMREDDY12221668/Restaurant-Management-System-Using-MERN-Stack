
// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const UserProfile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userDetails, setUserDetails] = useState({
//     name: "John Doe",
//     email: "johndoe@example.com",
//     phone: "123-456-7890",
//     address: "123 Main Street, Springfield, USA",
//   });

//   const [activeSection, setActiveSection] = useState("Orders"); // Sidebar active section

//   const sections = [
//     { name: "Orders", id: "orders" },
//     { name: "Gift Cards", id: "gift-cards" },
//     { name: "Contact Us", id: "contact-us" },
//     { name: "Saved Cards", id: "saved-cards" },
//     { name: "Logout", id: "logout" },
//   ];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails({ ...userDetails, [name]: value });
//   };

//   const toggleEdit = () => setIsEditing(!isEditing);

//   const handleSectionChange = (section) => {
//     if (section === "logout") {
//       alert("You have been logged out.");
//       // Add your logout logic here
//     } else {
//       setActiveSection(section);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-white">
//       {/* Sidebar */}
//       <motion.div
//         initial={{ x: -200 }}
//         animate={{ x: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-64 bg-red-600 text-white p-6 flex flex-col space-y-6"
//       >
//         <h2 className="text-2xl font-bold">User Dashboard</h2>
//         <nav className="space-y-4">
//           {sections.map((section) => (
//             <button
//               key={section.id}
//               onClick={() => handleSectionChange(section.id)}
//               className={`block w-full text-left px-4 py-2 rounded-lg ${
//                 activeSection === section.id
//                   ? "bg-white text-red-600 font-bold"
//                   : "hover:bg-red-500"
//               }`}
//             >
//               {section.name}
//             </button>
//           ))}
//         </nav>
//       </motion.div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="mb-8"
//         >
//           <h1 className="text-4xl font-bold text-red-600 mb-2">
//             {activeSection}
//           </h1>
//           <p className="text-gray-600">
//             {activeSection === "Orders"
//               ? "View your order history and manage orders."
//               : activeSection === "Gift Cards"
//               ? "Manage your gift cards and redeem codes."
//               : activeSection === "Contact Us"
//               ? "Reach out to us for any assistance."
//               : activeSection === "Saved Cards"
//               ? "View and manage your saved payment methods."
//               : ""}
//           </p>
//         </motion.div>

//         {/* Dynamic Section Content */}
//         {activeSection === "Orders" && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="space-y-4"
//           >
//             <div className="p-4 bg-gray-100 rounded-lg shadow">
//               <p className="font-semibold">Wireless Earbuds</p>
//               <p className="text-gray-500">Delivered on 2024-10-01</p>
//             </div>
//             <div className="p-4 bg-gray-100 rounded-lg shadow">
//               <p className="font-semibold">Smartphone</p>
//               <p className="text-gray-500">Shipped on 2024-09-15</p>
//             </div>
//           </motion.div>
//         )}

//         {activeSection === "Gift Cards" && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="p-6 bg-gray-100 rounded-lg shadow"
//           >
//             <p>No gift cards available. Add or redeem a gift card code.</p>
//           </motion.div>
//         )}

//         {activeSection === "Contact Us" && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="p-6 bg-gray-100 rounded-lg shadow"
//           >
//             <p>Email: support@example.com</p>
//             <p>Phone: +123-456-7890</p>
//             <p>Address: 123 Main Street, Springfield, USA</p>
//           </motion.div>
//         )}

//         {activeSection === "Saved Cards" && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.8 }}
//             className="p-6 bg-gray-100 rounded-lg shadow"
//           >
//             <p>No saved cards available. Add a payment method.</p>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth imports
import { Otp } from "./Otp";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "123-456-7890",
    address: "123 Main Street, Springfield, USA",
  });
  const [activeSection, setActiveSection] = useState("Orders"); // Sidebar active section
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To check user login status

  const sections = [
    { name: "Orders", id: "orders" },
    { name: "Gift Cards", id: "gift-cards" },
    { name: "Contact Us", id: "contact-us" },
    { name: "Saved Cards", id: "saved-cards" },
    { name: "Logout", id: "logout" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSectionChange = (section) => {
    if (section === "logout") {
      const auth = getAuth();
      auth.signOut()
        .then(() => {
          alert("You have been logged out.");
          setIsLoggedIn(false);
        })
        .catch((error) => alert("Error logging out: " + error.message));
    } else {
      setActiveSection(section);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          name: user.displayName || "User",
          email: user.email,
        }));
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isLoggedIn) {
    return <Otp />; // Render Login component if user is not logged in
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-64  text-white p-6 flex flex-col space-y-6"
      >
        <h2 className="text-2xl font-bold">User Dashboard</h2>
        <nav className="space-y-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionChange(section.id)}
              className={`block w-full text-left px-4 py-2 rounded-lg ${
                activeSection === section.id
                  ? "bg-white text-red-600 font-bold"
                  : "hover:bg-red-500"
              }`}
            >
              {section.name}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            {activeSection}
          </h1>
          <p className="text-gray-600">
            {activeSection === "Orders"
              ? "View your order history and manage orders."
              : activeSection === "Gift Cards"
              ? "Manage your gift cards and redeem codes."
              : activeSection === "Contact Us"
              ? "Reach out to us for any assistance."
              : activeSection === "Saved Cards"
              ? "View and manage your saved payment methods."
              : ""}
          </p>
        </motion.div>

        {/* Dynamic Section Content */}
        {activeSection === "Orders" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="font-semibold">Wireless Earbuds</p>
              <p className="text-gray-500">Delivered on 2024-10-01</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="font-semibold">Smartphone</p>
              <p className="text-gray-500">Shipped on 2024-09-15</p>
            </div>
          </motion.div>
        )}

        {activeSection === "Gift Cards" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="p-6 bg-gray-100 rounded-lg shadow"
          >
            <p>No gift cards available. Add or redeem a gift card code.</p>
          </motion.div>
        )}

        {activeSection === "Contact Us" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="p-6 bg-gray-100 rounded-lg shadow"
          >
            <p>Email: support@example.com</p>
            <p>Phone: +123-456-7890</p>
            <p>Address: 123 Main Street, Springfield, USA</p>
          </motion.div>
        )}

        {activeSection === "Saved Cards" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="p-6 bg-gray-100 rounded-lg shadow"
          >
            <p>No saved cards available. Add a payment method.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
