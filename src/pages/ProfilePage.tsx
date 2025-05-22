
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { User, Trophy, Calendar } from 'lucide-react';

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile(name.trim(), avatar);
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setAvatar(user?.avatar || '');
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Profile Header */}
      <Card className="bg-gray-900/80 border-gray-800">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-ufc-red text-white text-2xl">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-bold text-white mb-2">{user.name}</h1>
              <p className="text-gray-400 mb-3">{user.email}</p>
              
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant="outline" className="bg-ufc-red/20 text-ufc-red border-ufc-red/50">
                  <Trophy className="h-3 w-3 mr-1" />
                  {user.points} points
                </Badge>
                <Badge variant="outline" className="bg-gray-700 text-gray-300 border-gray-600">
                  <Calendar className="h-3 w-3 mr-1" />
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile */}
      <Card className="bg-gray-900/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5" />
            Edit Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">Display Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className="bg-gray-800 border-gray-700 text-white disabled:opacity-60"
              placeholder="Enter your display name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar" className="text-gray-300">Avatar URL (optional)</Label>
            <Input
              id="avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              disabled={!isEditing}
              className="bg-gray-800 border-gray-700 text-white disabled:opacity-60"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Email</Label>
            <Input
              value={user.email}
              disabled
              className="bg-gray-800 border-gray-700 text-gray-400"
            />
            <p className="text-xs text-gray-500">Email cannot be changed</p>
          </div>

          <div className="flex gap-3 pt-4">
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="ufc-gradient hover:opacity-90 text-white"
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="ufc-gradient hover:opacity-90 text-white"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card className="bg-gray-900/80 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Your Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-white">{user.points}</div>
              <div className="text-sm text-gray-400">Total Points</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-green-400">0</div>
              <div className="text-sm text-gray-400">Correct Picks</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-red-400">0</div>
              <div className="text-sm text-gray-400">Wrong Picks</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">0%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
