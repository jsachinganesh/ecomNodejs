const searchInputProduct = document.querySelector('.searchInputProduct');
const productSearchResults = document.querySelector('.productSearchResults');
const logoutBtn = document.querySelector('#logoutBtn');

if(searchInputProduct){
    let products = [];
    searchInputProduct.addEventListener('input',(e)=>{
        if(e.target.value){
            fetch(`/api/v1/products/search/${e.target.value}`).then((res)=>(res.json()))
            .then((data)=>{
                products=[];
                products.push(...data.data);
                if(products[0]?.length!=0){
                    productSearchResults.classList.remove('d-none')
                    productSearchResults.innerHTML= null;
                    products.forEach((el)=>{
                        const li = document.createElement('li');
                        const a = document.createElement('a');
                        li.id = `productSearchResultsli`;
                        li.classList.add('list-group-item');
                        a.classList.add('text-decoration-none');
                        a.href = `/${el.slug}`;
                        a.innerText = el.name
                        li.appendChild(a);
                        productSearchResults.appendChild(li);
                    })
                }else{
                    productSearchResults.classList.add('d-none')
                }
            })
        }
        
    });
}


const selectPhone = document.querySelector('.selectPhone');
if(selectPhone){
    selectPhone.addEventListener('click',(e)=>{
        // const url = new URL(window.location);
        // window.history.pushState({}, '', `${url}hp-14-laptop-(ryzen-5-3500u8gb1tb-hdd-+-256gb-ssdwin-10microsoft-office-2019radeon-vega-8-graphics)-dk0093au`);
        window.location.href = "/phones"

    })
}

const selectLaptop = document.querySelector('.selectLaptop');
if(selectLaptop){
    selectLaptop.addEventListener('click',(e)=>{
        // const url = new URL(window.location);
        // window.history.pushState({}, '', `${url}hp-14-laptop-(ryzen-5-3500u8gb1tb-hdd-+-256gb-ssdwin-10microsoft-office-2019radeon-vega-8-graphics)-dk0093au`);
        window.location.href = "/laptops"

    })
}

if(logoutBtn){
    logoutBtn.addEventListener('click',async (e)=>{
        try {
            const logout = await axios.post('/api/v1/users/logout');
            window.location.href = '/'
        } catch (error) {
            console.log(error);
        }        
    })
}