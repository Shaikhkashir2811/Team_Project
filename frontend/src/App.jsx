import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginProfileModal from './components/signup'
import SkillSwapPlatform from './components/home'
import UserProfile from './components/requestbro.jsx'
import SkillSwapPlatform2 from './components/kk.jsx'
const mockUsers = [
  {
    id: 1,
    name: "Mark Brown",
    email: "mark@example.com",
    location: "San Francisco, CA",
    skills_offered: "React, Node.js, Python",
    skills_wanted: "Machine Learning, Docker",
    availability: "Weekends",
    profile: "Public",
    profile_photo: null,
    rating: 4.8
  },
  {
    id: 2,
    name: "Michael",
    email: "michael@example.com",
    location: "New York, NY",
    skills_offered: "Design, Figma, Photoshop",
    skills_wanted: "React, JavaScript",
    availability: "Evenings",
    profile: "Public",
    profile_photo: null,
    rating: 4.9
  },
  {
    id: 3,
    name: "Jane Willis",
    email: "jane@example.com",
    location: "Austin, TX",
    skills_offered: "Python, Data Science, SQL",
    skills_wanted: "Web Development, CSS",
    availability: "Flexible",
    profile: "Public",
    profile_photo: null,
    rating: 4.7
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    location: "Seattle, WA",
    skills_offered: "Java, Spring Boot, AWS",
    skills_wanted: "React Native, Mobile Dev",
    availability: "Weekdays",
    profile: "Public",
    profile_photo: null,
    rating: 4.6
  },
  {
    id: 5,
    name: "David Chen",
    email: "david@example.com",
    location: "Los Angeles, CA",
    skills_offered: "GraphQL, MongoDB, Express",
    skills_wanted: "DevOps, Kubernetes",
    availability: "Evenings",
    profile: "Public",
    profile_photo: null,
    rating: 4.8
  },
  {
    id: 6,
    name: "Emma Davis",
    email: "emma@example.com",
    location: "Chicago, IL",
    skills_offered: "UI/UX, Sketch, Wireframing",
    skills_wanted: "Frontend Development",
    availability: "Weekends",
    profile: "Public",
    profile_photo: null,
    rating: 4.9
  },  
];
function App() {
  // const [requests, setRequests] = useState([]);
  const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  // const [userss, setUserss] = useState([]);
    // useEffect(() => {
    //   const userId = localStorage.getItem("user_id")
    //   if (userId) {
    //     setIsLoggedIn(true);
    //     console.log("User is logged in with ID:", userId);
    //     console.log("User is logged in with ID:", userId);
    //   } else {
    //     setIsLoggedIn(false);
    //     console.log("User not logged in.");
    //   }
    // }, []);
  // useEffect(async () => {
  //   const userId = sessionStorage.getItem('user_id'); // or wherever you store it

  //   try {
  //     const res = await fetch(`http://localhost:5000/swap/responder/${userId}`);
  //     const data = await res.json();

  //     if (res.ok) {
  //       console.log("Received requests:", data);
  //       setUsers(data)
  //       // update state here
  //     } else {
  //       alert("Error fetching requests: " + data.error);
  //     }
  //   } catch (error) {
  //     console.error("Request fetch error:", error);
  //     alert("Something went wrong.");
  //   }
  // }, []);
  // useEffect(async () => {
  //   const userId = sessionStorage.getItem('user_id'); // or wherever you store it

  //   try {
  //     const res = await fetch(`http://localhost:5000/users`);
  //     const data = await res.json();

  //     if (res.ok) {
  //       console.log("Received requests:", data);
  //       setUsers(data)
  //       // update state here
  //     } else {
  //       alert("Error fetching requests: " + data.error);
  //     }
  //   } catch (error) {
  //     console.error("Request fetch error:", error);
  //     alert("Something went wrong.");
  //   }
  // }, []);
  useEffect(() => {
  const userId = localStorage.getItem("user_id");
  if (userId) {
    setIsLoggedIn(true);
    console.log("User is logged in with ID:", userId);
  } else {
    setIsLoggedIn(false);
    console.log("User not logged in.");
  }
}, []);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users`);
      const data = await res.json();
      if (res.ok) {
        console.log("Received users:", data);
        setUsers(data);
      } else {
        alert("Error fetching users: " + data.error);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Something went wrong.");
    }
  };

  fetchUsers();
}, []);

  return (
    //  <LoginProfileModal/>
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<SkillSwapPlatform userss={mockUsers} islog={isLoggedIn} setIsLog={setIsLoggedIn} />} />
        <Route path="/user/:id" element={<UserProfile users={mockUsers} />} />
        <Route path="/user/me" element={<SkillSwapPlatform2/>} />
        {/* <Route path="/addto" element={<Modal />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
