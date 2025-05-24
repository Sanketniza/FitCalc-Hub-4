import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { motion } from 'framer-motion';
import { Activity, CalendarClock, Droplets, Dumbbell, Footprints, Scale, Trophy, Coffee, Utensils, Apple } from 'lucide-react';
import { UserDataContext } from '../context/UserDataContext';

const Results = () => {
  const { userData, calculateProjectedResults, calculateBMI, generateMealPlan } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [selectedMealType, setSelectedMealType] = useState<'morning' | 'evening'>('morning');
  const [selectedDietType, setSelectedDietType] = useState<'all' | 'vegetarian' | 'non-vegetarian' | 'vegan' | 'indian'>('all');

  useEffect(() => {
    if (!userData) {
      navigate('/input');
    }
  }, [userData, navigate]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const results = calculateProjectedResults();
  const bmi = calculateBMI();
  const mealPlan = generateMealPlan();
  
  if (!results) {
    return <div>Error calculating results</div>;
  }
  
  if (!mealPlan) {
    return <div>Error generating meal plan</div>;
  }

  const formatLargeNumber = (num: number) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : Math.round(num);
  };
  
  // Format weight change to be more user-friendly
  const formattedWeightChange = () => {
    const abs = Math.abs(results.weightChange);
    const sign = results.weightChange < 0 ? '-' : '+';
    return `${sign}${abs.toFixed(1)} kg`;
  };

  const percentComplete = Math.min(100, Math.round((userData.planDuration / 90) * 100));

  return (
    <div className="max-w-5xl mx-auto mt-5">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white font-montserrat">
            Your Projected Results
          </h1>
          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-4 py-2 rounded-full font-medium">
            {userData.planDuration} Day Plan
          </div>
        </div>
        
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-36 h-36 mx-auto mb-4">
            <CircularProgressbar
              value={percentComplete}
              text={`${userData.planDuration} days`}
              styles={buildStyles({
                textSize: '16px',
                pathColor: '#10b981',
                textColor: document.documentElement.classList.contains('dark') ? '#d1fae5' : '#065f46',
                trailColor: '#ecfdf5',
              })}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Trophy className="h-8 w-8 text-yellow-500 absolute -mt-10" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            {userData.name}'s Fitness Journey
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Here's what you can achieve in {userData.planDuration} days with consistent effort!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-blue-50 dark:bg-slate-700 p-5 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <Scale className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <h2 className="ml-2 text-xl font-semibold text-blue-800 dark:text-blue-300">Weight Change</h2>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 text-blue-800 dark:text-blue-300">
                {formattedWeightChange()}
              </div>
              <p className="text-blue-600 dark:text-blue-400">
                {results.weightChange < 0 
                  ? "Projected Weight Loss" 
                  : results.weightChange > 0 
                    ? "Projected Muscle Gain" 
                    : "Maintain Current Weight"}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-green-50 dark:bg-slate-700 p-5 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <Footprints className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <h2 className="ml-2 text-xl font-semibold text-green-800 dark:text-green-300">Total Steps</h2>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 text-green-800 dark:text-green-300">
                {formatLargeNumber(results.stepsTaken)}
              </div>
              <p className="text-green-600 dark:text-green-400">
                ~{Math.round(results.stepsTaken / 1300)} km walked
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-purple-50 dark:bg-slate-700 p-5 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                <CalendarClock className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <h2 className="ml-2 text-xl font-semibold text-purple-800 dark:text-purple-300">Calories Burned</h2>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 text-purple-800 dark:text-purple-300">
                {formatLargeNumber(results.caloriesBurned)}
              </div>
              <p className="text-purple-600 dark:text-purple-400">
                Calories from activities
              </p>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-indigo-50 dark:bg-slate-700 p-5 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
                <Activity className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
              </div>
              <h2 className="ml-2 text-xl font-semibold text-indigo-800 dark:text-indigo-300">BMI Status</h2>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold mb-1 text-indigo-800 dark:text-indigo-300">
                {bmi.value}
              </div>
              <div className={`${bmi.color} font-medium text-lg mb-3`}>
                {bmi.category}
              </div>
              <div className="w-full relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                <div className="absolute inset-0 flex">
                  <div className="h-full bg-blue-500 bmi-segment"></div>
                  <div className="h-full bg-green-500 bmi-segment"></div>
                  <div className="h-full bg-yellow-500 bmi-segment"></div>
                  <div className="h-full bg-red-500 bmi-segment"></div>
                </div>
                <div 
                  className={`bmi-marker text-black dark:text-white bmi-marker-position`}
                  ref={(el) => {
                    if (el) {
                      el.style.setProperty('--marker-position', `${Math.min(Math.max((bmi.value - 10) * 3.3, 0), 100)}%`);
                    }
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-indigo-600 dark:text-indigo-400 w-full px-1 mt-1">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
              <div className="text-sm text-indigo-600 dark:text-indigo-400 mt-2">
                BMI based on your current metrics
              </div>
            </div>
          </motion.div>
          <motion.div
            className="bg-amber-50 dark:bg-slate-700 p-5 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                <Dumbbell className="h-6 w-6 text-amber-600 dark:text-amber-300" />
              </div>
              <h2 className="ml-2 text-xl font-semibold text-amber-800 dark:text-amber-300">Workouts Completed</h2>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-20 h-20">
                <CircularProgressbar
                  value={(results.workoutsDone / (userData.planDuration / 7 * 7)) * 100}
                  text={`${results.workoutsDone}`}
                  styles={buildStyles({
                    textSize: '28px',
                    pathColor: '#d97706',
                    textColor: document.documentElement.classList.contains('dark') ? '#fbbf24' : '#92400e',
                    trailColor: '#fef3c7',
                  })}
                />
              </div>
              <div className="ml-4">
                <p className="text-amber-800 dark:text-amber-300 font-medium">Total Sessions</p>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  Based on your {userData.activityLevel.replace('-', ' ')} activity level
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-cyan-50 dark:bg-slate-700 p-5 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-cyan-100 dark:bg-cyan-900 p-2 rounded-full">
                <Droplets className="h-6 w-6 text-cyan-600 dark:text-cyan-300" />
              </div>
              <h2 className="ml-2 text-xl font-semibold text-cyan-800 dark:text-cyan-300">Water Consumed</h2>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-20 h-20">
                <CircularProgressbar
                  value={100}
                  text={`${results.waterConsumed.toFixed(1)}L`}
                  styles={buildStyles({
                    textSize: '20px',
                    pathColor: '#0891b2',
                    textColor: document.documentElement.classList.contains('dark') ? '#67e8f9' : '#155e75',
                    trailColor: '#cffafe',
                  })}
                />
              </div>
              <div className="ml-4">
                <p className="text-cyan-800 dark:text-cyan-300 font-medium">Total Water</p>
                <p className="text-sm text-cyan-600 dark:text-cyan-400">
                  {Math.round(results.waterConsumed)} liters over {userData.planDuration} days
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          className="bg-slate-50 dark:bg-slate-700 p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white font-montserrat">
            Your Achievement Timeline
          </h2>
          
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-600"></div>
            
            <div className="relative pl-14 pb-6">
              <div className="absolute left-3 top-1 w-5 h-5 rounded-full bg-green-500"></div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Getting Started</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Begin your fitness journey with achievable daily goals
              </p>
            </div>
            
            <div className="relative pl-14 pb-6">
              <div className="absolute left-3 top-1 w-5 h-5 rounded-full bg-blue-500"></div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Consistency Building</h3>
              <p className="text-slate-600 dark:text-slate-300">
                By week 2, you'll establish healthy routines and habits
              </p>
            </div>
            
            <div className="relative pl-14 pb-6">
              <div className="absolute left-3 top-1 w-5 h-5 rounded-full bg-purple-500"></div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Noticeable Progress</h3>
              <p className="text-slate-600 dark:text-slate-300">
                After 30 days, you'll see measurable improvements in fitness and energy
              </p>
            </div>
            
            <div className="relative pl-14">
              <div className="absolute left-3 top-1 w-5 h-5 rounded-full bg-amber-500"></div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Reaching Your Goals</h3>
              <p className="text-slate-600 dark:text-slate-300">
                By day {userData.planDuration}, you'll achieve your initial fitness milestones
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Meal Plan Section */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-8">
        <div className="flex justify-between items-center mb-8 sm:flex-col sm:items-start sm:gap-2">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white font-montserrat">
            Your Personalized Diet Plan
          </h2>
          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-4 py-2 rounded-full font-medium sm:w-full sm:mt-4 sm:text-center sm:px-6 sm:grid sm:grid-cols-1 sm:gap-2">
            {mealPlan.dailyCalories} calories/day
          </div>
        </div>

        {/* Meal Plan Introduction */}
        <motion.div
          className="bg-slate-100 dark:bg-slate-700 p-5 rounded-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
            {userData.fitnessGoal === 'lose-weight' 
              ? 'Calorie-Controlled Diet Plan'
              : userData.fitnessGoal === 'gain-muscle'
                ? 'Muscle-Building Diet Plan'
                : 'Balanced Diet Plan'
            }
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-3">
            {userData.fitnessGoal === 'lose-weight' 
              ? `We've crafted a meal plan with a ${mealPlan.dailyCalories} calorie target to help you lose weight sustainably without sacrificing nutrition.`
              : userData.fitnessGoal === 'gain-muscle'
                ? `Your muscle-building diet includes ${mealPlan.dailyCalories} calories with high protein (${mealPlan.proteinTarget}g) to support muscle growth.`
                : `This balanced meal plan of ${mealPlan.dailyCalories} calories is designed to maintain your current weight while providing optimal nutrition.`
            }
          </p>
          <div className="flex flex-wrap gap-2">
            <div className="bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full text-sm text-amber-800 dark:text-amber-300">
              <span className="font-medium">{userData.mealCount}</span> meals per day
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-sm text-green-800 dark:text-green-300">
              <span className="font-medium">{userData.dietaryPreference}</span> diet
            </div>
            {userData.allergies && userData.allergies.length > 0 && (
              <div className="bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full text-sm text-red-800 dark:text-red-300">
                Allergies: {userData.allergies.join(', ')}
              </div>
            )}
          </div>
        </motion.div>

        {/* Diet Nutrition Summary */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-blue-50 dark:bg-slate-700 p-5 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <div className="text-blue-600 dark:text-blue-300 font-bold text-lg">P</div>
              </div>
              <h3 className="ml-2 text-xl font-semibold text-blue-800 dark:text-blue-300">Protein</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 text-blue-800 dark:text-blue-300">
                {mealPlan.proteinTarget}g
              </div>
              <p className="text-blue-600 dark:text-blue-400">
                {Math.round((mealPlan.proteinTarget * 4) / mealPlan.dailyCalories * 100)}% of daily calories
              </p>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-slate-700 p-5 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <div className="text-green-600 dark:text-green-300 font-bold text-lg">C</div>
              </div>
              <h3 className="ml-2 text-xl font-semibold text-green-800 dark:text-green-300">Carbs</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 text-green-800 dark:text-green-300">
                {mealPlan.carbsTarget}g
              </div>
              <p className="text-green-600 dark:text-green-400">
                {Math.round((mealPlan.carbsTarget * 4) / mealPlan.dailyCalories * 100)}% of daily calories
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-slate-700 p-5 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
                <div className="text-yellow-600 dark:text-yellow-300 font-bold text-lg">F</div>
              </div>
              <h3 className="ml-2 text-xl font-semibold text-yellow-800 dark:text-yellow-300">Fats</h3>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 text-yellow-800 dark:text-yellow-300">
                {mealPlan.fatTarget}g
              </div>
              <p className="text-yellow-600 dark:text-yellow-400">
                {Math.round((mealPlan.fatTarget * 9) / mealPlan.dailyCalories * 100)}% of daily calories
              </p>
            </div>
          </div>
        </motion.div>

        {/* Meal Time Selection */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`flex items-center px-4 py-2 rounded-full ${
              selectedMealType === 'morning' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200'
            }`}
            onClick={() => setSelectedMealType('morning')}
          >
            <Coffee className="h-5 w-5 mr-2" />
            Morning Diet
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-full ${
              selectedMealType === 'evening' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200'
            }`}
            onClick={() => setSelectedMealType('evening')}
          >
            <Utensils className="h-5 w-5 mr-2" />
            Evening Diet
          </button>
        </div>

        {/* Filter by Diet Type */}
        <div className="mb-8">
          <h3 className="text-slate-800 dark:text-white font-semibold mb-2">
            Filter by Diet Type:
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                selectedDietType === 'all' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200'
              }`}
              onClick={() => setSelectedDietType('all')}
            >
              All
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                selectedDietType === 'vegetarian' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200'
              }`}
              onClick={() => setSelectedDietType('vegetarian')}
            >
              Vegetarian
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                selectedDietType === 'non-vegetarian' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200'
              }`}
              onClick={() => setSelectedDietType('non-vegetarian')}
            >
              Non-Vegetarian
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                selectedDietType === 'vegan' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200'
              }`}
              onClick={() => setSelectedDietType('vegan')}
            >
              Vegan
            </button>
            <button
              className={`px-3 py-1 rounded-full text-sm ${
                selectedDietType === 'indian' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200'
              }`}
              onClick={() => setSelectedDietType('indian')}
            >
              Indian
            </button>
          </div>
        </div>

        {/* Meal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectedDietType !== 'all' && selectedDietType !== userData.dietaryPreference ? (
            // If user selects a diet type that doesn't match their preference, show message
            <div className="col-span-3 bg-amber-50 dark:bg-slate-700 p-6 rounded-xl text-center">
              <p className="text-amber-800 dark:text-amber-300 font-medium mb-2">No meal options found</p>
              <p className="text-slate-600 dark:text-slate-300">
                Try selecting a different diet type or meal time, or update your preferences in the Input form.
              </p>
            </div>
          ) : (
            // Show meals for the user's selected meal type (morning/evening)
            (selectedMealType === 'morning' ? mealPlan.morningMeals : mealPlan.eveningMeals).map((meal, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-700 rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {meal.imageUrl && (
                  <img 
                    src={meal.imageUrl} 
                    alt={meal.name} 
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <span className="bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded mr-2 text-xs font-semibold">
                      {selectedMealType === 'morning' ? 'Breakfast' : 'Dinner'}
                    </span>
                    <span className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded text-xs font-semibold">
                      {userData.dietaryPreference === 'indian' ? 'Indian' : 
                       userData.dietaryPreference === 'vegetarian' ? 'Vegetarian' : 
                       userData.dietaryPreference === 'vegan' ? 'Vegan' : 'Non-Vegetarian'}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-3 border-b pb-2 border-slate-200 dark:border-slate-600">
                    {meal.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">{meal.description}</p>
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded">
                      <p className="font-semibold text-blue-700 dark:text-blue-300">{meal.protein}g</p>
                      <p className="text-blue-600 dark:text-blue-400">Protein</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/30 p-2 rounded">
                      <p className="font-semibold text-green-700 dark:text-green-300">{meal.carbs}g</p>
                      <p className="text-green-600 dark:text-green-400">Carbs</p>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/30 p-2 rounded">
                      <p className="font-semibold text-yellow-700 dark:text-yellow-300">{meal.fat}g</p>
                      <p className="text-yellow-600 dark:text-yellow-400">Fat</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400 text-sm">{meal.calories} calories</span>
                    <div className="flex items-center">
                      {userData.allergies && userData.allergies.length > 0 && (
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs mr-2">
                          Allergy-Safe
                        </div>
                      )}
                      <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs">
                        {selectedMealType === 'morning' ? 'Breakfast' : 'Dinner'}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Snacks Section */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">
            <Apple className="inline-block mr-2 h-5 w-5" /> 
            Healthy Snacks
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mealPlan.snacks.map((snack, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-700 p-5 rounded-lg shadow-lg h-full flex flex-col"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <div className="flex flex-col h-full">
                  {snack.imageUrl && (
                    <div className="mb-4">
                      <img 
                        src={snack.imageUrl} 
                        alt={snack.name} 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-slate-800 dark:text-white mb-3">{snack.name}</h4>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-center">
                        <span className="block font-bold text-green-700 dark:text-green-300">{snack.calories}</span>
                        <span className="text-xs text-green-600 dark:text-green-400">calories</span>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-center">
                        <span className="block font-bold text-blue-700 dark:text-blue-300">{snack.protein}g</span>
                        <span className="text-xs text-blue-600 dark:text-blue-400">protein</span>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded text-center">
                        <span className="block font-bold text-amber-700 dark:text-amber-300">{snack.carbs}g</span>
                        <span className="text-xs text-amber-600 dark:text-amber-400">carbs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Diet Tips Section */}
        <div className="mt-10 bg-green-50 dark:bg-green-900/20 p-5 rounded-xl">
          <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">
            Nutrition Tips for Your Goal
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                <span className="text-green-600 dark:text-green-300 font-bold">1</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                {userData.fitnessGoal === 'lose-weight' 
                  ? 'Focus on protein-rich foods to maintain muscle while losing fat.' 
                  : userData.fitnessGoal === 'gain-muscle'
                    ? 'Ensure you eat sufficient protein (1.6-2.2g per kg of bodyweight) to support muscle growth.'
                    : 'Balance your macronutrients to maintain your current physique.'}
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                <span className="text-green-600 dark:text-green-300 font-bold">2</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                {userData.fitnessGoal === 'lose-weight' 
                  ? 'Drink water before meals to help control appetite and portion sizes.' 
                  : userData.fitnessGoal === 'gain-muscle'
                    ? 'Consume most of your carbohydrates around your workout times for optimal energy and recovery.'
                    : 'Time your meals consistently to regulate metabolism and energy levels.'}
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1">
                <span className="text-green-600 dark:text-green-300 font-bold">3</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                {userData.fitnessGoal === 'lose-weight' 
                  ? 'Include fiber-rich foods to stay fuller longer and improve digestive health.'
                  : userData.fitnessGoal === 'gain-muscle'
                    ? 'Don\'t neglect healthy fats, which support hormone production necessary for muscle growth.'
                    : 'Include a variety of whole foods to ensure a complete spectrum of micronutrients.'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Meal Plan Summary */}
        <div className="mt-10 bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl">
          <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">
            Your Daily Nutrition Plan
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-100 dark:bg-blue-900/40">
                  <th className="py-2 px-4 text-left text-blue-800 dark:text-blue-300">Meal Type</th>
                  <th className="py-2 px-4 text-left text-blue-800 dark:text-blue-300">Calories</th>
                  <th className="py-2 px-4 text-left text-blue-800 dark:text-blue-300">Protein</th>
                  <th className="py-2 px-4 text-left text-blue-800 dark:text-blue-300">Carbs</th>
                  <th className="py-2 px-4 text-left text-blue-800 dark:text-blue-300">Fats</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-100 dark:border-blue-900/40">
                  <td className="py-2 px-4 font-medium text-slate-700 dark:text-slate-300">Breakfast</td>
                  <td className="py-2 px-4 text-slate-700 dark:text-slate-300">~{mealPlan.morningMeals[0]?.calories || 0} cal</td>
                  <td className="py-2 px-4 text-slate-700 dark:text-slate-300">~{mealPlan.morningMeals[0]?.protein || 0}g</td>
                  <td className="py-2 px-4 text-slate-700 dark:text-slate-300">~{mealPlan.morningMeals[0]?.carbs || 0}g</td>
                  <td className="py-2 px-4 text-slate-700 dark:text-slate-300">~{mealPlan.morningMeals[0]?.fat || 0}g</td>
                </tr>
                <tr className="border-b border-blue-100 dark:border-blue-900/40">
                  <td className="py-2 px-4 font-medium text-slate-700 dark:text-slate-300">Snacks</td>
                  <td className="py-2 px-4 text-slate-700 dark:text-slate-300">~{mealPlan.snacks.reduce((sum, snack) => sum + snack.calories, 0) / 2} cal</td>
                  <td className="py-2 px-4 text-slate-700 dark:text-slate-300">~{Math.round(mealPlan.snacks.reduce((sum, snack) => sum + snack.protein, 0) / 2)}g</td>
                  <td className="py-2 px-4 text-slate-700 dark:text-slate-300">~{Math.round(mealPlan.snacks.reduce((sum, snack) => sum + snack.carbs, 0) / 2)}g</td>
                  <td className="py-2 px-4 text-slate-700 dark:text-slate-300">~{Math.round(mealPlan.snacks.reduce((sum, snack) => sum + snack.fat, 0) / 2)}g</td>
                </tr>
                <tr className="border-b border-blue-100 dark:border-blue-900/40">
                  <td className="py-2 px-4 font-medium text-slate-700 dark:text-slate-300">Dinner</td>
                  <td className="py-2 px-4 text-slate-700 dark:text-slate-300">~{mealPlan.eveningMeals[0]?.calories || 0} cal</td>
                  <td className="py-2 px-4 text-slate-700 dark:text-slate-300">~{mealPlan.eveningMeals[0]?.protein || 0}g</td>
                  <td className="py-2 px-4 text-slate-700 dark:text-slate-300">~{mealPlan.eveningMeals[0]?.carbs || 0}g</td>
                  <td className="py-2 px-4 text-slate-700 dark:text-slate-300">~{mealPlan.eveningMeals[0]?.fat || 0}g</td>
                </tr>
                <tr className="bg-blue-100 dark:bg-blue-900/40 font-medium">
                  <td className="py-2 px-4 text-blue-800 dark:text-blue-300">Daily Total</td>
                  <td className="py-2 px-4 text-blue-800 dark:text-blue-300">{mealPlan.dailyCalories} cal</td>
                  <td className="py-2 px-4 text-blue-800 dark:text-blue-300">{mealPlan.proteinTarget}g</td>
                  <td className="py-2 px-4 text-blue-800 dark:text-blue-300">{mealPlan.carbsTarget}g</td>
                  <td className="py-2 px-4 text-blue-800 dark:text-blue-300">{mealPlan.fatTarget}g</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
