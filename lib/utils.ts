import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateBmi(heightCm: number, weightKg: number) {
  const meters = heightCm / 100;
  const bmi = Number((weightKg / (meters * meters)).toFixed(1));
  const category =
    bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Obese";
  const suggestion =
    category === "Healthy"
      ? "Maintain your strength routine, protein intake, hydration, and sleep rhythm."
      : category === "Underweight"
        ? "Add a small calorie surplus, prioritize resistance training, and track weekly weight gain."
        : "Create a steady calorie deficit, lift 3-5 days per week, and keep daily steps consistent.";
  return { bmi, category, suggestion };
}

export function startOfDay(date = new Date()) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}
