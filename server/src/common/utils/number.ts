export const generateUniqueDigits = (): number => {
    // Fisher-Yates shuffle to create a random order of digits 0-9
    const nums = Array.from({ length: 10 }, (_, i) => i.toString());

    for (let i = 9; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    const selected = nums.slice(0, 6);

    // Shuffle the 6 digits again (ensures final order is random)
    for (let i = 5; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selected[i], selected[j]] = [selected[j], selected[i]];
    }

    return Number(selected.join(''));
};
