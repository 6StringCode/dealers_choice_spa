console.log('Mozel Tov, webpack works!');
const axios = require('axios');

const collectorsList = document.querySelector('#collectors-list');
const guitarsList = document.querySelector('#guitars-list');
const collectionsList = document.querySelector('#collections-list');

window.addEventListener('hashchange', async()=> {
    renderCollectors();
    await fetchGuitars();
    await fetchCollections();
    renderGuitars();

});

const state = {};

const fetchCollectors = async()=> {
    const response = await axios.get('/api/collectors');
    state.collectors = response.data;
};

const fetchGuitars = async()=> {
    const response = await axios.get('/api/guitars');
    state.guitars = response.data;
};

const fetchCollections = async()=> {
    const id = window.location.hash;//slice broke it
    const response = await axios.get(`/api/collectors/${id}/collections`);
    state.collections = response.data;
    
};

const renderCollectors = ()=> {
    const id = window.location.hash.slice(1);
    const html = state.collectors.map( collector => {
        return `
            <li class='${ collector.id === id ? 'selected' : ''}'> 
            <a href='#${collector.id}'> 
            ${collector.name}
            </a>
            </li>
        `
    }).join('');
    collectorsList.innerHTML = html;
};

const renderGuitars = ()=> {
    const html = state.guitars.map( guitar => {
    //const collection = state.collectors.filter(collector => collector.guitarId === guitar.id);
        return `
            <li> ${guitar.model} </li>
        `
    }).join('');
    guitarsList.innerHTML = html;
};

// const renderCollections = ()=> {
//     const html = state.collections.map( collection => {
//     const guitar = state.guitars.find(guitar => guitar.id === collection.guitarId);
//     console.log(collection);
//         return `
//             <li> ${guitar.model} </li>
//         `
//     }).join('');
//     console.log(html);
//     collectionsList.innerHTML = html;
// };


const startMeUp = async()=> {
    await fetchCollectors();
    await fetchGuitars();
    await fetchCollections();
    renderCollectors();
    renderGuitars();
    //renderCollections();
    //console.log(state);
};

startMeUp();