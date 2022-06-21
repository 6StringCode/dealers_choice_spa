console.log('Mozel Tov, webpack works!');
const axios = require('axios');

const collectorsList = document.querySelector('#collectors-list');
//const guitarsList = document.querySelector('#guitars-list');
const collectionsList = document.querySelector('#collections-list');

window.addEventListener('hashchange', async()=> {
    renderCollectors();
    await fetchGuitars();
    await fetchCollections();
    //renderGuitars();

});

const state = {
    collections: [],
    collectors: [],
    guitars: [],
};

const fetchCollectors = async()=> {
    const response = await axios.get('/api/collectors');
    state.collectors = response.data;
};

const fetchGuitars = async()=> {
    const response = await axios.get('/api/guitars');
    state.guitars = response.data;
};

const fetchCollections = async()=> {
    const id = window.location.hash.slice(1);
    console.log(id);
    if(id){
        const response = await axios.get(`/api/collectors/${id}/collections`);
        state.collections = response.data;
    }
    // else {
    //     state.collections = [];
    // }; //don't need this because we created the empty [] in state
    renderCollections();
};

const renderCollectors = ()=> {
    const id = window.location.hash.slice(1)*1;
    const html = state.collectors.map( collector => {
        return `
            <li class='${ collector.id === id ? 'selected' : ''}'> 
            <a href='#${collector.id}'> 
            ${collector.name}
            </li>
        `
    }).join('');
    collectorsList.innerHTML = html;
};


// const renderGuitars = ()=> {
//     const html = state.collections.map( collection => {
//         const guitar = state.guitars.find(guitar => guitar.id === collection.guitarId);
//             return `
//                 <li> ${guitar.model} </li>
//             `
//         }).join('');
//         collectionsList.innerHTML = html;
// };

const renderCollections = ()=> {
    const html = state.collections.map( collection => {
    const guitar = state.guitars.find(guitar => guitar.id === collection.guitarId);
        return `
            <li> ${guitar.model} </li>
        `
    }).join('');
    collectionsList.innerHTML = html;
    console.log(html);
};


const startMeUp = async()=> {
    await fetchCollectors();
    await fetchGuitars();

    // if (!!window.location.hash){
        await fetchCollections();
        renderCollectors();
   // }    

    renderCollectors();
    //renderGuitars();
};

startMeUp();