import { Redis } from "@upstash/redis";

export const db = new Redis({
    url : process.env.UPSTASH_REDIS_REST_URL,
    token : process.env.UPSTASH_REDIS_REST_TOKEN,
});

/* From ChatGPT :- 
  Redis is a type of database that's very fast at storing and retrieving data. 
  Unlike traditional databases that store data on disk, Redis keeps everything in memory (RAM), which makes it super quick. 
  It's often used for tasks that need fast access to data, like caching, real-time analytics, and managing session data for web applications. 
  You can think of it like a supercharged, organized version of a whiteboard where you can quickly write and read data. */