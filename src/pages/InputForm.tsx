import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserDataContext, UserData } from '../context/UserDataContext';

const InputForm = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<UserData>({
    name: '',
    age: 25,
    weight: 70,
    height: 170,
    gender: 'male',
    activityLevel: 'moderate',
    fitnessGoal: 'maintain',
    steps: 8000,
    planDuration: 30,
    dietaryPreference: 'non-vegetarian',
    allergies: [],
    mealCount: 3
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    } else {
      // If no user data is available, use default values
      setFormData({
        name: '',
        age: 25,
        weight: 70,
        height: 170,
        gender: 'male',
        activityLevel: 'moderate',
        fitnessGoal: 'maintain',
        steps: 8000,
        planDuration: 30,
        dietaryPreference: 'non-vegetarian',
        allergies: [],
        mealCount: 3
      });
    }
  }, [userData]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (formData.age <= 0) newErrors.age = 'Please enter a valid age';
    if (formData.weight <= 0) newErrors.weight = 'Please enter a valid weight';
    if (formData.height <= 0) newErrors.height = 'Please enter a valid height';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setUserData(formData);
      navigate('/results');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    });
    
    // Clear error on change
    if (errors[name]) {
      setErrors({...errors, [name]: ''});
    }
  };

  return (
    <motion.div 
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Your Fitness Profile
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8 text-center">
          Fill in your details to get personalized fitness recommendations
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-slate-800 dark:text-white dark:bg-slate-700`}
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="age">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="120"
                className={`w-full px-4 py-2 border ${errors.age ? 'border-red-500' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-slate-800 dark:text-white dark:bg-slate-700`}
              />
              {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-slate-800 dark:text-white dark:bg-slate-700"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="weight">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="1"
                max="500"
                step="0.1"
                className={`w-full px-4 py-2 border ${errors.weight ? 'border-red-500' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-slate-800 dark:text-white dark:bg-slate-700`}
              />
              {errors.weight && <p className="mt-1 text-sm text-red-500">{errors.weight}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="height">
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                min="1"
                max="300"
                className={`w-full px-4 py-2 border ${errors.height ? 'border-red-500' : 'border-slate-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-slate-800 dark:text-white dark:bg-slate-700`}
              />
              {errors.height && <p className="mt-1 text-sm text-red-500">{errors.height}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="activityLevel">
                Activity Level
              </label>
              <select
                id="activityLevel"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-slate-800 dark:text-white dark:bg-slate-700"
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="very-active">Very Active (intense exercise daily)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="fitnessGoal">
                Fitness Goal
              </label>
              <select
                id="fitnessGoal"
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-slate-800 dark:text-white dark:bg-slate-700"
              >
                <option value="lose-weight">Lose Weight</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain-muscle">Gain Muscle</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="steps">
                Daily Steps Goal
              </label>
              <input
                type="number"
                id="steps"
                name="steps"
                value={formData.steps}
                onChange={handleChange}
                min="1000"
                max="50000"
                step="500"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-slate-800 dark:text-white dark:bg-slate-700"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="planDuration">
                Plan Duration (days)
              </label>
              <input
                type="number"
                id="planDuration"
                name="planDuration"
                value={formData.planDuration}
                onChange={handleChange}
                min="7"
                max="365"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-slate-800 dark:text-white dark:bg-slate-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="dietaryPreference">
                Dietary Preference
              </label>
              <select
                id="dietaryPreference"
                name="dietaryPreference"
                value={formData.dietaryPreference}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-slate-800 dark:text-white dark:bg-slate-700"
              >
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="indian">Indian</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1" htmlFor="mealCount">
                Meals Per Day
              </label>
              <select
                id="mealCount"
                name="mealCount"
                value={formData.mealCount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-slate-800 dark:text-white dark:bg-slate-700"
              >
                <option value="2">2 (Breakfast & Dinner)</option>
                <option value="3">3 (Breakfast, Lunch & Dinner)</option>
                <option value="4">4 (Including Snack)</option>
                <option value="5">5 (Including Multiple Snacks)</option>
                <option value="6">6 (Frequent Small Meals)</option>
              </select>
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Allergies or Food Restrictions
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Dairy', 'Gluten', 'Nuts', 'Eggs', 'Seafood', 'Soy'].map((allergy) => (
                  <div key={allergy} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`allergy-${allergy.toLowerCase()}`}
                      name="allergies"
                      value={allergy.toLowerCase()}
                      checked={formData.allergies.includes(allergy.toLowerCase())}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData({
                          ...formData,
                          allergies: e.target.checked
                            ? [...formData.allergies, value]
                            : formData.allergies.filter(a => a !== value)
                        });
                      }}
                      className="mr-2 h-4 w-4 text-green-500 focus:ring-green-400 rounded"
                    />
                    <label htmlFor={`allergy-${allergy.toLowerCase()}`} className="text-sm text-slate-700 dark:text-slate-300">
                      {allergy}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-2 mt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center bg-green-500 text-slate-100 px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 shadow"
              >
                <Save className="mr-2 h-5 w-5" />
                Save and Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default InputForm;
