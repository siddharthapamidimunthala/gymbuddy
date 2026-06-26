type FoodCalorieEntry = {
  name: string;
  caloriesPer100g: number;
  aliases: string[];
};

const foodCalories: FoodCalorieEntry[] = [
  { name: "Apple", caloriesPer100g: 52, aliases: ["apple"] },
  { name: "Banana", caloriesPer100g: 89, aliases: ["banana"] },
  { name: "Beef", caloriesPer100g: 250, aliases: ["beef", "steak"] },
  { name: "Bread", caloriesPer100g: 265, aliases: ["bread", "toast"] },
  { name: "Brown Rice", caloriesPer100g: 111, aliases: ["brown rice"] },
  { name: "Chicken Breast", caloriesPer100g: 165, aliases: ["chicken", "chicken breast"] },
  { name: "Dal", caloriesPer100g: 116, aliases: ["dal", "lentil", "lentils"] },
  { name: "Egg", caloriesPer100g: 155, aliases: ["egg", "eggs"] },
  { name: "Greek Yogurt", caloriesPer100g: 59, aliases: ["greek yogurt", "yogurt", "curd"] },
  { name: "Milk", caloriesPer100g: 61, aliases: ["milk"] },
  { name: "Oats", caloriesPer100g: 389, aliases: ["oats", "oatmeal"] },
  { name: "Paneer", caloriesPer100g: 265, aliases: ["paneer"] },
  { name: "Peanut Butter", caloriesPer100g: 588, aliases: ["peanut butter"] },
  { name: "Potato", caloriesPer100g: 77, aliases: ["potato", "aloo"] },
  { name: "Rice", caloriesPer100g: 130, aliases: ["rice", "white rice"] },
  { name: "Roti", caloriesPer100g: 297, aliases: ["roti", "chapati"] },
  { name: "Salmon", caloriesPer100g: 208, aliases: ["salmon"] },
  { name: "Sweet Potato", caloriesPer100g: 86, aliases: ["sweet potato"] },
  { name: "Tofu", caloriesPer100g: 76, aliases: ["tofu"] }
];

const fallbackCaloriesPer100g = 150;

export function estimateFoodCalories(food: string, weightGrams: number) {
  const normalizedFood = food.trim().toLowerCase();
  const safeWeight = Number.isFinite(weightGrams) ? Math.max(0, weightGrams) : 0;
  const match = foodCalories.find((entry) =>
    entry.aliases.some((alias) => normalizedFood.includes(alias) || alias.includes(normalizedFood))
  );
  const caloriesPer100g = match?.caloriesPer100g ?? fallbackCaloriesPer100g;

  return {
    matchedFood: match?.name ?? "General food estimate",
    caloriesPer100g,
    calories: Math.max(1, Math.round((caloriesPer100g * safeWeight) / 100))
  };
}
