class Stats {
    mean(numbers: Array<number>): number {
        // Find the mean of an array of numbers
        return numbers.reduce((sum: number, curr: string) => {
            return sum + parseInt(curr)
        }, 0) / numbers.length
    }

    median(numbers: Array<number>): number {
        // Find the median of an array of numbers
        numbers = numbers.sort()

        if ( numbers.length % 2 === 1 ) {
            const midIndex = Math.floor(numbers.length / 2)
            return numbers[midIndex]
        } else {
            const firstIndex = numbers.length / 2 - 1
            const secondIndex = numbers.length / 2

            return (numbers[firstIndex] + numbers[secondIndex]) / 2
        }
    }

    mode(numbers: Array<number>): number {
        // Find the mode of an array of numbers
        let mode: number = 0
        let instanceCount: number = 0
        const numberCounts: object = {}

        numbers = numbers.sort()

        for (let number of numbers) {
            if ( ! numberCounts[number] ) {
                numberCounts[number] = 1
            } else {
                numberCounts[number] += 1
            }

            if ( numberCounts[number] > instanceCount ) {
                mode = number
                instanceCount = numberCounts[number]
            }
        }

        return mode
    }
}

interface StatsResp {
    "operation": string,
    "value": number
}

interface AllResp {
    "mean": number,
    "median": number,
    "mode": number
}

class RequestHandler {   
    // Create response object
    buildResponse(operation: string, nums: Array<number>): StatsResp | AllResp {
        let resp: StatsResp | AllResp
        const stats = new Stats()

        switch (operation) {
            case "mean":
                resp = {
                    "operation": operation,
                    "value": stats.mean(nums)
                }
                break
            case "median":
                resp = {
                    "operation": operation,
                    "value": stats.median(nums)
                }
                break
            case "mode":
                resp = {
                    "operation": operation,
                    "value": stats.mode(nums)
                }
                break
            case "all":
                resp = {
                    "mean": stats.mean(nums),
                    "median": stats.median(nums),
                    "mode": stats.mode(nums)
                }
                break
        }
        return resp
    }
    
    // Write the result to a file
    writeResult(json): void {
        fs.writeFile('./results.json', json, 'utf8', err => {
            if (err) {
                console.log(`Error: ${err}`)
            }
            console.log("Success!")
        })
    }

    // Verify input
    validateInput(nums: Array<number | string>): object | void {
        if (nums.length == 0 || ! nums) {
            return new ExpressError("Numbers are required", 400)
        } else {
            const isAllNumbers = nums.every(element => {
                return ! Number.isNaN(parseInt(element))
            })
            if (! isAllNumbers) return new ExpressError("Array must contain only numbers", 400)
        }
    }
}

class ExpressError extends Error {
    msg: string
    status: number

    constructor(msg: string, status: number) {
        super()
        this.msg = msg
        this.status = status
        console.error(this.stack)
    }
}

module.exports = {
    Stats,
    RequestHandler,
    ExpressError
}
