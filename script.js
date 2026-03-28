// ========== FOOD DATABASE ==========
const foodDatabase = [
    // Breakfast
    { id: 1, name: "Oatmeal with Berries", calories: 320, protein: 12, carbs: 55, fats: 6, category: "breakfast", emoji: "🥣" },
    { id: 2, name: "Greek Yogurt with Honey", calories: 250, protein: 20, carbs: 30, fats: 8, category: "breakfast", emoji: "🍯" },
    { id: 3, name: "Scrambled Eggs (2)", calories: 180, protein: 14, carbs: 2, fats: 12, category: "breakfast", emoji: "🍳" },
    { id: 4, name: "Avocado Toast", calories: 280, protein: 8, carbs: 25, fats: 16, category: "breakfast", emoji: "🥑" },
    { id: 5, name: "Protein Pancakes", calories: 350, protein: 25, carbs: 40, fats: 10, category: "breakfast", emoji: "🥞" },
    
    // Lunch
    { id: 6, name: "Grilled Chicken Salad", calories: 380, protein: 35, carbs: 15, fats: 20, category: "lunch", emoji: "🥗" },
    { id: 7, name: "Quinoa Bowl", calories: 420, protein: 15, carbs: 60, fats: 12, category: "lunch", emoji: "🥣" },
    { id: 8, name: "Turkey Sandwich", calories: 350, protein: 28, carbs: 35, fats: 12, category: "lunch", emoji: "🥪" },
    { id: 9, name: "Salmon with Veggies", calories: 450, protein: 40, carbs: 20, fats: 22, category: "lunch", emoji: "🐟" },
    { id: 10, name: "Lentil Soup", calories: 280, protein: 18, carbs: 45, fats: 5, category: "lunch", emoji: "🥣" },
    
    // Dinner
    { id: 11, name: "Grilled Chicken Breast", calories: 280, protein: 45, carbs: 0, fats: 10, category: "dinner", emoji: "🍗" },
    { id: 12, name: "Steamed Fish", calories: 320, protein: 38, carbs: 5, fats: 15, category: "dinner", emoji: "🐟" },
    { id: 13, name: "Tofu Stir Fry", calories: 340, protein: 20, carbs: 25, fats: 18, category: "dinner", emoji: "🥬" },
    { id: 14, name: "Brown Rice with Veggies", calories: 380, protein: 10, carbs: 70, fats: 8, category: "dinner", emoji: "🍚" },
    { id: 15, name: "Zucchini Noodles", calories: 220, protein: 12, carbs: 18, fats: 12, category: "dinner", emoji: "🥒" },
    
    // Snacks
    { id: 16, name: "Apple", calories: 95, protein: 0.5, carbs: 25, fats: 0.3, category: "snacks", emoji: "🍎" },
    { id: 17, name: "Banana", calories: 105, protein: 1, carbs: 27, fats: 0.4, category: "snacks", emoji: "🍌" },
    { id: 18, name: "Protein Bar", calories: 200, protein: 20, carbs: 22, fats: 8, category: "snacks", emoji: "🍫" },
    { id: 19, name: "Almonds (10g)", calories: 58, protein: 2, carbs: 2, fats: 5, category: "snacks", emoji: "🌰" },
    { id: 20, name: "Greek Yogurt", calories: 150, protein: 15, carbs: 9, fats: 8, category: "snacks", emoji: "🥛" },
    
    // Protein
    { id: 21, name: "Whey Protein Shake", calories: 120, protein: 24, carbs: 3, fats: 1, category: "protein", emoji: "🥤" },
    { id: 22, name: "Chicken Breast (100g)", calories: 165, protein: 31, carbs: 0, fats: 3.6, category: "protein", emoji: "🍗" },
    { id: 23, name: "Egg Whites (3)", calories: 51, protein: 11, carbs: 1, fats: 0, category: "protein", emoji: "🥚" },
    { id: 24, name: "Tuna Can", calories: 120, protein: 26, carbs: 0, fats: 1, category: "protein", emoji: "🐟" },
    { id: 25, name: "Cottage Cheese", calories: 110, protein: 12, carbs: 4, fats: 5, category: "protein", emoji: "🧀" }
];

let customFoods = [];
let meals = [];

// User Profile
let userProfile = {
    name: "Fitness Enthusiast",
    goal: "weight-loss",
    calorieGoal: 2000,
    proteinGoal: 100,
    carbsGoal: 250,
    fatsGoal: 55
};

// Daily Totals
let dailyTotals = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
};

// DOM Elements
const foodGrid = document.getElementById('foodGrid');
const mealList = document.getElementById('mealList');
const toast = document.getElementById('toast');
const searchInput = document.getElementById('searchInput');
const sortFilter = document.getElementById('sortFilter');
const addFoodBtn = document.getElementById('addFoodBtn');
const foodModal = document.getElementById('foodModal');
const closeModal = document.querySelector('.close-modal');
const saveCustomFood = document.getElementById('saveCustomFood');
const resetDayBtn = document.getElementById('resetDayBtn');
const updateProfileBtn = document.getElementById('updateProfileBtn');
const userNameInput = document.getElementById('userName');
const goalSelect = document.getElementById('goal');

// Load saved data from localStorage
function loadData() {
    const savedMeals = localStorage.getItem('fitnessMeals');
    if (savedMeals) {
        meals = JSON.parse(savedMeals);
        calculateTotals();
    }
    
    const savedCustom = localStorage.getItem('customFoods');
    if (savedCustom) {
        customFoods = JSON.parse(savedCustom);
    }
    
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        userProfile = JSON.parse(savedProfile);
        userNameInput.value = userProfile.name;
        goalSelect.value = userProfile.goal;
        updateGoalsByGoal();
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('fitnessMeals', JSON.stringify(meals));
    localStorage.setItem('customFoods', JSON.stringify(customFoods));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

// Update goals based on selected goal
function updateGoalsByGoal() {
    if (userProfile.goal === 'weight-loss') {
        userProfile.calorieGoal = 1800;
        userProfile.proteinGoal = 120;
        userProfile.carbsGoal = 180;
        userProfile.fatsGoal = 50;
    } else if (userProfile.goal === 'muscle-gain') {
        userProfile.calorieGoal = 2800;
        userProfile.proteinGoal = 160;
        userProfile.carbsGoal = 350;
        userProfile.fatsGoal = 80;
    } else {
        userProfile.calorieGoal = 2200;
        userProfile.proteinGoal = 120;
        userProfile.carbsGoal = 250;
        userProfile.fatsGoal = 65;
    }
    
    document.getElementById('calorieGoal').innerText = userProfile.calorieGoal;
    document.getElementById('proteinGoal').innerText = userProfile.proteinGoal + 'g';
    document.getElementById('carbsGoal').innerText = userProfile.carbsGoal + 'g';
    document.getElementById('fatsGoal').innerText = userProfile.fatsGoal + 'g';
    updateProgress();
}

// Calculate daily totals
function calculateTotals() {
    dailyTotals = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0
    };
    
    meals.forEach(meal => {
        dailyTotals.calories += meal.calories * meal.quantity;
        dailyTotals.protein += meal.protein * meal.quantity;
        dailyTotals.carbs += meal.carbs * meal.quantity;
        dailyTotals.fats += meal.fats * meal.quantity;
    });
    
    updateDisplay();
    updateProgress();
    updateMotivation();
    saveData();
}

// Update display numbers
function updateDisplay() {
    document.getElementById('caloriesConsumed').innerText = Math.round(dailyTotals.calories);
    document.getElementById('proteinConsumed').innerText = Math.round(dailyTotals.protein);
    document.getElementById('carbsConsumed').innerText = Math.round(dailyTotals.carbs);
    document.getElementById('fatsConsumed').innerText = Math.round(dailyTotals.fats);
}

// Update progress bars
function updateProgress() {
    const caloriePercent = Math.min(100, (dailyTotals.calories / userProfile.calorieGoal) * 100);
    const proteinPercent = Math.min(100, (dailyTotals.protein / userProfile.proteinGoal) * 100);
    const carbsPercent = Math.min(100, (dailyTotals.carbs / userProfile.carbsGoal) * 100);
    const fatsPercent = Math.min(100, (dailyTotals.fats / userProfile.fatsGoal) * 100);
    
    document.getElementById('calorieFill').style.width = caloriePercent + '%';
    document.getElementById('proteinFill').style.width = proteinPercent + '%';
    document.getElementById('carbsFill').style.width = carbsPercent + '%';
    document.getElementById('fatsFill').style.width = fatsPercent + '%';
}

// Update motivation message
function updateMotivation() {
    const msg = document.getElementById('motivationMsg');
    const percent = (dailyTotals.calories / userProfile.calorieGoal) * 100;
    
    if (percent >= 100) {
        msg.innerHTML = "🎉 Goal achieved! Amazing work! 🎉";
        msg.style.color = "#ffd93d";
    } else if (percent >= 80) {
        msg.innerHTML = "🔥 Almost there! Keep pushing! 🔥";
        msg.style.color = "#ffb347";
    } else if (percent >= 50) {
        msg.innerHTML = "💪 You're doing great! Halfway there! 💪";
        msg.style.color = "#a8e6cf";
    } else {
        msg.innerHTML = "✨ Start adding your meals! You got this! ✨";
        msg.style.color = "#b2bec3";
    }
}

// Add food to meals
function addToMeals(foodId, quantity = 1) {
    let food = [...foodDatabase, ...customFoods].find(f => f.id === foodId);
    if (!food) return;
    
    const existing = meals.find(m => m.id === foodId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        meals.push({ ...food, quantity: quantity });
    }
    
    calculateTotals();
    showToast(`✅ Added ${food.name} (${quantity}x)`);
    updateMealList();
}

// Remove from meals
function removeFromMeals(foodId) {
    meals = meals.filter(m => m.id !== foodId);
    calculateTotals();
    showToast(`❌ Removed from meals`);
    updateMealList();
}

// Update quantity
function updateQuantity(foodId, delta) {
    const meal = meals.find(m => m.id === foodId);
    if (meal) {
        meal.quantity += delta;
        if (meal.quantity <= 0) {
            removeFromMeals(foodId);
        } else {
            calculateTotals();
            updateMealList();
        }
    }
}

// Update meal list display
function updateMealList() {
    if (meals.length === 0) {
        mealList.innerHTML = '<p style="text-align: center; color: #b2bec3;">No meals added yet. Start adding food! 🍽️</p>';
        return;
    }
    
    mealList.innerHTML = meals.map(meal => `
        <div class="meal-item">
            <div class="meal-item-info">
                <div class="meal-item-name">${meal.name} ${meal.emoji || '🍽️'}</div>
                <div class="meal-item-macros">🔥 ${meal.calories * meal.quantity} cal | 🥩 ${meal.protein * meal.quantity}g | 🍚 ${meal.carbs * meal.quantity}g | 🥑 ${meal.fats * meal.quantity}g</div>
            </div>
            <div class="meal-item-actions">
                <button onclick="updateQuantity(${meal.id}, -1)">-</button>
                <span style="min-width: 30px; text-align: center;">${meal.quantity}</span>
                <button onclick="updateQuantity(${meal.id}, 1)">+</button>
                <button onclick="removeFromMeals(${meal.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

// Render food grid
function renderFoods() {
    let foods = [...foodDatabase, ...customFoods];
    const category = document.querySelector('.tab-btn.active').dataset.category;
    const searchTerm = searchInput.value.toLowerCase();
    const sortBy = sortFilter.value;
    
    // Filter by category
    if (category !== 'all') {
        foods = foods.filter(f => f.category === category);
    }
    
    // Filter by search
    if (searchTerm) {
        foods = foods.filter(f => f.name.toLowerCase().includes(searchTerm));
    }
    
    // Sort
    if (sortBy === 'calories') {
        foods.sort((a, b) => a.calories - b.calories);
    } else if (sortBy === 'protein') {
        foods.sort((a, b) => b.protein - a.protein);
    } else {
        foods.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    foodGrid.innerHTML = foods.map(food => `
        <div class="food-card">
            <div class="food-header">
                <span class="food-name">${food.emoji || '🍽️'} ${food.name}</span>
                <span class="food-category">${food.category}</span>
            </div>
            <div class="macro-details">
                <span>🔥 ${food.calories} cal</span>
                <span>🥩 ${food.protein}g</span>
                <span>🍚 ${food.carbs}g</span>
                <span>🥑 ${food.fats}g</span>
            </div>
            <div class="food-actions">
                <button class="add-btn" onclick="addToMeals(${food.id})">Add to Log +</button>
            </div>
        </div>
    `).join('');
}

// Add custom food
function addCustomFood() {
    const name = document.getElementById('customFoodName').value;
    const calories = parseFloat(document.getElementById('customCalories').value);
    const protein = parseFloat(document.getElementById('customProtein').value);
    const carbs = parseFloat(document.getElementById('customCarbs').value);
    const fats = parseFloat(document.getElementById('customFats').value);
    const category = document.getElementById('customCategory').value;
    
    if (!name || !calories) {
        showToast('Please fill food name and calories!');
        return;
    }
    
    const newId = Date.now();
    customFoods.push({
        id: newId,
        name: name,
        calories: calories,
        protein: protein || 0,
        carbs: carbs || 0,
        fats: fats || 0,
        category: category,
        emoji: '🍽️'
    });
    
    saveData();
    renderFoods();
    showToast(`✅ Added ${name} to database!`);
    
    // Clear form
    document.getElementById('customFoodName').value = '';
    document.getElementById('customCalories').value = '';
    document.getElementById('customProtein').value = '';
    document.getElementById('customCarbs').value = '';
    document.getElementById('customFats').value = '';
    
    foodModal.style.display = 'none';
}

// Reset day
function resetDay() {
    meals = [];
    calculateTotals();
    updateMealList();
    showToast('🔄 Day reset! Start fresh!');
}

// Update profile
function updateProfile() {
    userProfile.name = userNameInput.value;
    userProfile.goal = goalSelect.value;
    updateGoalsByGoal();
    saveData();
    showToast(`Profile updated!`);
}

// Show toast
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Event Listeners
searchInput.addEventListener('input', renderFoods);
sortFilter.addEventListener('change', renderFoods);
addFoodBtn.addEventListener('click', () => {
    foodModal.style.display = 'flex';
});
closeModal.addEventListener('click', () => {
    foodModal.style.display = 'none';
});
saveCustomFood.addEventListener('click', addCustomFood);
resetDayBtn.addEventListener('click', resetDay);
updateProfileBtn.addEventListener('click', updateProfile);

// Category tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderFoods();
    });
});

// Initialize
loadData();
renderFoods();
updateMealList();

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === foodModal) {
        foodModal.style.display = 'none';
    }
});