import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import Signup from './signup';
import Login from './login2';
// import SwapRequestModal from './';
import { Link } from 'react-router-dom';
// Mock data - replace with your Flask API call
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
  }
];

// Header Component
const Header = ({ onSearch,islog,setIsLog }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availability, setAvailability] = useState('');
  const [isModalOpen, setOpen] = useState(false)
  const [isSignup, setSign] = useState(false)
  const handleSearch = (e) => {
    onSearch(searchTerm, availability);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Skill Swap Platform</h1>
          </div>
          {!islog ? (
  <>
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      onClick={() => {
        console.log("Login clicked");
        setOpen(true);
      }}
    >
      Login
    </button>

    <button
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      onClick={() => {
        console.log("Signup clicked");
        setSign(true);
      }}
    >
      Signup
    </button>

    <Login isOpen={isModalOpen} setIsOpen={setOpen} />
    <Signup isOpen={isSignup} setIsOpen={setSign} />
  </>
) : (
  <>
    <div className="text-green-700 font-bold">Welcome! You are logged in.</div>
    <Link to={`/user/me`}>
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
      
      >
      Profile
    </button>
      </Link>    
    <button
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
      onClick={() => {
        sessionStorage.removeItem("user_id");
        setIsLog(false); // update state to show login/signup again
      }}
    >
      Logout
    </button>
  </>
)}

        </div>
        {/* <Login isOpen={isModalOpen} setIsOpen={setOpen} />
    <Signup isOpen={isSignup} setIsOpen={setSign} /> */}
        {/* Search Bar */}
        <div className="pb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search skills or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Availability</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Evenings">Evenings</option>
              <option value="Flexible">Flexible</option>
            </select>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Skill Badge Component
const SkillBadge = ({ skill, type }) => {
  const bgColor = type === 'offered' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';

  return (
    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${bgColor} mr-1 mb-1`}>
      {skill.trim()}
    </span>
  );
};

// User Card Component
const UserCard = ({ user }) => {
  const skillsOffered = user.skills_offered ? user.skills_offered.split(',').slice(0, 3) : [];
  const skillsWanted = user.skills_wanted ? user.skills_wanted.split(',').slice(0, 3) : [];

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
            {user.profile_photo ? (
              <img
                src={user.profile_photo}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-600 font-semibold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              {user.location}
            </div>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm" onClick={() => setOpen(true)}>
          Request
        </button>
      </div>
      {/* <LoginProfileModal isOpen={isModalOpen}/> */}
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Offered</h4>
          <div className="flex flex-wrap">
            {skillsOffered.map((skill, index) => (
              <SkillBadge key={index} skill={skill} type="offered" />
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Wanted</h4>
          <div className="flex flex-wrap">
            {skillsWanted.map((skill, index) => (
              <SkillBadge key={index} skill={skill} type="wanted" />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm text-gray-600">
              {user.rating} rating
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {user.availability}
          </span>
        </div>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg text-sm font-medium ${currentPage === page
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// Main App Component
const SkillSwapPlatform = ({userss,islog, setIsLog}) => {
  console.log("Users received in SkillSwapPbhjgcghglatform:", userss); //this is print correct
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const usersPerPage = 6;
  useEffect(() => {
    setUsers(userss);             // raw API data
    setFilteredUsers(userss);     // initialize filtered list
  }, [userss]);
  console.log("Filtered users in SkilnjdbhsbdjbsdbslSwapPlatform:", filteredUsers);// but this is emppty
  // Simulate API call
  // useEffect(() => {
  //   setLoading(true);
  //   // Replace this with your Flask API call
  //   setTimeout(() => {
  //     // setUsers(mockUsers);
  //     setFilteredUsers(userss);
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  const handleSearch = (searchTerm, availability) => {
    let filtered = userss;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skills_offered.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skills_wanted.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (availability) {
      filtered = filtered.filter(user => user.availability === availability);
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  console.log("Filtered users:", filteredUsers);
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} islog={islog} setIsLog={setIsLog}/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Users ({filteredUsers.length})
              </h2>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="w-4 h-4 mr-1" />
                Showing {startIndex + 1}-{Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length}
              </div>
            </div>

            {currentUsers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">No users found matching your criteria.</div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentUsers.map(user => (
                    <Link to={`/user/${user.id}`} className="no-underline" key={user.id}>
                      <UserCard key={user.id} user={user} />
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default SkillSwapPlatform;