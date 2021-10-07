const api = {
    key:"04d8ac19d6e55bf02970104f84a46769",
    url:"https://api.openweathermap.org/data/2.5/weather"
}

const input = document.querySelector('.search-box');
input.addEventListener("keypress", setQuery);

function setQuery(event){
    if(event.keyCode == 13){
        getData(input.value)
        .then(displayData)
        .catch(err=>{
            console.log('rejected:', err.message);
        });
        console.log("enter key pressed");
    }
}

async function getData (city) {
    const res = await fetch(`${api.url}?q=${city}&units=metric&APPID=${api.key}`);
    if(res.status !== 200){
      throw new Error("somthing wrong! data could not fetch....");
    }
    const data =  await res.json();
    return data;
  }


function displayData(data){
    console.log("data fetched.....", data);

    let city = document.querySelector(".location .city");
    city.innerText = `${data.name}, ${data.sys.country}`;

    let d = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(d);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${data.main.temp}<span>°c</span>`;

    document.querySelector('.current .weather')
    .innerText = data.weather[0].main;

    document.querySelector('.current .hi-low')
    .innerText = ` ${data.main.temp_min}°c / ${data.main.temp_max}°c`;

}
function dateBuilder(d){
    let months = ["January","February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hour = d.getHours();
    let min = d.getMinutes();
    
    return `Time:${hour}:${min}, ${day} ${date} ${month} ${year}`;
}