
const getParks = (apiKey, state, max) => {
    fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${max}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(responseJson => displayParks(responseJson))
    .catch(error => alert(error));
}

const displayParks = (responseJson) => {
    $('.parkslist').html("");
    let results = "";
    responseJson.data.forEach(el => {
    let add = el.addresses[0];
    results += `<h2 class="fullname">${el.fullName}</h2>
        <img src="${el.images[0].url}" alt="parkpic">
        <p class="description">${el.description}</p>
        <p class="addresses">Address:
        ${add.line1}, ${add.city} ${add.stateCode} ${add.postalCode}</p>
        <p class="url"><a href="${el.url}">Click here to learn more!</a></p>`
    })
    $('.parkslist').append(results);
}


const handleClick = () => {  
    $('main').on('submit', event => {
    event.preventDefault();
    console.log('button works!');
    let max = $('#max').val();
    let state = $('#state').val();
    console.log(max, state)
    getParks(apiKey(), state, max)
    })
}

const apiKey = () => {
return '// APIKEY removed for privacy!!;
}

const main = () => {
    handleClick();
    console.log('app is live!!');
}

$(main)
