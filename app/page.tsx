"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { ArrowRight, ShoppingBag, Store, Search, Box, Phone, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  
  // References for sections - add proper HTMLDivElement type
  const heroRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  
  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Parallax effect for 3D model
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  // Footer animation
  const footerControls = useAnimation();
  
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('footer');
      const footerPosition = footer?.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      
      if (footerPosition && footerPosition < viewportHeight) {
        footerControls.start({
          y: 0,
          transition: { duration: 0.5 }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [footerControls]);

  return (
    <div className="relative p overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <Box className="text-blue-600" />
            <h1 className="text-xl font-bold">DRAWER.IO</h1>
          </div>
          
          <div className="hidden md:flex gap-8">
            <button className="text-gray-600 hover:text-blue-600 transition" 
                    onClick={() => scrollToSection(problemRef)}>
              Why Drawer?
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition"
                    onClick={() => scrollToSection(featuresRef)}>
              Features
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition"
                    onClick={() => scrollToSection(pricingRef)}>
              Pricing
            </button>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm">Log in</Button>
            <Button size="sm">Sign up</Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section ref={heroRef} className="container mx-auto p-2 pt-32 pb-24 md:min-h-screen flex flex-col md:flex-row items-center">
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold font-mono tracking-tight">
            DRAWER.IO
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mt-4 mb-8">
            Online shopping but closer
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="group">
              Continue as a Buyer
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
            </Button>
            <Button size="lg" variant="outline" className="group">
              Join as a Seller
              <Store className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex-1 mt-12 md:mt-0"
          style={{ y }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative w-full h-96">
            {/* Placeholder for 3D model */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden shadow-xl flex items-center justify-center">
              <Box className="w-32 h-32 text-blue-500 animate-pulse" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Problem Statement Section */}
      <section 
        ref={problemRef} 
        className="bg-gray-50 py-24"
      >
        <div className="container p-2 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Online Shopping Has A Problem</h2>
            <p className="text-lg text-gray-600 mb-8">
              Ever bought something online only to find it looks completely different in person? 
              2D images don't capture the true essence of products, leading to disappointment and returns. 
              Sellers struggle with high return rates, and buyers waste time and money on purchases 
              that don't meet expectations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <ShoppingBag className="text-red-500" />
                </div>
                <h3 className="font-bold mb-2">High Return Rates</h3>
                <p className="text-gray-600 text-sm">Up to 30% of online purchases are returned due to expectation mismatch</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Users className="text-orange-500" />
                </div>
                <h3 className="font-bold mb-2">Customer Dissatisfaction</h3>
                <p className="text-gray-600 text-sm">Poor product visualization leads to disappointing shopping experiences</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <DollarSign className="text-yellow-500" />
                </div>
                <h3 className="font-bold mb-2">Cost Inefficiency</h3>
                <p className="text-gray-600 text-sm">Traditional 3D modeling is expensive and time-consuming for merchants</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Solution Section */}
      <section 
        ref={solutionRef} 
        className="py-24 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="container p-2 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">That's Why We Present You DRAWER</h2>
            <p className="text-lg text-gray-600 mb-8">
              DRAWER.IO transforms online shopping with AI-powered 3D and AR technology. 
              Sellers upload a single product image, and our Hunyuan3D model instantly creates an
              interactive 3D model. Buyers can examine products from every angle and even place them
              in their own space using AR, making online shopping closer to reality than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="group">
                Experience the Difference
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
              </Button>
              <Button size="lg" variant="outline" className="group">
                See How It Works
                <Box className="ml-2 w-4 h-4 group-hover:rotate-12 transition" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Bento Grid */}
      <section 
        ref={featuresRef} 
        className="py-24 bg-white"
      >
        <div className="container p-2 mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Key Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Card 1 - Large */}
            <motion.div 
              className="col-span-1 md:col-span-2 row-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full group hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <Box className="mr-2 text-blue-600" /> 
                  Instant 3D Model Generation
                </h3>
                <p className="text-gray-600">
                  Upload a single image and Hunyuan3D automatically converts it into a detailed, 
                  interactive 3D model in seconds. No specialized photography or manual modeling required.
                </p>
                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">
                    "Our return rates dropped by 40% after implementing DRAWER.IO's 3D models" - Fashion Retailer
                  </p>
                </div>
              </Card>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full group hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <Phone className="mr-2 text-green-600" /> 
                  Augmented Reality View
                </h3>
                <p className="text-gray-600">
                  See how products look in your own space before buying. Our AR feature works on any 
                  modern smartphone without additional apps.
                </p>
              </Card>
            </motion.div>
            
            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full group hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <Search className="mr-2 text-purple-600" /> 
                  Intelligent Search Assistant
                </h3>
                <p className="text-gray-600">
                  Our AI-powered chatbot helps you find exactly what you're looking for, understanding 
                  natural language queries and preferences.
                </p>
              </Card>
            </motion.div>
            
            {/* Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full group hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <Store className="mr-2 text-orange-600" /> 
                  Seamless Seller Integration
                </h3>
                <p className="text-gray-600">
                  Easy integration with your existing e-commerce platform. Works with Shopify, WooCommerce, 
                  Magento, and custom solutions.
                </p>
              </Card>
            </motion.div>
            
            {/* Card 5 - Large */}
            <motion.div 
              className="col-span-1 md:col-span-2 row-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full group hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <Users className="mr-2 text-teal-600" /> 
                  Enhanced Customer Experience
                </h3>
                <p className="text-gray-600">
                  Create a memorable shopping experience that increases conversion rates and customer 
                  satisfaction. Our analytics show that DRAWER.IO users spend 3x longer engaging with 
                  products and are 65% more likely to complete a purchase.
                </p>
                <div className="mt-4 relative h-24 bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <p className="text-sm text-teal-800 font-medium relative z-10">Interactive 3D models increase conversion rates by up to 40%</p>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-teal-200/50 absolute"
                      animate={{
                        x: [0, 100, 200, 100, 0],
                        y: [0, 50, 0, 50, 0],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    ></motion.div>
                    <motion.div
                      className="w-8 h-8 rounded-full bg-blue-200/50 absolute right-12"
                      animate={{
                        x: [0, -50, -100, -50, 0],
                        y: [0, 30, 60, 30, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    ></motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section 
        ref={pricingRef} 
        className="py-24 bg-gray-50"
      >
        <div className="container p-2 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600">
              Choose the plan that fits your business, no hidden fees or long-term commitments.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <p className="text-gray-600 mb-4">Perfect for small businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Up to 100 product conversions</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Basic AR integration</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Email support</span>
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </div>
            </motion.div>
            
            {/* Professional Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md border-2 border-blue-500 overflow-hidden relative hover:shadow-lg transition-shadow duration-300"
            >
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-bl">
                MOST POPULAR
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Professional</h3>
                <p className="text-gray-600 mb-4">For growing businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">$79</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Up to 500 product conversions</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Advanced AR features</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Analytics dashboard</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Choose Plan</Button>
              </div>
            </motion.div>
            
            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-4">For large businesses</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Unlimited product conversions</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Custom API integration</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span>Advanced customization</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">Contact Sales</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <motion.footer
        id="footer"
        initial={{ y: "100%" }}
        animate={footerControls}
        className="bg-black text-white py-16"
      >
        <div className="container p-2 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Box className="text-blue-400" />
                <h3 className="text-xl font-bold">DRAWER.IO</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Revolutionizing online shopping with 3D and AR technology
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}