import { z } from "zod";

const optionalNumber = (schema: z.ZodNumber) =>
  z.preprocess((value) => (value === "" || value === null ? undefined : value), schema.optional());

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8)
});

export const resetPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8)
});

export const registerSchema = z.object({
  name: z.string().trim().min(2),
  age: z.coerce.number().int().min(13).max(100),
  gender: z.string().min(2),
  height: optionalNumber(z.coerce.number().min(90).max(250)),
  weight: optionalNumber(z.coerce.number().min(30).max(300)),
  goal: z.string().min(2),
  experienceLevel: z.string().min(2),
  workoutTime: optionalNumber(z.coerce.number().int().min(10).max(180)),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8)
});

export const bmiSchema = z.object({
  height: z.coerce.number().min(90).max(250),
  weight: z.coerce.number().min(30).max(300)
});

export const calorieSchema = z.object({
  food: z.string().min(2),
  quantity: z.string().min(1),
  calories: z.coerce.number().int().min(1).max(10000)
});

export const workoutSchema = z.object({
  goal: z.string().min(2),
  workoutType: z.string().min(2),
  experienceLevel: z.string().min(2),
  workoutTime: z.coerce.number().int().min(10).max(180)
});

export const dietSchema = z.object({
  age: z.coerce.number().int().min(13).max(100),
  weight: z.coerce.number().min(30).max(300),
  goal: z.string().min(2),
  workoutSchedule: z.string().min(2)
});

export const chatSchema = z.object({
  message: z.string().min(2).max(1000)
});
