import {vaccineUrl} from './api.js';

console.log(vaccineUrl);

// Make a call to news api and get news feed
window.addEventListener('load', ()  => {
    
   getVaccine();
});

async function getVaccine()
{
    //Make a call to new feed api
    const newsoutput = await fetch(vaccineUrl);
    //console.log(newsoutput);

    // Store it in a Json
    const jsonresponse = await newsoutput.json();
    //console.log(jsonresponse);

    // Loop thru json articles and extract title, descrip, url, urltoimage
    jsonresponse.centers.map(center => {

        const articleelementcontainner = document.createElement("div");
        const hstName = center.name;
        const availCap = center.sessions[0]['available_capacity'];
        const vaccine = center.vaccine_fees[0]["vaccine"];
        const vaccineFee = center.vaccine_fees[0]["fee"];
        const addr = center.address;
        console.log(vaccineFee);

    //     // Form HTML elements 
        

        const articlelement = `
                            <h1>${hstName}</h1>
                            <h1>${availCap}</h1>
                            <h1>${vaccine}</h1>
                            <h1>${vaccineFee}</h1>
                            <h1>${addr}</h1>
                        `;

                    

        articleelementcontainner.innerHTML = articlelement;

        // Identify div containner
        const newcontainner = document.querySelector("#main");
        
        // Display the same on news.html
        newcontainner.appendChild(articleelementcontainner);
        
    });

}