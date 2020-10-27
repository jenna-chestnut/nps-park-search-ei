let store = [];

const getParks = (apiKey, state, max) => {
    fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${max}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(responseJson => displayParks(responseJson))
        .catch(error => alert(error));
}

const displayParks = (responseJson) => {
    console.log(responseJson);
    $('.parkslist').html("");
    let results = "";
    responseJson.data.forEach(el => {
        let add = el.addresses;
        results += `<h2 class="fullname">${el.fullName}</h2>
        ${el.images.length === 0 ? "[No Image Available]" : `<img src="${el.images[0].url}" alt="parkpic">`}<p class="description">${el.description}</p>${add.length === 0 ? "[No Addresses Available]" : `<p class="addresses">Address: ${add[0].line1}, ${add[0].city} ${add[0].stateCode} ${add[0].postalCode}</p>`}<p class="url"><a href="${el.url}">Click here to learn more!</a></p>`
    })
    $('.parkslist').append(results);
    store = [];
    $('.states').html('');
}


const handleClick = () => {
    $('main').on('submit', event => {
        event.preventDefault();
        console.log('button works!');
        let max = $('#max').val();
        let state = $('#state').val();
        if (state !== "") { store.push(state) };
        state === "" && store.length === 0 ?
            alert('Please input state!') :
            console.log(store);
        let statesToAdd = store.join(",");
        console.log(statesToAdd);
        getParks(apiKey(), statesToAdd, max);
    })
}

const handleAddState = () => {
    $('main').on('click', '#addState', event => {
        let state = $('#state').val();
        let patt = /^[A-Z]{2}$/
        !patt.test(state) ?
            alert('Please input state!') :
            store.push(state);
        let statesToAdd = store.join(" ");
        $('.states').html(statesToAdd);
        $('#state').val("");
    })
}

const handleReset = () => {
    $('main').on('click', '#reset', event => {
        $('.states').html('');
        $('#state').val('');
        $('.parkslist').html('');
    })
}

const apiKey = () => {
    return // removed for privacy!!;
}

const main = () => {
    handleClick();
    handleAddState();
    handleReset();
    console.log('app is live!!');
}

$(main)
