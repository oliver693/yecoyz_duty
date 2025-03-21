async function send(event, data) {
    return fetch(`https://yecoyz_duty/Eventhandler`, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            event: event,
            data: data || {},
        }),
    });
}

async function callback(event, data) {
    return fetch(`https://yecoyz_duty/Eventhandler`, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            event: event,
            data: data || {},
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}

export { send, callback };