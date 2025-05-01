
import { motion } from 'framer-motion';
import React from 'react';

// Fade in animation
export const FadeIn: React.FC<{ children: React.ReactNode, delay?: number }> = ({ 
  children, 
  delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

// Slide up animation
export const SlideUp: React.FC<{ children: React.ReactNode, delay?: number }> = ({ 
  children, 
  delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

// Slide in from left animation
export const SlideInLeft: React.FC<{ children: React.ReactNode, delay?: number }> = ({ 
  children, 
  delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

// Slide in from right animation
export const SlideInRight: React.FC<{ children: React.ReactNode, delay?: number }> = ({ 
  children, 
  delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

// Staggered children animation
export const StaggerContainer: React.FC<{ 
  children: React.ReactNode, 
  delay?: number,
  staggerChildren?: number
}> = ({ 
  children, 
  delay = 0,
  staggerChildren = 0.1
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delay,
          staggerChildren,
          when: "beforeChildren"
        }
      }
    }}
  >
    {children}
  </motion.div>
);

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Page transition wrapper
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);
