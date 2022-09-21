# Monster Fetch

Request library for browsers, based on the Fetch API

## Table of Contents

 - [Browser Support](#browser-support)
 - [Installing](#installing)
 - [Example](#example)
 - [Monster Fetch API](#monster-fetch-api)
 - [Request Config](#request-config)
 - [Response Schema](#response-schema)
 - [Config Default](#config-default)
 - [Interceptors](#interceptors)
 - [Cancel Request](#cancel-request)
 - [License](#license)

## Browser Support

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) |
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Installing

Using npm:
```bash
$ npm install monster-fetch
```

Using yarn:
```bash
$ yarn add monster-fetch
```

Using yarn:
```bash
$ yarn add monster-fetch
```

Using jsDelivr CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/monster-fetch/dist/fetch.min.js"></script>
```

Using unpkg CDN:
```html
<script src="https://unpkg.com/monster-fetch/dist/fetch.min.js"></script>
```

## Example
Import Monster Fetch in your project
```javascript
import MonsterFetch from 'monster-fetch'
```

Send a ```GET``` request
```javascript
import MonsterFetch from 'monster-fetch'

// Send a request to get the user with the specified id
MonsterFetch("/user", { id: 123 })
    .then(response => {
        // request success, return Response Object
        console.log(response)
    })
    .catch(error => {
        // request error, return TypeError
        console.log(error)
    })
    .finally(_ => {
        // do something
    })

// Use async/await to get the response
const getUser = async (id) => {
    try {
        const response = await MonsterFetch(`/user?id=${id}`)
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
```
> **Note** The default request method of MonsterFetch is GET. When sending a GET request, you do not need to specify the request method.
> async/await syntactic sugar requires browser support to work

Send a ```POST``` request
```javascript
MonsterFetch.post('/user', { username: "Monster Cone" })
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    })
```

## Monster Fetch API
#### Similar to native Fetch API

##### MonsterFetch(url, data, options)
```javascript
// Send a Post request
MonsterFetch('/user', { id: 123 }, {
    method: "POST"
})
```

#### Creating an instance

MonsterFetch.create([config])

```javascript
const fetchApi = MonsterFetch.create({
    baseUrl: "https://",
    method: "GET",
    mode: "cors",
    timeout: 10000
})
```

##### Support request method

###### MonsterFetch.get(url[, data][, options])
###### MonsterFetch.post(url[, data][, options])
###### MonsterFetch.put(url[, data][, options])
###### MonsterFetch.patch(url[, data][, options])
###### MonsterFetch.delete(url[, data][, options])

## Request Config

##### MonsterFetch(url[, data][, options])

The request address is required, the data is available, the request configuration is available, usually configured when creating an instance, so at the end of the parameters, we only need to pay attention to the URL and DATA

Options parameters are as follows
```javascript
{
    baseUrl: "", // Base Url, Will stitch in front of the URL.
    method: "GET", // Request method
    headers: {}, // Request headers
    body: {}, // Request params
    mode: "cors", // Request mode
    credentials: "omit", // Whether the request carries cookies, the default is not carried 
    cache: "default", // Request cache mode
    redirect: "follow", // Request redirect mode
    timeout: 10000 // Timeout duration, in milliseconds
}
```
> **Note** Except for Baseurl and Timeout parameters, other parameters are parameters of FETCH API. You can learn more from [Browser Support](https://developer.mozilla.org/en-US/docs/Web/API/fetch) to learn more

## Response Schema

Return A Promise that resolves to a Response object.

Learn more from [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)

## Config Default

```javascript
MonsterFetch.defaultConfig.baseUrl = 'https://api.example.com/v1'
MonsterFetch.defaultConfig.headers = {
    "Content-Type": "application/json"
}

const instance = MonsterFetch.create()
instance.defaultConfig.timeout = 60000
```

## Interceptors

Add a interceptor

```javascript
const instance = MonsterFetch.create()

instance.interceptors.request.use(config => { // config include url, body, options
    // Process before sending requests
    config.options = {
        headers: {
            Authorization: `Bearer xxxxxxxxx`
        },
    }
    return config
})

instance.interceptors.response.use(async response => { // config include url, body, options
    if (response.ok === true) {
        const data = await response.json()
        return data
    } else {
        return Promise.reject(response)
    }
})
```

Clear interceptor

```javascript
const instance = MonsterFetch.create();
instance.interceptors.request.use(() => {/*...*/});
instance.interceptors.request.clear(); // Removes interceptors from requests
```

You can also use multiple interceptors, which will be executed in the order of the use

```javascript
const instance = MonsterFetch.create();
instance.interceptors.request.use(() => {/*...*/});
instance.interceptors.request.use(() => {/*...*/});
```

## Cancel Request

Fetch API supports the Signal option, and Monsterfetch is to cancel the request through this feature

```javascript
const instance = MonsterFetch.create();
instance("/user", { id: 123 })
    .then(response => {
        console.log(response)
    })

instance.cancel()
```

> **Note** The Cancel method cancels all ongoing requests sent through the instance

## License

[MIT](LICENSE)