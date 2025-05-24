import { createContext, useState, useEffect, ReactNode } from 'react';

export interface UserData {
  name: string;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  fitnessGoal: 'lose-weight' | 'maintain' | 'gain-muscle';
  steps: number; // daily step count
  planDuration: number; // plan duration in days
  dietaryPreference: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'indian';
  allergies: string[];
  mealCount: 2 | 3 | 4 | 5 | 6;
}

interface UserDataContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  clearUserData: () => void;
  calculateBMR: () => number;
  calculateTDEE: () => number;
  calculateWaterIntake: () => number;
  calculateBMI: () => { value: number; category: string; color: string };
  calculateProjectedResults: () => ProjectedResults | null;
  generateMealPlan: () => MealPlanType | null;
}

export interface ProjectedResults {
  weightChange: number;
  caloriesBurned: number;
  waterConsumed: number;
  stepsTaken: number;
  workoutsDone: number;
}

export interface Meal {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  imageUrl?: string;
}

export interface MealPlanType {
  dailyCalories: number;
  morningMeals: Meal[];
  eveningMeals: Meal[];
  snacks: Meal[];
  proteinTarget: number;
  carbsTarget: number;
  fatTarget: number;
}


export const UserDataContext = createContext<UserDataContextType>({
  userData: null,
  setUserData: () => {},
  clearUserData: () => {},
  calculateBMR: () => 0,
  calculateTDEE: () => 0,
  calculateWaterIntake: () => 0,
  calculateBMI: () => ({ value: 0, category: 'Unknown', color: 'text-gray-500' }),
  calculateProjectedResults: () => null,
  generateMealPlan: () => null,
});

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserDataState] = useState<UserData | null>(() => {
    const savedData = localStorage.getItem('fitcalc-hub-user-data');
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    if (userData) {
      localStorage.setItem('fitcalc-hub-user-data', JSON.stringify(userData));
    }
  }, [userData]);

  const setUserData = (data: UserData) => {
    setUserDataState(data);
  };

  const clearUserData = () => {
    localStorage.removeItem('fitcalc-hub-user-data');
    setUserDataState(null);
  };

  const calculateBMR = (): number => {
    if (!userData) return 0;
    
    // Using Mifflin-St Jeor Equation
    if (userData.gender === 'male') {
      return (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) + 5;
    } else {
      return (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) - 161;
    }
  };

  const calculateTDEE = (): number => {
    const bmr = calculateBMR();
    const activityMultipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };
    
    return Math.round(bmr * activityMultipliers[userData?.activityLevel || 'moderate']);
  };

  const calculateWaterIntake = (): number => {
    if (!userData) return 0;
    // Water intake in ml (approximately 30-35ml per kg of body weight)
    return Math.round(userData.weight * 33);
  };

  const calculateProjectedResults = (): ProjectedResults | null => {
    if (!userData) return null;
    
    const days = userData.planDuration;
    
    // Calculate projected weight change
    let weightChange = 0;
    
    if (userData.fitnessGoal === 'lose-weight') {
      // Lose approximately 0.5kg per week (safe weight loss)
      weightChange = -((days / 7) * 0.5);
    } else if (userData.fitnessGoal === 'gain-muscle') {
      // Gain approximately 0.25kg per week (realistic muscle gain)
      weightChange = (days / 7) * 0.25;
    }
    
    // Calculate calories burned from exercise (estimated)
    const tdee = calculateTDEE();
    let extraCaloriesBurned = 0;
    
    if (userData.activityLevel === 'sedentary') extraCaloriesBurned = 100;
    else if (userData.activityLevel === 'light') extraCaloriesBurned = 200;
    else if (userData.activityLevel === 'moderate') extraCaloriesBurned = 300;
    else if (userData.activityLevel === 'active') extraCaloriesBurned = 400;
    else if (userData.activityLevel === 'very-active') extraCaloriesBurned = 500;
    
    // Extra calories from steps (roughly 0.04 calories per step)
    const stepCalories = userData.steps * 0.04;
    
    const caloriesBurned = (tdee + extraCaloriesBurned + stepCalories) * days;
    
    // Calculate water consumed
    const waterIntakeDaily = calculateWaterIntake();
    const waterConsumed = waterIntakeDaily * days / 1000; // in liters
    
    // Calculate total steps
    const stepsTaken = userData.steps * days;
    
    // Calculate workouts done (based on activity level)
    let workoutsPerWeek = 0;
    if (userData.activityLevel === 'sedentary') workoutsPerWeek = 1;
    else if (userData.activityLevel === 'light') workoutsPerWeek = 2;
    else if (userData.activityLevel === 'moderate') workoutsPerWeek = 3;
    else if (userData.activityLevel === 'active') workoutsPerWeek = 5;
    else if (userData.activityLevel === 'very-active') workoutsPerWeek = 6;
    
    const workoutsDone = Math.round((days / 7) * workoutsPerWeek);
    
    return {
      weightChange,
      caloriesBurned,
      waterConsumed,
      stepsTaken,
      workoutsDone
    };
  };

  const calculateBMI = () => {
    if (!userData) return { value: 0, category: 'Unknown', color: 'gray' };
    
    // BMI = weight (kg) / (height (m) * height (m))
    const heightInMeters = userData.height / 100; // Convert cm to meters
    const bmi = userData.weight / (heightInMeters * heightInMeters);
    const roundedBMI = Math.round(bmi * 10) / 10; // Round to 1 decimal place
    
    // Determine BMI category and color
    let category, color;
    
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-500';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal';
      color = 'text-green-500';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      color = 'text-yellow-500';
    } else {
      category = 'Obese';
      color = 'text-red-500';
    }
    
    return { value: roundedBMI, category, color };
  };

  const generateMealPlan = (): MealPlanType | null => {
    if (!userData) return null;
    
    const tdee = calculateTDEE();
    let dailyCalories = tdee;
    
    // Adjust calories based on fitness goal
    if (userData.fitnessGoal === 'lose-weight') {
      dailyCalories = tdee - 500; // Deficit of 500 calories for weight loss
    } else if (userData.fitnessGoal === 'gain-muscle') {
      dailyCalories = tdee + 300; // Surplus of 300 calories for muscle gain
    }
    
    // Calculate macronutrient targets based on fitness goal
    let proteinPercentage = 0, carbsPercentage = 0, fatPercentage = 0;
    
    if (userData.fitnessGoal === 'lose-weight') {
      proteinPercentage = 0.4; // 40% protein
      carbsPercentage = 0.3;   // 30% carbs
      fatPercentage = 0.3;     // 30% fat
    } else if (userData.fitnessGoal === 'maintain') {
      proteinPercentage = 0.3; // 30% protein
      carbsPercentage = 0.4;   // 40% carbs
      fatPercentage = 0.3;     // 30% fat
    } else if (userData.fitnessGoal === 'gain-muscle') {
      proteinPercentage = 0.35; // 35% protein
      carbsPercentage = 0.45;   // 45% carbs
      fatPercentage = 0.2;      // 20% fat
    }
    
    const proteinTarget = Math.round((dailyCalories * proteinPercentage) / 4); // 4 calories per gram of protein
    const carbsTarget = Math.round((dailyCalories * carbsPercentage) / 4);     // 4 calories per gram of carbs
    const fatTarget = Math.round((dailyCalories * fatPercentage) / 9);         // 9 calories per gram of fat
    
    // Generate meal plans based on dietary preference
    const vegetarianMorningMeals: Meal[] = [
      {
        name: 'Greek Yogurt Breakfast Bowl',
        description: 'Greek yogurt topped with mixed berries, honey, and granola',
        calories: 350,
        protein: 20,
        carbs: 45,
        fat: 8,
        imageUrl: 'https://images.unsplash.com/photo-1542691457-cbe4df041eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Avocado Toast with Egg',
        description: 'Whole grain toast with smashed avocado, poached egg, and cherry tomatoes',
        calories: 380,
        protein: 15,
        carbs: 35,
        fat: 22,
        imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Protein Smoothie Bowl',
        description: 'Smoothie made with banana, spinach, plant protein, almond milk, topped with seeds and nuts',
        calories: 400,
        protein: 25,
        carbs: 50,
        fat: 12,
        imageUrl: 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ];
    
    const nonVegetarianMorningMeals: Meal[] = [
      {
        name: 'Protein-Packed Breakfast',
        description: 'Scrambled eggs with turkey bacon, spinach, and whole grain toast',
        calories: 420,
        protein: 30,
        carbs: 30,
        fat: 18,
        imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f10a081a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Chicken and Veggie Breakfast Bowl',
        description: 'Grilled chicken with sweet potatoes, bell peppers, and a poached egg',
        calories: 450,
        protein: 35,
        carbs: 40,
        fat: 15,
        imageUrl: 'https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Salmon and Egg Wrap',
        description: 'Smoked salmon, scrambled eggs, and avocado in a whole wheat wrap',
        calories: 480,
        protein: 32,
        carbs: 35,
        fat: 22,
        imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ];
    
    const veganMorningMeals: Meal[] = [
      {
        name: 'Tofu Scramble',
        description: 'Scrambled tofu with nutritional yeast, spinach, mushrooms, and whole grain toast',
        calories: 350,
        protein: 18,
        carbs: 40,
        fat: 12,
        imageUrl: 'https://images.unsplash.com/photo-1603729362753-f8162ac6c3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Chia Pudding',
        description: 'Chia seeds soaked in almond milk with maple syrup, topped with berries and nuts',
        calories: 380,
        protein: 12,
        carbs: 45,
        fat: 18,
        imageUrl: 'https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Protein-Packed Oatmeal',
        description: 'Oatmeal cooked with plant protein, almond milk, and topped with banana and almond butter',
        calories: 400,
        protein: 20,
        carbs: 55,
        fat: 10,
        imageUrl: 'https://images.unsplash.com/photo-1571748982800-fa51082c2224?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ];
    
    const vegetarianEveningMeals: Meal[] = [
      {
        name: 'Lentil and Vegetable Curry',
        description: 'Red lentil curry with mixed vegetables served over brown rice',
        calories: 450,
        protein: 20,
        carbs: 65,
        fat: 10,
        imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Stuffed Bell Peppers',
        description: 'Bell peppers stuffed with quinoa, black beans, corn, and topped with cheese',
        calories: 420,
        protein: 18,
        carbs: 55,
        fat: 14,
        imageUrl: 'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Eggplant Parmesan',
        description: 'Baked eggplant slices layered with marinara sauce and mozzarella cheese',
        calories: 480,
        protein: 22,
        carbs: 40,
        fat: 25,
        imageUrl: 'https://images.unsplash.com/photo-1601063458289-77247ba485ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ];
    
    const nonVegetarianEveningMeals: Meal[] = [
      {
        name: 'Grilled Chicken with Quinoa',
        description: 'Herb-marinated grilled chicken breast with quinoa and roasted vegetables',
        calories: 520,
        protein: 40,
        carbs: 45,
        fat: 15,
        imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Baked Salmon with Sweet Potato',
        description: 'Lemon-dill baked salmon fillet with roasted sweet potato and asparagus',
        calories: 490,
        protein: 35,
        carbs: 40,
        fat: 20,
        imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Turkey Chili',
        description: 'Lean ground turkey chili with beans, tomatoes, and bell peppers',
        calories: 450,
        protein: 38,
        carbs: 35,
        fat: 16,
        imageUrl: 'https://images.unsplash.com/photo-1518675219903-c682c4b16b1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ];
    
    const veganEveningMeals: Meal[] = [
      {
        name: 'Buddha Bowl',
        description: 'Bowl with quinoa, roasted chickpeas, avocado, and mixed vegetables with tahini dressing',
        calories: 480,
        protein: 18,
        carbs: 60,
        fat: 20,
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Tempeh Stir Fry',
        description: 'Tempeh and vegetable stir fry with brown rice and sesame-ginger sauce',
        calories: 450,
        protein: 22,
        carbs: 55,
        fat: 15,
        imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Lentil Shepherd\'s Pie',
        description: 'Lentil and vegetable filling topped with mashed potatoes',
        calories: 420,
        protein: 16,
        carbs: 65,
        fat: 10,
        imageUrl: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ];

    // Indian meals
    const indianMorningMeals: Meal[] = [
      {
        name: 'Masala Dosa with Sambar',
        description: 'Crispy rice and lentil crepe filled with spiced potatoes, served with lentil soup',
        calories: 350,
        protein: 12,
        carbs: 58,
        fat: 10,
        imageUrl: 'https://images.unsplash.com/photo-1630383249896-24c657ade22c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Paneer Paratha with Yogurt',
        description: 'Whole wheat flatbread stuffed with spiced cottage cheese, served with yogurt',
        calories: 420,
        protein: 18,
        carbs: 50,
        fat: 16,
        imageUrl: 'https://images.unsplash.com/photo-1605196560602-0e7f70b80396?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Upma with Chutney',
        description: 'Savory semolina porridge with vegetables and spices, served with coconut chutney',
        calories: 320,
        protein: 10,
        carbs: 48,
        fat: 12,
        imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f72e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ];
    
    const indianEveningMeals: Meal[] = [
      {
        name: 'Chana Masala with Brown Rice',
        description: 'Spiced chickpea curry with tomatoes and onions, served with brown rice',
        calories: 460,
        protein: 22,
        carbs: 65,
        fat: 13,
        imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Chicken Tikka Masala',
        description: 'Tender chicken in a creamy tomato sauce with aromatic spices, served with naan',
        calories: 520,
        protein: 35,
        carbs: 42,
        fat: 22,
        imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Vegetable Biryani',
        description: 'Fragrant basmati rice cooked with mixed vegetables, herbs, and spices',
        calories: 430,
        protein: 12,
        carbs: 68,
        fat: 14,
        imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ];
    
    const healthySnacks: Meal[] = [
      {
        name: 'Greek Yogurt with Berries',
        description: 'Greek yogurt topped with mixed berries and a drizzle of honey',
        calories: 150,
        protein: 15,
        carbs: 20,
        fat: 0,
        imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Apple with Almond Butter',
        description: 'Sliced apple with a tablespoon of almond butter',
        calories: 170,
        protein: 5,
        carbs: 25,
        fat: 8,
        imageUrl: 'https://images.unsplash.com/photo-1583722556661-c7f17296b475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Protein Shake',
        description: 'Protein shake made with protein powder and almond milk',
        calories: 180,
        protein: 25,
        carbs: 10,
        fat: 3,
        imageUrl: 'https://images.unsplash.com/photo-1553627220-92f0446b6a1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Veggie Sticks with Hummus',
        description: 'Carrot, cucumber, and bell pepper sticks with hummus',
        calories: 130,
        protein: 5,
        carbs: 15,
        fat: 6,
        imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a90bb4ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ];
    
    // Select meals based on dietary preference
    let morningMeals: Meal[] = [];
    let eveningMeals: Meal[] = [];
    
    if (userData.dietaryPreference === 'vegetarian') {
      morningMeals = vegetarianMorningMeals;
      eveningMeals = vegetarianEveningMeals;
    } else if (userData.dietaryPreference === 'non-vegetarian') {
      morningMeals = nonVegetarianMorningMeals;
      eveningMeals = nonVegetarianEveningMeals;
    } else if (userData.dietaryPreference === 'vegan') {
      morningMeals = veganMorningMeals;
      eveningMeals = veganEveningMeals;
    } else if (userData.dietaryPreference === 'indian') {
      morningMeals = indianMorningMeals;
      eveningMeals = indianEveningMeals;
    }
    
    return {
      dailyCalories,
      morningMeals,
      eveningMeals,
      snacks: healthySnacks,
      proteinTarget,
      carbsTarget,
      fatTarget
    };
  };

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
        clearUserData,
        calculateBMR,
        calculateTDEE,
        calculateWaterIntake,
        calculateBMI,
        calculateProjectedResults,
        generateMealPlan,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
