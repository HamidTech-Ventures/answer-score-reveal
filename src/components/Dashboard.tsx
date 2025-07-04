
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/pages/Index';
import { BookOpen, Award, TrendingUp, LogOut } from 'lucide-react';

interface DashboardProps {
  user: User;
  onStartQuiz: () => void;
  onLogout: () => void;
}

const Dashboard = ({ user, onStartQuiz, onLogout }: DashboardProps) => {
  return (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-300 text-lg">Ready to test your knowledge?</p>
          </div>
          <Button 
            onClick={onLogout}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">Quizzes Taken</CardTitle>
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">12</div>
              <p className="text-gray-300 text-sm">Total attempts</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">Best Score</CardTitle>
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">92%</div>
              <p className="text-gray-300 text-sm">Personal best</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg">Average Score</CardTitle>
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">78%</div>
              <p className="text-gray-300 text-sm">Keep improving!</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Quiz Card */}
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              General Knowledge Quiz
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Test your knowledge with 10 carefully crafted questions
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400 mb-1">10</div>
                <div className="text-gray-300 text-sm">Questions</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400 mb-1">15</div>
                <div className="text-gray-300 text-sm">Minutes</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400 mb-1">MCQ</div>
                <div className="text-gray-300 text-sm">Format</div>
              </div>
            </div>
            
            <Button 
              onClick={onStartQuiz}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-6 text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              Start Quiz Now
            </Button>
            
            <p className="text-gray-400 text-sm">
              Challenge yourself and see how much you know!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
