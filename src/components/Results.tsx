
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, QuizResult } from '@/pages/Index';
import { Trophy, Clock, Target, RefreshCw, Home } from 'lucide-react';

interface ResultsProps {
  user: User;
  result: QuizResult;
  onBackToDashboard: () => void;
  onRetakeQuiz: () => void;
}

const Results = ({ user, result, onBackToDashboard, onRetakeQuiz }: ResultsProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Outstanding! 🏆';
    if (score >= 80) return 'Excellent work! 🌟';
    if (score >= 70) return 'Great job! 👏';
    if (score >= 60) return 'Good effort! 👍';
    return 'Keep practicing! 💪';
  };

  return (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Quiz Complete!</h1>
          <p className="text-gray-300 text-lg">Great job, {user.name}! Here are your results:</p>
        </div>

        {/* Score Card */}
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl mb-8">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-6xl font-bold mb-2">
              <span className={getScoreColor(result.score)}>{result.score}%</span>
            </CardTitle>
            <p className="text-2xl text-white">{getScoreMessage(result.score)}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center bg-white/5 rounded-lg p-6">
                <Target className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  {result.correctAnswers}/{result.totalQuestions}
                </div>
                <div className="text-gray-300">Correct Answers</div>
              </div>
              
              <div className="text-center bg-white/5 rounded-lg p-6">
                <Clock className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  {formatTime(result.timeTaken)}
                </div>
                <div className="text-gray-300">Time Taken</div>
              </div>
              
              <div className="text-center bg-white/5 rounded-lg p-6">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  {result.score >= 80 ? 'A' : result.score >= 60 ? 'B' : 'C'}
                </div>
                <div className="text-gray-300">Grade</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Analysis */}
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Accuracy Rate</span>
                <span className="text-white font-semibold">
                  {Math.round((result.correctAnswers / result.totalQuestions) * 100)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Average Time per Question</span>
                <span className="text-white font-semibold">
                  {Math.round(result.timeTaken / result.totalQuestions)}s
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Questions Attempted</span>
                <span className="text-white font-semibold">
                  {result.totalQuestions}/{result.totalQuestions}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRetakeQuiz}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Retake Quiz
          </Button>
          
          <Button
            onClick={onBackToDashboard}
            size="lg"
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-3 transition-all duration-300 transform hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Encouragement Message */}
        <div className="text-center mt-8 p-6 bg-white/5 rounded-lg">
          <p className="text-gray-300 text-lg">
            {result.score >= 80 
              ? "Fantastic work! You're mastering this topic. Keep up the excellent progress!"
              : result.score >= 60
              ? "You're doing well! A bit more practice and you'll be acing these quizzes!"
              : "Every attempt is a step forward. Review the topics and try again - you've got this!"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;
