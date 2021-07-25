// POST
function createNewProfile(profile) {
    const formData = new FormData();
    formData.append('first_name', profile.firstName);
    formData.append('last_name', profile.lastName);
    formData.append('email', profile.email);

    return fetch('http://example.com/api/v1/registration', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
}

// PUT
const someData = {
    title: document.querySelector(TitleInput).value,
    body: document.querySelector(BodyInput).value
}
const putMethod = {
    method: 'PUT', // Method itself
    headers: {
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
    },
    body: JSON.stringify(someData) // We send data in JSON format
}

// make the HTTP put request using fetch api
fetch('https://api.example.com', putMethod)
.then(response => response.json())
.then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
.catch(err => console.log(err)) // Do something with the error

// DELETE
const deleteMethod = {
    method: 'DELETE', // Method itself
    headers: {
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
    },
    // No need to have body, because we don't send nothing to the server.
}
// Make the HTTP Delete call using fetch api
fetch(url, deleteMethod) 
.then(response => response.json())
.then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
.catch(err => console.log(err)) // Do something with the error