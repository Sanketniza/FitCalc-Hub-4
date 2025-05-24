import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Droplets, Flame, Pencil, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { UserDataContext } from '../context/UserDataContext';

const Dashboard = () => {
  const { userData, calculateBMR, calculateTDEE, calculateWaterIntake, calculateBMI } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate('/input');
    }
  }, [userData, navigate]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const bmr = calculateBMR();
  const tdee = calculateTDEE();
  const waterIntake = calculateWaterIntake();
  const bmi = calculateBMI();
  
  // Exercise recommendations based on fitness goal and activity level
  const getExerciseRecommendations = () => {
    const activityLevel = userData.activityLevel;
    const fitnessGoal = userData.fitnessGoal;
    
    // Combined recommendations based on both activity level and fitness goal
    
    // For weight loss
    if (fitnessGoal === 'lose-weight') {
      if (['sedentary', 'light'].includes(activityLevel)) {
        return {
          title: 'Weight Loss Focus (Beginner)',
          cardio: '150-200 minutes of moderate cardio per week',
          strength: '2 full-body strength training sessions per week',
          recommended: [
            'Brisk walking (30 min, 5 days/week)',
            'Light bodyweight exercises',
            'Beginner yoga or Pilates',
            'Swimming (low impact)',
            'Focus on creating sustainable habits',
          ],
        };
      } else if (activityLevel === 'moderate') {
        return {
          title: 'Weight Loss Focus (Intermediate)',
          cardio: '200-250 minutes of moderate to vigorous cardio per week',
          strength: '2-3 strength training sessions per week',
          recommended: [
            'Jogging or running (30 min, 3-4 days/week)',
            'HIIT workouts (20 min, 2 days/week)',
            'Circuit training with light weights',
            'Cycling or elliptical training',
            'Add interval training to increase calorie burn',
          ],
        };
      } else { // active or very-active
        return {
          title: 'Weight Loss Focus (Advanced)',
          cardio: '250-300 minutes of vigorous cardio per week',
          strength: '3-4 strength training sessions per week',
          recommended: [
            'HIIT workouts (30 min, 3 days/week)',
            'Running or sprint intervals',
            'Advanced circuit training',
            'CrossFit-style workouts',
            'Mix of cardio and heavy resistance training',
          ],
        };
      }
    }
    
    // For muscle gain
    else if (fitnessGoal === 'gain-muscle') {
      if (['sedentary', 'light'].includes(activityLevel)) {
        return {
          title: 'Muscle Building Focus (Beginner)',
          cardio: '75-100 minutes of light cardio per week',
          strength: '3 full-body strength sessions per week',
          recommended: [
            'Full-body workouts with focus on form',
            'Bodyweight exercises to build base strength',
            'Learn basic compound movements',
            'Light to moderate weights with higher reps (12-15)',
            'Focus on progressive overload and proper nutrition',
          ],
        };
      } else if (activityLevel === 'moderate') {
        return {
          title: 'Muscle Building Focus (Intermediate)',
          cardio: '75-100 minutes of moderate cardio per week',
          strength: '4 strength training sessions per week (upper/lower split)',
          recommended: [
            'Upper/lower body split routines',
            'Moderate to heavy weights (8-12 reps)',
            'Compound lifts (squats, deadlifts, bench press)',
            'Progressive overload training',
            'Focus on protein intake and recovery',
          ],
        };
      } else { // active or very-active
        return {
          title: 'Muscle Building Focus (Advanced)',
          cardio: '75-100 minutes of cardio per week (for recovery)',
          strength: '5-6 strength sessions per week (body part split)',
          recommended: [
            'Body part split routines (PPL or body part specific)',
            'Heavy compound lifts with accessory work',
            'Periodization training cycles',
            'Advanced techniques (drop sets, supersets, etc.)',
            'Focus on nutrition timing and recovery protocols',
          ],
        };
      }
    }
    
    // For maintenance
    else {
      if (['sedentary', 'light'].includes(activityLevel)) {
        return {
          title: 'Balanced Fitness Focus (Beginner)',
          cardio: '150 minutes of light to moderate cardio per week',
          strength: '2 full-body strength sessions per week',
          recommended: [
            'Walking or light jogging',
            'Basic bodyweight exercises',
            'Yoga or flexibility work',
            'Light resistance band training',
            'Focus on consistency and enjoying movement',
          ],
        };
      } else if (activityLevel === 'moderate') {
        return {
          title: 'Balanced Fitness Focus (Intermediate)',
          cardio: '150 minutes of moderate cardio per week',
          strength: '2-3 strength training sessions per week',
          recommended: [
            'Mix of cardio and strength training',
            'Recreational sports or activities',
            'Circuit training 2x weekly',
            'Moderate intensity interval training',
            'Balance between all fitness components',
          ],
        };
      } else { // active or very-active
        return {
          title: 'Balanced Fitness Focus (Advanced)',
          cardio: '150-180 minutes of varied cardio per week',
          strength: '3-4 varied strength sessions per week',
          recommended: [
            'Cross-training approach',
            'Mix of endurance, strength, and HIIT',
            'Sports-specific training',
            'Functional fitness and mobility work',
            'Focus on performance goals rather than appearance',
          ],
        };
      }
    }
  };

  const exerciseRecommendations = getExerciseRecommendations();

  // Calculate calorie adjustments based on goals
  const getCalorieAdjustment = () => {
    switch (userData.fitnessGoal) {
      case 'lose-weight':
        return {
          deficit: Math.round(tdee * 0.2),
          target: Math.round(tdee * 0.8),
          text: 'Calorie deficit recommended for weight loss'
        };
      case 'gain-muscle':
        return {
          surplus: Math.round(tdee * 0.1),
          target: Math.round(tdee * 1.1),
          text: 'Calorie surplus recommended for muscle gain'
        };
      default:
        return {
          target: tdee,
          text: 'Maintain current calorie intake'
        };
    }
  };

  const calorieAdjustment = getCalorieAdjustment();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-8">
        <div className="flex justify-between items-center mb-6 sm:flex-row flex-col">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white sm:mb-0 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {userData.name}'s Dashboard
          </h1>
          <button
            onClick={() => navigate('/input')}
            className="inline-flex items-center bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-100 px-4 py-2 rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-300"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            className="bg-blue-50 dark:bg-slate-700 p-5 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <Droplets className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <h2 className="ml-2 text-xl font-semibold text-blue-800 dark:text-blue-300">Water Intake</h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-24 h-24">
                <CircularProgressbar
                  value={100}
                  text={`${waterIntake / 1000}L`}
                  styles={buildStyles({
                    textSize: '22px',
                    pathColor: '#3b82f6',
                    textColor: document.documentElement.classList.contains('dark') ? '#93c5fd' : userData.activityLevel === 'sedentary' ? '#1e40af' : '#3b82f6',
                    trailColor: '#dbeafe',
                  })}
                />
              </div>
              <div className="ml-4">
                <p className="text-blue-800 dark:text-blue-300 font-medium">Daily Target</p>
                <p className="text-blue-600 dark:text-blue-400">{waterIntake} ml</p>
                <p className="text-sm text-blue-500 dark:text-blue-500 mt-1">≈ {Math.round(waterIntake / 250)} glasses</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-red-50 dark:bg-slate-700 p-5 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full">
                <Flame className="h-6 w-6 text-red-600 dark:text-red-300" />
              </div>
              <h2 className="ml-2 text-xl font-semibold text-red-800 dark:text-red-300">Calorie Needs</h2>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-white dark:bg-slate-800 p-2 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">BMR</p>
                  <p className="text-lg font-semibold text-red-800 dark:text-red-300">{bmr} kcal</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-2 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">TDEE</p>
                  <p className="text-lg font-semibold text-red-800 dark:text-red-300">{tdee} kcal</p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 p-2 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">{calorieAdjustment.text}</p>
                <p className="text-lg font-semibold text-red-800 dark:text-red-300">Target: {calorieAdjustment.target} kcal</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-green-50 dark:bg-slate-700 p-5 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <Activity className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <h2 className="ml-2 text-xl font-semibold text-green-800 dark:text-green-300">Activity Level</h2>
            </div>
            <div>
              <p className="capitalize text-green-800 dark:text-green-300 font-medium mb-2">
                {userData.activityLevel.replace('-', ' ')}
              </p>
              <div className="w-full bg-green-200 dark:bg-green-900 rounded-full h-2.5 mb-4">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{
                    width: (() => {
                      switch (userData.activityLevel) {
                        case 'sedentary': return '20%';
                        case 'light': return '40%';
                        case 'moderate': return '60%';
                        case 'active': return '80%';
                        case 'very-active': return '100%';
                        default: return '60%';
                      }
                    })(),
                  }}
                ></div>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400">
                {userData.gender === 'male' ? 'Male' : userData.gender === 'female' ? 'Female' : 'Other'} • 
                {userData.age} years • 
                {userData.height} cm • 
                {userData.weight} kg
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-indigo-50 dark:bg-slate-700 p-5 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-indigo-600 dark:text-indigo-300">
                  <rect width="8" height="14" x="8" y="6" rx="4" />
                  <path d="M12 6v4" />
                  <path d="M12 16v2" />
                  <path d="M20 10h-8" />
                  <path d="M4 10h4" />
                </svg>
              </div>
              <h2 className="ml-2 text-xl font-semibold text-indigo-800 dark:text-indigo-300 break-words overflow-auto">BMI Calculator</h2>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-indigo-800 dark:text-indigo-300 font-medium">BMI Value</span>
                <span className={`${bmi.color} font-bold text-xl`}>{bmi.value}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-indigo-800 dark:text-indigo-300 font-medium">Category</span>
                <span className={`${bmi.color} font-medium`}>{bmi.category}</span>
              </div>
              
              <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="h-full bg-blue-500" style={{ width: '25%' }}></div>
                  <div className="h-full bg-green-500" style={{ width: '25%' }}></div>
                  <div className="h-full bg-yellow-500" style={{ width: '25%' }}></div>
                  <div className="h-full bg-red-500" style={{ width: '25%' }}></div>
                </div>
                <div 
                  className="absolute top-0 w-1 h-3 bg-black dark:bg-white"
                  style={{ 
                    left: `${Math.min(Math.max((bmi.value - 10) * 3.3, 0), 100)}%`,
                    transform: 'translateX(-50%)'
                  }}
                ></div>
              </div>
              
              <div className="grid grid-cols-4 text-xs mt-1 text-slate-600 dark:text-slate-400 justify-between">
                <span>Un_WT</span>
                <span>Normal</span>
                <span>Ov_wt</span>
                <span>Obese</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center mb-8">
          <Link
            to="/results"
            className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 shadow"
          >
            <Trophy className="mr-2 h-5 w-5" />
            View Projected Results
          </Link>
        </div>
        
        <motion.div
          className="bg-slate-50 dark:bg-slate-700 p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Exercise Recommendations
          </h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">{exerciseRecommendations.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Based on your {userData.activityLevel.replace('-', ' ')} activity level and goal to <span className="font-medium">{userData.fitnessGoal.replace('-', ' ')}</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">Weekly Workout Plan</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 mt-2 mr-2"></span>
                  <span className="text-slate-600 dark:text-slate-300">{exerciseRecommendations.cardio}</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mt-2 mr-2"></span>
                  <span className="text-slate-600 dark:text-slate-300">{exerciseRecommendations.strength}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-2">Recommended Activities</h4>
              <ul className="space-y-2">
                {exerciseRecommendations.recommended.map((activity, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mt-2 mr-2"></span>
                    <span className="text-slate-600 dark:text-slate-300">{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
