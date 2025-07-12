import React from 'react';
import { User, MapPin, Clock, Eye, EyeOff } from 'lucide-react';

const UserProfileCard = ({ user }) => {
  // Helper function to parse comma-separated skills
  const parseSkills = (skillsString) => {
    if (!skillsString) return [];
    return skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
  };

  const skillsOffered = parseSkills(user.skills_offered);
  const skillsWanted = parseSkills(user.skills_wanted);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg border-2 border-gray-300 shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-teal-100 text-teal-800 rounded text-sm font-medium">
            Request
          </div>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{user.name}</h2>
          
          {/* Location */}
          {user.location && (
            <div className="flex items-center gap-1 text-gray-600 mb-2">
              <MapPin size={16} />
              <span className="text-sm">{user.location}</span>
            </div>
          )}

          {/* Availability */}
          {user.availability && (
            <div className="flex items-center gap-1 text-gray-600 mb-2">
              <Clock size={16} />
              <span className="text-sm">{user.availability}</span>
            </div>
          )}

          {/* Profile Privacy */}
          <div className="flex items-center gap-1 text-gray-600 mb-4">
            {user.profile === 'Public' ? <Eye size={16} /> : <EyeOff size={16} />}
            <span className="text-sm">{user.profile || 'Private'} Profile</span>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100">
          {user.profile_photo ? (
            <img 
              src={user.profile_photo} 
              alt={`${user.name}'s profile`}
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