import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Droplets, Flame, Heart, Dumbbell, Apple, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto relative">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <video 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-woman-doing-squats-in-fitness-workout-31770-large.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-woman-doing-squats-in-fitness-workout-31770-large.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      <motion.section 
        className="text-center py-20 px-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-blue-400 dark:text-white font-montserrat heading-shadow">
          Your Personal <span className="text-green-400">Fitness Journey</span> Starts Here
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-black dark:text-white">
          FitCalc Hub helps you understand your body's needs and creates personalized recommendations 
          to help you achieve your fitness goals.
        </p>
        <Link
          to="/input"
          className="inline-flex items-center bg-green-500 text-slate-100 px-8 py-4 rounded-full font-medium hover:bg-green-600 transition-colors duration-300 shadow-lg text-lg"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </motion.section>

      <section className="py-16 px-4 bg-white dark:bg-slate-800 rounded-t-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white font-montserrat">
          How FitCalc Hub Helps You
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            className="bg-blue-50 dark:bg-slate-700 p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Droplets className="h-7 w-7 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">Water Intake</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Get personalized recommendations for daily water consumption based on your body weight and activity level.
            </p>
          </motion.div>

          <motion.div 
            className="bg-red-50 dark:bg-slate-700 p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Flame className="h-7 w-7 text-red-600 dark:text-red-300" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">Calorie Needs</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) for optimal nutrition.
            </p>
          </motion.div>

          <motion.div 
            className="bg-green-50 dark:bg-slate-700 p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Activity className="h-7 w-7 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">Exercise Routines</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Get tailored workout recommendations based on your activity level and fitness goals, whether you want to lose weight, build muscle, or maintain.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fitness Tips Video Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white font-montserrat">
            Expert Fitness Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-w-16 aspect-h-9 relative">
                <div className="absolute inset-0 bg-black opacity-10 z-10 rounded-xl"></div>
                <video 
                  className="w-full h-full object-cover rounded-xl"
                  controls
                  poster="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-man-exercising-with-dumbbells-in-a-gym-29898-large.mp4" type="video/mp4" />
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-man-exercising-with-dumbbells-in-a-gym-29898-large.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white font-montserrat">
                Maximize Your Workout Efficiency
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Learn professional techniques to get the most out of every workout session. Our expert trainers share their secrets for proper form, optimal rep ranges, and recovery strategies.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Award className="h-4 w-4 text-green-600 dark:text-green-300" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">Professional form guidance to prevent injuries</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Award className="h-4 w-4 text-green-600 dark:text-green-300" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">Targeted exercises for different fitness goals</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full flex items-center justify-center mr-3 mt-1">
                    <Award className="h-4 w-4 text-green-600 dark:text-green-300" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">Recovery techniques to optimize muscle growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white font-montserrat">
              Personalized Fitness Journey
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Our advanced algorithms analyze your unique profile to create a fitness plan that works specifically for you. No more one-size-fits-all approaches.
            </p>
            <Link
              to="/input"
              className="inline-flex items-center bg-slate-800 dark:bg-slate-600 text-slate-100 px-6 py-3 rounded-full font-medium hover:bg-slate-700 dark:hover:bg-slate-500 transition-colors duration-300"
            >
              Start Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
              alt="Fitness tracker" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Fitness Categories Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white font-montserrat">
          Explore Fitness Categories
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          <motion.div 
            className="relative rounded-xl overflow-hidden shadow-lg group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1518310383802-640c2de311b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
              alt="Strength Training" 
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <div className="bg-green-600 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                <Dumbbell className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">Strength Training</h3>
              <p className="text-sm opacity-90">Build muscle and increase strength</p>
            </div>
          </motion.div>

          <motion.div 
            className="relative rounded-xl overflow-hidden shadow-lg group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
              alt="Cardio" 
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <div className="bg-red-600 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">Cardio</h3>
              <p className="text-sm opacity-90">Improve heart health and endurance</p>
            </div>
          </motion.div>

          <motion.div 
            className="relative rounded-xl overflow-hidden shadow-lg group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
              alt="Nutrition" 
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <div className="bg-yellow-600 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                <Apple className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">Nutrition</h3>
              <p className="text-sm opacity-90">Fuel your body for optimal performance</p>
            </div>
          </motion.div>

          <motion.div 
            className="relative rounded-xl overflow-hidden shadow-lg group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
              alt="Recovery" 
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <div className="bg-blue-600 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">Recovery</h3>
              <p className="text-sm opacity-90">Rest and recuperate for continuous progress</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials with Video */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white font-montserrat">
            Success Stories
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg mb-8 relative">
                <div className="absolute -top-5 -left-5 bg-green-500 rounded-full w-10 h-10 flex items-center justify-center text-white text-xl font-bold">"</div>
                <p className="text-slate-600 dark:text-slate-300 mb-4 italic">
                  "FitCalc Hub completely transformed my approach to fitness. The personalized water intake and calorie calculations were spot on, and I've lost 15 pounds in just 2 months while feeling more energetic than ever!"
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Sarah J." 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">Sarah J.</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Lost 15 lbs in 2 months</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg relative">
                <div className="absolute -top-5 -left-5 bg-green-500 rounded-full w-10 h-10 flex items-center justify-center text-white text-xl font-bold">"</div>
                <p className="text-slate-600 dark:text-slate-300 mb-4 italic">
                  "As a busy professional, I never knew how to balance my nutrition with my workout routine. FitCalc Hub made it simple with clear guidelines and realistic goals. I've gained muscle while keeping my body fat percentage low!"
                </p>
                <div className="flex items-center">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Michael T." 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">Michael T.</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Gained 8 lbs of muscle</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-w-16 aspect-h-9 relative">
                <div className="absolute inset-0 bg-black opacity-10 z-10 rounded-xl"></div>
                <video 
                  className="w-full h-full object-cover rounded-xl"
                  controls
                  poster="https://images.unsplash.com/photo-1571019613576-2b22c76fd955?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-young-woman-training-on-the-floor-13359-large.mp4" type="video/mp4" />
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-young-woman-training-on-the-floor-13359-large.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-4 bg-white dark:bg-slate-700">
                <h3 className="font-bold text-slate-800 dark:text-white">Real Results with FitCalc Hub</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">Watch how our users transformed their bodies and lives</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fitness Tips & Nutrition Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white font-montserrat">
            Fitness & Nutrition Tips
          </h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* Workout Plan of the Week */}
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Weekly Workout Plan" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">Workout of the Week</h3>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">Beginner</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-5">
                  Start your fitness journey with this beginner-friendly full-body workout routine, designed to build strength and endurance without overexertion.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">1</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">10 min cardio warm-up</p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">2</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">3 sets of 10-12 bodyweight squats</p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">3</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">3 sets of 8-10 push-ups (modified if needed)</p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">4</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">3 sets of 10 dumbbell rows (each arm)</p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">5</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">5 min stretching cool-down</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Nutrition Tips */}
            <motion.div 
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600 rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Nutrition Guide" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">Nutrition Essentials</h3>
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">Balanced Diet</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-5">
                  Fuel your fitness journey with these nutrition fundamentals that help optimize performance and recovery.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white dark:bg-slate-600 p-3 rounded-lg shadow">
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">Protein</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">Essential for muscle repair and growth</p>
                  </div>
                  <div className="bg-white dark:bg-slate-600 p-3 rounded-lg shadow">
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">Complex Carbs</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">Sustained energy for workouts</p>
                  </div>
                  <div className="bg-white dark:bg-slate-600 p-3 rounded-lg shadow">
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">Healthy Fats</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">Support hormone production</p>
                  </div>
                  <div className="bg-white dark:bg-slate-600 p-3 rounded-lg shadow">
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">Hydration</h4>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">Essential for all bodily functions</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 dark:bg-slate-700 p-3 rounded-lg">
                  <h4 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Pro Tip:</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Aim to eat within 30-60 minutes after your workout to maximize recovery and muscle protein synthesis.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fitness Tracking Features */}
      <section className="py-16 px-4 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white font-montserrat">
            Track Your Progress
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1594882645126-14020914d58d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Progress Charts" 
                className="w-full h-48 object-cover rounded-lg mb-5"
              />
              <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">Visual Progress</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Track your journey with interactive charts and graphs that show your improvement over time.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Goal Setting" 
                className="w-full h-48 object-cover rounded-lg mb-5"
              />
              <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">Smart Goals</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Set personalized goals based on your fitness level and track your progress toward achieving them.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Reminders" 
                className="w-full h-48 object-cover rounded-lg mb-5"
              />
              <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-white">Smart Reminders</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Never miss a workout with customizable reminders that adapt to your schedule and preferences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Why FitCalc Hub Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white font-montserrat">
            Why Choose FitCalc Hub
          </h2>
          
          <div className="relative overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full text-left">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="p-4">Features</th>
                  <th className="p-4">FitCalc Hub</th>
                  <th className="p-4">Other Fitness Apps</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-slate-700 border-b dark:border-slate-600">
                  <td className="p-4 font-medium text-slate-800 dark:text-white">Personalized Calculations</td>
                  <td className="p-4 text-green-600 dark:text-green-400 font-bold">✓ Highly Customized</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">Basic or Generic</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-600 border-b dark:border-slate-500">
                  <td className="p-4 font-medium text-slate-800 dark:text-white">Nutrition Guidance</td>
                  <td className="p-4 text-green-600 dark:text-green-400 font-bold">✓ Tailored to Body Type</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">One-size-fits-all</td>
                </tr>
                <tr className="bg-white dark:bg-slate-700 border-b dark:border-slate-600">
                  <td className="p-4 font-medium text-slate-800 dark:text-white">Scientific Approach</td>
                  <td className="p-4 text-green-600 dark:text-green-400 font-bold">✓ Research-Backed</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">Often unverified</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-600 border-b dark:border-slate-500">
                  <td className="p-4 font-medium text-slate-800 dark:text-white">User Privacy</td>
                  <td className="p-4 text-green-600 dark:text-green-400 font-bold">✓ 100% Private</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">May share data</td>
                </tr>
                <tr className="bg-white dark:bg-slate-700">
                  <td className="p-4 font-medium text-slate-800 dark:text-white">Subscription</td>
                  <td className="p-4 text-green-600 dark:text-green-400 font-bold">✓ Free Core Features</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">Often paid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800 dark:text-white font-montserrat">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-md overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">How accurate are the fitness calculations?</h3>
                  <span className="transition-transform group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-slate-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-300">
                  <p>FitCalc Hub uses scientifically validated formulas for calculating BMR, TDEE, and water intake needs. While these provide a solid starting point based on population averages, individual variations in metabolism and body composition can affect your personal results. We recommend using our calculations as a baseline and adjusting based on your observed progress and how your body responds.</p>
                </div>
              </details>
            </div>
            
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-md overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Do I need any equipment for the recommended workouts?</h3>
                  <span className="transition-transform group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-slate-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-300">
                  <p>FitCalc Hub provides workout recommendations for all equipment levels. We offer bodyweight routines that require no equipment, as well as options for those with access to dumbbells, resistance bands, or full gym setups. Our goal is to make fitness accessible regardless of your available resources.</p>
                </div>
              </details>
            </div>
            
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-md overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">How often should I update my fitness profile?</h3>
                  <span className="transition-transform group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-slate-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-300">
                  <p>We recommend updating your profile metrics every 4-6 weeks, or whenever you experience significant changes in weight, activity level, or fitness goals. Your nutritional and hydration needs change as your body composition changes, so regular updates ensure you're receiving the most accurate recommendations.</p>
                </div>
              </details>
            </div>
            
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-md overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Can FitCalc Hub help with specific dietary requirements?</h3>
                  <span className="transition-transform group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-slate-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-300">
                  <p>Yes! FitCalc Hub provides nutrition recommendations that can be adapted to various dietary preferences and requirements, including vegetarian, vegan, gluten-free, and more. Our calorie and macronutrient calculations provide a framework that can be applied within your specific dietary constraints.</p>
                </div>
              </details>
            </div>
            
            <div className="bg-white dark:bg-slate-700 rounded-xl shadow-md overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Is my personal data secure with FitCalc Hub?</h3>
                  <span className="transition-transform group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-slate-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-slate-600 dark:text-slate-300">
                  <p>Absolutely. User privacy is our top priority. All your data is stored locally on your device and never sent to external servers without your explicit permission. We don't sell or share your personal information with third parties, and you maintain complete control over your data at all times.</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 text-center bg-white dark:bg-slate-800">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white font-montserrat">
          Ready to take control of your fitness?
        </h2>
        <Link
          to="/input"
          className="inline-flex items-center bg-green-500 text-slate-100 px-6 py-3 rounded-full font-medium hover:bg-green-600 transition-colors duration-300"
        >
          Start Now <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </section>
    </div>
  );
};

export default Home;
