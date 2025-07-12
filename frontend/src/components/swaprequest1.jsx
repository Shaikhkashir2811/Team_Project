import React from 'react';
import { User, MapPin, Clock, Eye, EyeOff } from 'lucide-react';
import { useParams } from 'react-router-dom';
const UserProfileCard = ({ users }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { id } = useParams(); 
  console.log("User ID from URL:", id);
  // Sample user data for preview (comment out when using real props)
  console.log("All Users:", users);
    const sampleUser = users.find(user => user.id ===  parseInt(id))
console.log("Sample User:", sampleUser);
  // const sampleUser = {
  //   id: 1,
  //   name: "Sarah Johnson",
  //   email: "sarah@example.com",
  //   location: "San Francisco, CA",
  //   skills_offered: "React, JavaScript, UI/UX Design, Frontend Development",
  //   skills_wanted: "Node.js, Python, Machine Learning, Backend Development",
  //   availability: "Weekends & Evenings",
  //   profile: "Public",
  //   profile_photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  // };

  // Use sample data for preview, replace with real user prop in production
  const userData = sampleUser;

  // Helper function to parse comma-separated skills
  const parseSkills = (skillsString) => {
    if (!skillsString) return [];
    return skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
  };

  const skillsOffered = parseSkills(userData.skills_offered);
  const skillsWanted = parseSkills(userData.skills_wanted);
// Handle skill selection
  const handleSkillWantedToggle = (skill) => {
    setSelectedSkillsWanted(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSkillOfferedToggle = (skill) => {
    setSelectedSkillsOffered(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSkillsWanted([]);
    setSelectedSkillsOffered([]);
    setIsWantedDropdownOpen(false);
    setIsOfferedDropdownOpen(false);
  };

  // Handle request send
  const handleSendRequest = () => {
    const requestData = {
      fromUserId: currentUserData.id,
      toUserId: userData.id,
      skillsRequested: selectedSkillsWanted,
      skillsOffered: selectedSkillsOffered
    };
    
    // Here you would typically send the request to your backend
    console.log('Sending request:', requestData);
    
    // Show success message or handle the request
    alert('Request sent successfully!');
    handleModalClose();
  };
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg border-2 border-gray-300 shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1 bg-teal-100 text-teal-800 rounded text-sm font-medium hover:bg-teal-200 transition-colors cursor-pointer"
            >
              Request
            </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Skill Swap Platform</span>
          <span>Swap request</span>
          <span>Home</span>
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{userData.name}</h2>
          
          {/* Location */}
          {userData.location && (
            <div className="flex items-center gap-1 text-gray-600 mb-2">
              <MapPin size={16} />
              <span className="text-sm">{userData.location}</span>
            </div>
          )}

          {/* Availability */}
          {userData.availability && (
            <div className="flex items-center gap-1 text-gray-600 mb-2">
              <Clock size={16} />
              <span className="text-sm">{userData.availability}</span>
            </div>
          )}

          {/* Profile Privacy */}
          <div className="flex items-center gap-1 text-gray-600 mb-4">
            {userData.profile === 'Public' ? <Eye size={16} /> : <EyeOff size={16} />}
            <span className="text-sm">{userData.profile || 'Private'} Profile</span>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100">
          {userData.profile_photo ? (
            <img 
              src={userData.profile_photo} 
              alt={`${userData.name}'s profile`}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={32} className="text-gray-400" />
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        {/* Skills Offered */}
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Skills Offered</h3>
          <div className="min-h-[60px] p-3 bg-gray-50 rounded border">
            {skillsOffered.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skillsOffered.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-500 text-sm">No skills offered yet</span>
            )}
          </div>
        </div>

        {/* Skills Wanted */}
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Skills Wanted</h3>
          <div className="min-h-[60px] p-3 bg-gray-50 rounded border">
            {skillsWanted.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skillsWanted.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-500 text-sm">No skills wanted yet</span>
            )}
          </div>
        </div>
      </div>
{isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-900">
                Send Request
              </h2>
              <button
                onClick={handleModalClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4">
              {/* Request to */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {userData.profile_photo ? (
                    <img 
                      src={userData.profile_photo} 
                      alt={userData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={16} className="text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-600">Request to:</p>
                  <p className="font-medium text-sm">{userData.name}</p>
                </div>
              </div>

              {/* Skills I Want to Learn */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Skills I want to learn:
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsWantedDropdownOpen(!isWantedDropdownOpen)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">
                        {selectedSkillsWanted.length > 0 
                          ? `${selectedSkillsWanted.length} skill${selectedSkillsWanted.length > 1 ? 's' : ''} selected`
                          : 'Select skills'}
                      </span>
                      <ChevronDown size={16} className={`text-gray-400 transition-transform ${isWantedDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  {isWantedDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-32 overflow-y-auto">
                      {skillsWanted.length > 0 ? (
                        skillsWanted.map((skill, index) => (
                          <label key={index} className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedSkillsWanted.includes(skill)}
                              onChange={() => handleSkillWantedToggle(skill)}
                              className="w-4 h-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                            />
                            <span className="text-sm">{skill}</span>
                          </label>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm p-2">No skills available</p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Selected Skills Tags */}
                {selectedSkillsWanted.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedSkillsWanted.map((skill, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full"
                      >
                        {skill}
                        <button
                          onClick={() => handleSkillWantedToggle(skill)}
                          className="text-teal-600 hover:text-teal-800"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Skills I Can Offer */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Skills I can offer:
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsOfferedDropdownOpen(!isOfferedDropdownOpen)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">
                        {selectedSkillsOffered.length > 0 
                          ? `${selectedSkillsOffered.length} skill${selectedSkillsOffered.length > 1 ? 's' : ''} selected`
                          : 'Select skills'}
                      </span>
                      <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOfferedDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  
                  {isOfferedDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-32 overflow-y-auto">
                      {currentUserSkillsOffered.length > 0 ? (
                        currentUserSkillsOffered.map((skill, index) => (
                          <label key={index} className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedSkillsOffered.includes(skill)}
                              onChange={() => handleSkillOfferedToggle(skill)}
                              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-sm">{skill}</span>
                          </label>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm p-2">No skills to offer</p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Selected Skills Tags */}
                {selectedSkillsOffered.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedSkillsOffered.map((skill, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {skill}
                        <button
                          onClick={() => handleSkillOfferedToggle(skill)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 p-4 border-t bg-gray-50">
              <button
                onClick={handleModalClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRequest}
                disabled={selectedSkillsWanted.length === 0 || selectedSkillsOffered.length === 0}
                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Rating and Feedback Section */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-2">Rating and Feedback</h3>
        <div className="p-3 bg-gray-50 rounded border min-h-[40px] flex items-center">
          <span className="text-gray-500 text-sm">No ratings yet</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;