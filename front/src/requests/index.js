export function get(url) {
    return fetch(url)
        .then(data => data.json())
}

export function post(url, item) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
}

export function put(url, done) {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ done: done }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
}

export function del(url) {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(data => data.json())
}
