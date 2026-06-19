type WorkoutInput = {
  goal: string;
  workoutType: string;
  experienceLevel: string;
  workoutTime: number;
};

export function generateWorkoutPlan(input: WorkoutInput) {
  const muscle = input.goal === "Muscle Gain" ? "hypertrophy" : input.goal.toLowerCase();
  const base = input.workoutType === "Home Workout"
    ? ["Push-ups", "Tempo squats", "Plank shoulder taps", "Reverse lunges", "Burpees"]
    : ["Barbell squat", "Bench press", "Lat pulldown", "Romanian deadlift", "Cable row"];
  const rounds = input.workoutTime >= 60 ? 5 : input.workoutTime >= 40 ? 4 : 3;
  const rest = input.goal === "Strength" ? "90 sec" : "45 sec";

  return base.map((name, index) => ({
    name,
    focus: index % 2 === 0 ? muscle : "conditioning",
    sets: rounds,
    reps: input.goal === "Strength" ? "5-8" : "10-15",
    rest
  }));
}

export function estimateWorkoutCalories(minutes: number, goal: string) {
  const multiplier = goal === "Weight Loss" || goal === "Endurance" ? 8 : 6;
  return Math.round(minutes * multiplier);
}

export function generateMealPlan(goal: string, weight: number) {
  const cutting = goal === "Weight Loss";
  const calories = Math.round((cutting ? 26 : 33) * weight);
  const protein = Math.round(weight * 1.8);
  const fats = Math.round((calories * 0.25) / 9);
  const carbs = Math.round((calories - protein * 4 - fats * 9) / 4);

  const meals = [
    { meal: "Breakfast", item: cutting ? "Greek yogurt, berries, oats" : "Egg scramble, oats, banana", calories: Math.round(calories * 0.25) },
    { meal: "Lunch", item: "Grilled chicken bowl with rice, greens, olive oil", calories: Math.round(calories * 0.32) },
    { meal: "Dinner", item: cutting ? "Salmon, vegetables, sweet potato" : "Lean beef, pasta, vegetables", calories: Math.round(calories * 0.31) },
    { meal: "Snacks", item: "Protein shake, nuts, fruit", calories: Math.round(calories * 0.12) }
  ];

  const weekly = Array.from({ length: 7 }, (_, day) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][day],
    meals
  }));

  return { meals, weekly, calories, protein, carbs, fats };
}

export function localCoachReply(message: string) {
  const lower = message.toLowerCase();
  if (lower.includes("weight loss")) {
    return "For fat loss, keep a moderate calorie deficit, lift 3-4 times weekly, add 8k-10k steps, and track waist plus scale trends for two weeks.";
  }
  if (lower.includes("muscle") || lower.includes("gain")) {
    return "For muscle gain, train each muscle twice weekly, add progressive overload, eat 1.6-2.2g protein per kg, and keep a small calorie surplus.";
  }
  if (lower.includes("diet") || lower.includes("meal")) {
    return "Build each meal around protein, a fiber-rich carb, colorful vegetables, and a measured fat source. Consistency beats a perfect one-day plan.";
  }
  return "Start with a realistic weekly target: 3 strength sessions, 2 conditioning sessions, daily hydration, and 7-8 hours of sleep. Tell me your goal and time available for a tighter plan.";
}
