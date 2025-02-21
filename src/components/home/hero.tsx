"use client";
import React from 'react'
import { motion } from "framer-motion";
import { Separator } from '../ui/separator';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center space-y-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container flex flex-col items-center justify-center gap-6 text-center"
          >
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              href="#"
              className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm font-medium"
            >
              🎉 <Separator className="mx-2 h-4" orientation="vertical" /> Introducing Quinx
            </motion.a>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl lg:leading-[1.1]"
            >
              Build Discord Bots
              <br />
              Without Code
            </motion.h1>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl"
            >
              Create, deploy, and scale Discord bots without writing a single line of code.
            </motion.span>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
              >
                  <Link href={"/onboarding"}>
              <button className="bg-foreground text-background px-6 py-3 rounded-lg font-medium text-lg from-accent-foreground to-accent-background bg-gradient-to-r">
                Start Building
              </button>
                  </Link>
            </motion.div>
          </motion.div>
        </section>
  )
}

export default HeroSection;