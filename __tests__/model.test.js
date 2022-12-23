const { Stats } = require('../dist/model')

describe("Test stats methods", () => {
    let stats
    
    beforeAll(() => {
        stats = new Stats()
    })

    test("Test mean with ints", () => {
        let nums = [1, 2, 3, 4, 5]
        expect(stats.mean(nums)).toEqual(3)
    })

    test("Test mean with floats", () => {
        let nums = [1.0, 2.0, 3.0, 4.0, 5.0]
        expect(stats.mean(nums)).toBeCloseTo(3.0)
    })

    test("Test median with an even number of ints", () => {
        let nums = [1, 2, 3, 4]
        expect(stats.median(nums)).toBeCloseTo(2.5)
    })

    test("Test median with an odd number of ints", () => {
        let nums = [1, 2, 3, 4, 5]
        expect(stats.median(nums)).toEqual(3)
    })

    test("Test mode", () => {
        let nums = [1, 2, 2, 3, 4]
        expect(stats.mode(nums)).toEqual(2)
    })
})