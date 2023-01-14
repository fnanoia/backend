const autocannon = require('autocannon')

async function foo() {
    const result = await autocannon({
        url: 'http://localhost:8081/info',
        connections: 100, //default
        duration: 20 // default
    })
    console.log(result)
}

foo()