import React from 'react'
import CardComponent from './CardComponent'
import QuizList from './QuizList'

const PracticeQuiz = () => {
  return (
    <div className='top-0 bottom-0 left-0 right-0 w-full h-full bg-gray-100 text-gray-900 p-6 text-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100'>
            <h1 className="text-5xl font-extrabold mb-8 text-gray-800 drop-shadow-xl transition-all duration-300">Practice Quizzes</h1>
      <QuizList />
    </div>
  )
}

export default PracticeQuiz

