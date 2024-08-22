// User Data: {"activity": "Very active", "day": 3, "gender": "Male", "goal": "Gain", "goal_speed": null, "goal_weight": 115.6, "height": 170, "month": 3, "plan": {"BMR": null, "TDEE": null, "caloricIntake": null, "macronutrients": {"carbGrams": null, "fatGrams": null, "proteinGrams": null}}, "unit": "metric", "weight": 110, "year": 2000}


export const calculateBMR = (weight, height, age, gender) => {
    if (gender === 'Male') {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'Female') {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
        throw new Error('Invalid gender');
    }
};

export const caclulateTDEE = (bmr, activity) => {
    const activityFactors = {
        'Sedentary': 1.2,
        'Lightly active': 1.375,
        'Moderately active': 1.55,
        'Very active': 1.725
    };

    const factor = activityFactors[activity];
    if (!factor) {
        throw new Error('Invalid activity level');
    }

    return bmr * factor;
}

export const calculateCaloricIntake = (tdee, goal, goal_speed) => {
    let caloricAdjustment = 0;

    if (goal === 'Lose') {
        caloricAdjustment = -500 * goal_speed;
    } else if (goal === 'Gain') {
        caloricAdjustment = 500 * goal_speed;
    }

    return tdee + caloricAdjustment;
}

export const calculateMacroNutrients = (weight, caloricIntake) => {
    const proteinGrams = 2.2 * weight;
    const proteinCalories = proteinGrams * 4;

    const fatCalories = caloricIntake * 0.3;
    const fatGrams = fatCalories / 9;

    const carbCalories = caloricIntake - (proteinCalories + fatCalories);
    const carbGrams = carbCalories / 4;

    return {
        proteinGrams,
        fatGrams,
        carbGrams
    };
}

export const generatePlan = (userData) => {
    const { gender, weight, height, year, month, day, activity, goal, goal_speed } = userData;

    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    const bmr = calculateBMR(weight, height, age, gender);

    const tdee = caclulateTDEE(bmr, activity);

    const caloricIntake = calculateCaloricIntake(tdee, goal, goal_speed);

    const macroNutrients = calculateMacroNutrients(weight, caloricIntake);

    return {
        BMR: bmr.toFixed(2),
        TDEE: tdee.toFixed(2),
        caloricIntake: Math.round(caloricIntake / 10) * 10,
        macronutrients: {
            proteinGrams: Math.round(macroNutrients.proteinGrams),
            fatGrams: Math.round(macroNutrients.fatGrams / 10) * 10,
            carbGrams: Math.round(macroNutrients.carbGrams / 10) * 10
        }
    };
}