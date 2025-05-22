
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';
import { User } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export const LeaderboardPage = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Get all users and sort by points
    const allUsers = JSON.parse(localStorage.getItem('ufc_users') || '[]');
    const sortedUsers = allUsers.sort((a: User, b: User) => b.points - a.points);
    setUsers(sortedUsers);
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Trophy className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Trophy className="h-5 w-5 text-orange-600" />;
    return <span className="text-gray-400 font-bold">#{rank}</span>;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400 to-gray-500';
    if (rank === 3) return 'bg-gradient-to-r from-orange-500 to-orange-600';
    return 'bg-gradient-to-r from-gray-600 to-gray-700';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="h-6 w-6 text-ufc-red" />
            Leaderboard
          </CardTitle>
          <p className="text-gray-400">Top fighters ranked by prediction accuracy</p>
        </CardHeader>
      </Card>

      <div className="space-y-3">
        {users.length === 0 ? (
          <Card className="bg-gray-900/80 border-gray-800">
            <CardContent className="p-8 text-center">
              <Trophy className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No rankings yet</h3>
              <p className="text-gray-400">Start betting on fights to see the leaderboard!</p>
            </CardContent>
          </Card>
        ) : (
          users.map((user, index) => {
            const rank = index + 1;
            const isCurrentUser = currentUser?.id === user.id;

            return (
              <Card
                key={user.id}
                className={`transition-all duration-300 ${
                  isCurrentUser 
                    ? 'bg-ufc-red/20 border-ufc-red/50 shadow-lg shadow-ufc-red/20' 
                    : 'bg-gray-900/80 border-gray-800 hover:border-gray-700'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full ${getRankColor(rank)} flex items-center justify-center`}>
                        {getRankIcon(rank)}
                      </div>
                      
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-gray-700 text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white">{user.name}</h3>
                          {isCurrentUser && (
                            <Badge variant="outline" className="bg-ufc-red/20 text-ufc-red border-ufc-red/50 text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">
                          Joined {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">
                        {user.points}
                      </div>
                      <div className="text-sm text-gray-400">points</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Points System Info */}
      <Card className="bg-gray-900/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white text-lg">Scoring System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-400">+10</div>
              <div className="text-sm text-gray-300">Correct Prediction</div>
            </div>
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-red-400">-5</div>
              <div className="text-sm text-gray-300">Wrong Prediction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
