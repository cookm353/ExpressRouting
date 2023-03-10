const { Stats, RequestHandler, ExpressError } = require('../dist/models')

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

describe("Test request handler", () => {
    let handler
    let nums

    beforeAll(() => {
        nums = [1, 3, 3, 3, 5]
        handler = new RequestHandler()
    })

    test("Test response builder for mean", () => {
        expect(handler.buildResponse("mean", nums)).toEqual({
            "operation": "mean",
            "value": 3
        })
    })

    test("Test response builder for median", () => {
        expect(handler.buildResponse("median", nums)).toEqual({
            "operation": "median",
            "value": 3
        })
    })

    test("Test response builder for mode", () => {
        expect(handler.buildResponse("mode", nums)).toEqual({
            "operation": "mode",
            "value": 3
        })
    })

    test("Test response builder for all", () => {
        expect(handler.buildResponse("all", nums)).toEqual({
            "mean": 3,
            "median": 3,
            "mode": 3
        })
    })

    test("Test validating input with ints", () => {
        const body = {nums: nums}
        expect(handler.validateInput(body)).toBeUndefined()
    })

    test("Test validating input with string number", () => {
        nums = [1, 2, "3"]
        const body = {nums: nums}
        expect(handler.validateInput(body)).toBeUndefined()
    })

    test("Test validating with string in array", () => {
        nums = [1, 2, 3, "foo"]
        const body = {nums: nums}
        const error = handler.validateInput(body)
        expect(error).toBeInstanceOf(ExpressError)
        expect(error.msg).toEqual("Array must contain only numbers")
    })

    test("Test validating with empty array", () => {
        nums = []
        const body = {nums: nums}
        const error = handler.validateInput(body)
        expect(error).toBeInstanceOf(ExpressError)
        expect(error.msg).toEqual("Numbers are required")
    })

    test("Test validating without any nums", () => {
        const body = {}
        const error = handler.validateInput(body)
        expect(error).toBeInstanceOf(ExpressError)
        expect(error.msg).toEqual("Numbers are required")
    })
})