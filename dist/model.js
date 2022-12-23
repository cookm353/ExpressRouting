class Stats {
    mean(numbers) {
        // Find the mean of an array of numbers
        return numbers.reduce((sum, curr) => {
            return sum + parseInt(curr);
        }, 0) / numbers.length;
    }
    median(numbers) {
        // Find the median of an array of numbers
        numbers = numbers.sort();
        if (numbers.length % 2 === 1) {
            const midIndex = Math.floor(numbers.length / 2);
            return numbers[midIndex];
        }
        else {
            const firstIndex = numbers.length / 2 - 1;
            const secondIndex = numbers.length / 2;
            return (numbers[firstIndex] + numbers[secondIndex]) / 2;
        }
    }
    mode(numbers) {
        // Find the mode of an array of numbers
        let mode = 0;
        let instanceCount = 0;
        const numberCounts = {};
        numbers = numbers.sort();
        for (let number of numbers) {
            if (!numberCounts[number]) {
                numberCounts[number] = 1;
            }
            else {
                numberCounts[number] += 1;
            }
            if (numberCounts[number] > instanceCount) {
                mode = number;
                instanceCount = numberCounts[number];
            }
        }
        return mode;
    }
}
module.exports = {
    Stats
};
