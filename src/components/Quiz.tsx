
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { User, QuizResult } from '@/pages/Index';
import { Clock, CheckCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  user: User;
  onQuizComplete: (result: QuizResult) => void;
  onBackToDashboard: () => void;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: 3
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "Which country is home to Machu Picchu?",
    options: ["Brazil", "Peru", "Chile", "Ecuador"],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "Which instrument did Beethoven primarily compose for?",
    options: ["Violin", "Piano", "Cello", "Flute"],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctAnswer: 2
  },
  {
    id: 10,
    question: "Which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: 1
  }
];

const Quiz = ({ user, onQuizComplete, onBackToDashboard }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      return answer === questions[index].correctAnswer ? count + 1 : count;
    }, 0);

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const score = Math.round((correctAnswers / questions.length) * 100);

    const result: QuizResult = {
      totalQuestions: questions.length,
      correctAnswers,
      score,
      timeTaken
    };

    onQuizComplete(result);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredQuestions = selectedAnswers.filter(answer => answer !== null).length;

  return (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Button 
            onClick={onBackToDashboard}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            ← Back to Dashboard
          </Button>
          <div className="flex items-center space-x-4 text-white">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-xl font-mono">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>{answeredQuestions}/{questions.length}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-white mb-2">
            <span>Progress</span>
            <span>Question {currentQuestion + 1} of {questions.length}</span>
          </div>
          <Progress value={progress} className="h-3 bg-white/10" />
        </div>

        {/* Question Card */}
        <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-purple-400 bg-purple-500/20 text-white'
                    : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-purple-400 bg-purple-500'
                      : 'border-white/40'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-lg">{option}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50 transition-all duration-300"
          >
            Previous
          </Button>

          <div className="flex space-x-4">
            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={handleSubmitQuiz}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-2 transition-all duration-300 transform hover:scale-105"
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-2 transition-all duration-300 transform hover:scale-105"
              >
                Next
              </Button>
            )}
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                index === currentQuestion
                  ? 'border-purple-400 bg-purple-500 text-white'
                  : selectedAnswers[index] !== null
                  ? 'border-green-400 bg-green-500/20 text-green-400'
                  : 'border-white/40 bg-white/5 text-gray-400 hover:border-white/60'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
