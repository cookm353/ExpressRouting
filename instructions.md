# Express Routing Exercises

- Build an app that finds the mean, median, and mode for an arbitrary amount of numbers
- [x] The three base routes should be `/mean`, `/median`, and `/mode`
  - [x] All should accept GET requests
- [x] Each route takes a query key called **nums**, which is a comma separated list of numbers
- [x] The server should respond with JSON which looks like the following:

```JSON
response: {
    "operation": "mean",
    "value": 4
}
```

- [ ] The app should also handle the following errors:
  - [ ] Passing an invalid number (NaN errors)
    - [ ] Return a 400 status code
    - [ ] Return a response saying <x> is not a number
  - [ ] Empty input
    - [ ] Return a 400 status code
    - [ ] Return a message saying nums are required

## Further Study

- [x] Make a route called `/all` that handles all three operations at the same time and returns them all in a single JSON object
- [ ] Provide handling for an optional query key called **save** which can be set to true
  - [ ] The operation will write to a file called `results.json`
- [ ] Add a timestamp for every operation that writes to a file
- [ ] Honor the Accept header
  - [ ] Return JSON if the client requests application/json, return HTML if the client requests txt/html
