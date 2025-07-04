
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Login from '@/components/auth/Login';
import Signup from '@/components/auth/Signup';
import Dashboard from '@/components/Dashboard';
import Quiz from '@/components/Quiz';
import Results from '@/components/Results';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeTaken: number;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'dashboard' | 'quiz' | 'results'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleSignup = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleStartQuiz = () => {
    setCurrentView('quiz');
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setCurrentView('results');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setQuizResult(null);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
    setQuizResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto animate-fade-in">
        {currentView === 'login' && (
          <Login 
            onLogin={handleLogin} 
            onSwitchToSignup={() => setCurrentView('signup')} 
          />
        )}
        
        {currentView === 'signup' && (
          <Signup 
            onSignup={handleSignup} 
            onSwitchToLogin={() => setCurrentView('login')} 
          />
        )}
        
        {currentView === 'dashboard' && user && (
          <Dashboard 
            user={user} 
            onStartQuiz={handleStartQuiz}
            onLogout={handleLogout}
          />
        )}
        
        {currentView === 'quiz' && user && (
          <Quiz 
            user={user} 
            onQuizComplete={handleQuizComplete}
            onBackToDashboard={handleBackToDashboard}
          />
        )}
        
        {currentView === 'results' && user && quizResult && (
          <Results 
            user={user}
            result={quizResult}
            onBackToDashboard={handleBackToDashboard}
            onRetakeQuiz={handleStartQuiz}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
