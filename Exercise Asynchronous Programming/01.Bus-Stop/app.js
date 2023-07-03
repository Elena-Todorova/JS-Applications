//const { log } = require("console");

async function getInfo() {
    const inputField = document.getElementById('stopId').value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${inputField}`;
    const busStopEl = document.getElementById('stopName');
    const busesAndTimeEl = document.getElementById('buses');


    
    try{
        busStopEl.textContent = 'Loading...';
        busesAndTimeEl.replaceChildren();
        const res = await fetch(url);
        
        if(res.status !== 200){
            throw new Error('Error');
        }
        const data = await res.json();

        busStopEl.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            const liEl = document.createElement('li');
            liEl.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            busesAndTimeEl.appendChild(liEl)
        })
    }catch(error){
        busStopEl.textContent = 'Error';
     }
}
