
let responseData;

const btns = document.querySelectorAll('button');

async function fetchData(){
    try{
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const resdata = await response.json();
        return resdata;
    }
    catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return [];
    }
}


function addData(data){
    const table = document.querySelector('table');
    table.innerHTML = "";
    data.forEach((obj )=> {
        //console.log(obj);
        let row = table.insertRow(-1);
        
        row.innerHTML = `
        <td><img src="${obj.image}" alt="" width="30px" height="30px"><span> ${obj.name}</span></td>
        <td>${obj.symbol.toUpperCase()}</td>
        <td>$${obj.current_price}</td>
        <td>$${obj.total_volume}</td>
        <td style="color:${obj.price_change_percentage_24h>0 ?"greenyellow":"red"};">${obj.price_change_percentage_24h} %</td>
        <td> $${obj.market_cap}</td>
        `
    });
}

function searchInfo(){
    const input = document.querySelector('input');
    const filterData = responseData.filter(obj =>{
        return obj.name.toLowerCase()==input.value.toLowerCase() || obj.symbol.toLowerCase()==input.value.toLowerCase();
    });
    addData(filterData);
}

function sortData(ele){
    const sortedData = [...responseData].sort((a,b)=>{
        if(ele === 'marketCap'){
            return b.market_cap - a.market_cap;
        }
        else if(ele === 'priceChange'){
            return b.price_change_percentage_24h - a.price_change_percentage_24h;
        }
    });
    addData(sortedData);
}

fetchData().then(data =>{
    responseData = data;
    addData(data);
}).catch(error => {
    console.error('Error processing data:', error);
});

btns[0].addEventListener('click',(e)=>{
    searchInfo();
})

btns[1].addEventListener('click',(e)=>{
    sortData('marketCap');
})

btns[2].addEventListener('click',(e)=>{
    sortData('priceChange');
})
// const input = document.querySelector('input');

// input.addEventListener("input",()=>{
//     const filterData = responseData.filter(obj =>{
//        input.value[0] === obj.name[0];
//     });
//     addData(filterData);
// })