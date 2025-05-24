import { motion } from 'framer-motion';
import { Award, Github, Linkedin, Mail } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

const Team = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      bio: "Full-stack developer with a passion for fitness and creating intuitive user experiences.",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      social: {
        github: "https://github.com/alexjohnson",
        linkedin: "https://linkedin.com/in/alexjohnson"
      }
    },
    {
      name: "Sophia Chen",
      role: "UI/UX Designer",
      bio: "Creative designer focused on creating beautiful and functional interfaces for fitness applications.",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      social: {
        github: "https://github.com/sophiachen",
        email: "sophia@fitcalchub.com"
      }
    },
    {
      name: "Marcus Williams",
      role: "Fitness Expert",
      bio: "Certified personal trainer with experience developing workout regimens and nutrition plans.",
      imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
      social: {
        linkedin: "https://linkedin.com/in/marcuswilliams",
        email: "marcus@fitcalchub.com"
      }
    },
    {
      name: "Priya Patel",
      role: "Nutrition Specialist",
      bio: "Registered dietitian with a focus on creating healthy meal plans for various fitness goals.",
      imageUrl: "https://randomuser.me/api/portraits/women/28.jpg",
      social: {
        github: "https://github.com/priyapatel",
        linkedin: "https://linkedin.com/in/priyapatel"
      }
    },
    {
      name: "David Kim",
      role: "Backend Developer",
      bio: "Backend specialist with expertise in building efficient workout and nutrition calculation algorithms.",
      imageUrl: "https://randomuser.me/api/portraits/men/78.jpg",
      social: {
        github: "https://github.com/davidkim",
        email: "david@fitcalchub.com"
      }
    },
    {
      name: "Emma Rodriguez",
      role: "QA Engineer",
      bio: "Quality assurance expert ensuring all fitness calculations and recommendations are accurate.",
      imageUrl: "https://randomuser.me/api/portraits/women/17.jpg",
      social: {
        linkedin: "https://linkedin.com/in/emmarodriguez",
        email: "emma@fitcalchub.com"
      }
    },
    {
      name: "James Wilson",
      role: "Project Manager",
      bio: "Agile project manager with a background in health and fitness application development.",
      imageUrl: "https://randomuser.me/api/portraits/men/52.jpg",
      social: {
        github: "https://github.com/jameswilson",
        linkedin: "https://linkedin.com/in/jameswilson"
      }
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white font-montserrat mb-4">
          Meet Our <span className="text-green-500">Team</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          The passionate individuals behind FitCalc Hub, dedicated to helping you achieve your fitness goals through technology and expertise.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg"
          >
            <div className="relative">
              <img 
                src={member.imageUrl} 
                alt={member.name} 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <div className="bg-green-500 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-2">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-green-300 font-medium">{member.role}</p>
              </div>
            </div>
            
            <div className="p-5">
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {member.bio}
              </p>
              
              <div className="flex space-x-3">
                {member.social.github && (
                  <a 
                    href={member.social.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <Github className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                  </a>
                )}
                
                {member.social.linkedin && (
                  <a 
                    href={member.social.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                  </a>
                )}
                
                {member.social.email && (
                  <a 
                    href={`mailto:${member.social.email}`} 
                    className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <Mail className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-green-50 dark:bg-slate-700 p-8 rounded-xl mt-16 text-center"
      >
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
          Want to Join Our Team?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
          We're always looking for talented individuals who are passionate about fitness and technology to join our team.
        </p>
        <a
          href="mailto:careers@fitcalchub.com"
          className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition-colors duration-300"
        >
          <Mail className="mr-2 h-5 w-5" />
          Get in Touch
        </a>
      </motion.div>
    </div>
  );
};

export default Team;
