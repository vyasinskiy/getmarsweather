const url = 'https://api.maas2.apollorion.com/';
const getWeather = async () => {
    const lastSol = await getLastSol();
    let lastDays = setLastDays(lastSol);
    for(day of lastDays){
        data = await getDayWeather(day);
        console.log('Sol #' + data.sol + ': ' + data.min_temp + '..' + data.max_temp + ' C');
    }
}

const getLastSol = async () => {
    const res = await fetch(url);
    if(!res.ok){
        throw new Error(`Could not fetch ${url}`)
    }
    const resData = await res.json();
    return resData.sol;
}

const setLastDays = n => {
    let lastDays = [];
    for(let i = 0; i < 5; i++){
        lastDays.push(n - i)
    }
    return lastDays;
}

const getDayWeather = async n => {
    const res = await fetch(url + n);
    if(!res.ok){
        throw new Error(`Could not fetch the sol ${n}`)
    }
    const data = await res.json();
    return data;
}

const btn = document.querySelector('#startBtn');
btn.addEventListener('click', getWeather);







