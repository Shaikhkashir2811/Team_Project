import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, User, Star } from 'lucide-react';

const SkillSwapPlatform2 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Pending');
  
  // Mock data for skill swap requests
  const [swapRequests, setSwapRequests] = useState([
    {
      id: 1,
      name: 'Marc Demo',
      profilePhoto: null,
      rating: 3.9,
      skillsOffered: ['Java Script'],
      skillsWanted: ['NodeJS'],
      status: 'Pending'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      profilePhoto: null,
      rating: 4.2,
      skillsOffered: ['Python', 'Django'],
      skillsWanted: ['React', 'Frontend'],
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Alex Chen',
      profilePhoto: null,
      rating: 4.8,
      skillsOffered: ['UI/UX Design'],
      skillsWanted: ['Machine Learning'],
      status: 'Accepted'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      profilePhoto: null,
      rating: 3.5,
      skillsOffered: ['Digital Marketing'],
      skillsWanted: ['Web Development'],
      status: 'Rejected'
    },
    {
      id: 5,
      name: 'David Rodriguez',
      profilePhoto: null,
      rating: 4.1,
      skillsOffered: ['Mobile Development'],
      skillsWanted: ['Cloud Computing'],
      status: 'Pending'
    },
    {
      id: 6,
      name: 'Lisa Kumar',
      profilePhoto: null,
      rating: 4.6,
      skillsOffered: ['Data Science'],
      skillsWanted: ['DevOps'],
      status: 'Accepted'
    },
    
  ]);

  const itemsPerPage = 2;
  const totalPages = Math.ceil(swapRequests.length / itemsPerPage);

  // Filter requests based on search and status
  const filteredRequests = swapRequests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      request.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Paginate filtered results
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = (id, newStatus) => {
    setSwapRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'text-yellow-400';
      case 'Accepted': return 'text-green-400';
      case 'Rejected': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-900/20 border-yellow-700';
      case 'Accepted': return 'bg-green-900/20 border-green-700';
      case 'Rejected': return 'bg-red-900/20 border-red-700';
      default: return 'bg-gray-900/20 border-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Skill Swap Platform</h1>
          <div className="flex items-center space-x-4">
            <Link to="/">
            <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
              Home
            </button>
            </Link>
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
              <User className="w-6 h-6 text-gray-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
          
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by name or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="space-y-4">
          {paginatedRequests.length > 0 ? (
            paginatedRequests.map((request) => (
              <div
                key={request.id}
                className={`border-2 rounded-2xl p-6 transition-all duration-300 ${getStatusBg(request.status)}`}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  {/* Left Section - Profile Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                      {request.profilePhoto ? (
                        <img 
                          src={request.profilePhoto} 
                          alt={request.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{request.name}</h3>
                      
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-green-400 text-sm">Skills Offered →</span>
                          {request.skillsOffered.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-green-900/30 border border-green-700 rounded-full text-green-300 text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-blue-400 text-sm">Skill wanted →</span>
                          {request.skillsWanted.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-900/30 border border-blue-700 rounded-full text-blue-300 text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-3 space-x-1">
                        <span className="text-sm text-gray-400">Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">{request.rating}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Status and Actions */}
                  <div className="flex flex-col items-end space-y-3 lg:ml-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-400 mb-1">Status</div>
                      <div className={`text-lg font-semibold ${getStatusColor(request.status)}`}>
                        {request.status}
                      </div>
                    </div>
                    
                    {request.status === 'Pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusChange(request.id, 'Accepted')}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(request.id, 'Rejected')}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">No skill swap requests found</div>
              <div className="text-gray-500 text-sm mt-2">
                Try adjusting your search or filter criteria
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredRequests.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {[...Array(Math.ceil(filteredRequests.length / itemsPerPage))].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredRequests.length / itemsPerPage), prev + 1))}
              disabled={currentPage === Math.ceil(filteredRequests.length / itemsPerPage)}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillSwapPlatform2;