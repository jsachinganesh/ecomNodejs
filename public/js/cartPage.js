const hideLoading = document.getElementById('hide-loading');
const cartContainer = document.getElementById('cartContainer');

const data = localStorage.getItem('productCart');

async function fetchProductData(products){
    const gotData = [];
    for(const id of products){
        const url = `api/v1/products/${id}`
        const item = await axios.get(url);
        gotData.push(item.data.data);
    }

    return gotData;
}

function removeItem(e){
    const dataRefresh = localStorage.getItem('productCart');
    const itemId = e.target.previousSibling.firstChild.innerText;
    const dataProjetcs = dataRefresh.split(',');
    const filterData = dataProjetcs.filter(id => id != itemId);
    // localStorage.setItem('productCart',filterData);
    if(filterData.length>=1){
        // displayData(filterData)
        localStorage.setItem('productCart',filterData);
    }else{
        localStorage.removeItem('productCart')
    }

    displayData(filterData)
    
}

async function displayData(products){
    cartContainer.innerHTML = null;
    const data = await fetchProductData(products);

    hideLoading.classList.add('d-none')


    const divContainer = document.createElement('div');
    const divContainerClasses = [ 'row', 'w-100', 'justify-content-center'];
    divContainer.classList.add(...divContainerClasses);

    const colOne = document.createElement('div');
    const colOneClasses = [ 'col-12', 'col-lg-8'];
    colOne.classList.add(...colOneClasses);
    colOne.id = 'cartContainerProductBox';
    divContainer.appendChild(colOne);

    const colTwo = document.createElement('div');
    const colTwoClasses = [ 'col-12', 'col-lg-4'];
    colTwo.classList.add(...colTwoClasses);
    colTwo.id = 'cartAmount';
    colTwo.style.minHeight = `200px`;
    divContainer.appendChild(colTwo);
    let priceAmountTotal = 0;
    

    data.forEach((el,i)=>{
        const colOneInner = document.createElement('div');
        const colOneInnerClasses = ['d-flex','border','flex-column','flex-lg-row','flex-md-row','mb-2'];
        colOneInner.classList.add(...colOneInnerClasses);
        colOne.appendChild(colOneInner);

        const img = document.createElement('img');
        img.src=`./images/products/${el.image}.jpg`;
        const imgClasses = ['img-fluid','rounded'];
        img.classList.add(...imgClasses);
        img.style.height = `100px`;
        img.style.width = `100px`;
        img.alt = el.name;
        colOneInner.appendChild(img)

        const dFlex = document.createElement('div');
        const dFlexClasses = ['d-flex','ms-4','flex-fill','flex-column','justify-content-evenly']
        dFlex.classList.add(...dFlexClasses);
        colOneInner.appendChild(dFlex);

        const idDiv = document.createElement('div');
        idDiv.classList.add('d-none');
        idDiv.innerText = el._id;
        dFlex.appendChild(idDiv);

        const h3 = document.createElement('div');
        h3.classList.add('fw-bolder');
        h3.innerText = el.brand;
        dFlex.appendChild(h3);

        const priceDiv = document.createElement('div');
        priceDiv.innerText = `Price: ${el.price}`;
        dFlex.appendChild(priceDiv);

        const button = document.createElement('button');
        const buttonClasses = ['align-self-end','btn','bg-danger','text-white','m-4'];
        button.classList.add(...buttonClasses);
        button.innerText = 'Remove';
        button.addEventListener('click',removeItem);
        colOneInner.appendChild(button);

        

        priceAmountTotal = priceAmountTotal + el.price
        
    });

    const colTwoInnerDiv = document.createElement('div');
    const colTwoInnerDivClasses = ['d-flex','align-items-baseline','m-2'];
    colTwoInnerDiv.classList.add(...colTwoInnerDivClasses);

    const h1TwoCol = document.createElement('h1');
    h1TwoCol.innerText = `Total Products`;
    colTwoInnerDiv.appendChild(h1TwoCol);

    const smallTotalItem = document.createElement('small');
    const smallTotalItemClasses = ['fs-1','ms-3'];
    smallTotalItem.classList.add(...smallTotalItemClasses);
    smallTotalItem.innerText =  data.length;


    colTwoInnerDiv.appendChild(smallTotalItem)


    const colTwoInnerDivTwo = document.createElement('div');
    const colTwoInnerDivTwoClasses = ['d-flex','align-items-baseline','m-2'];
    colTwoInnerDivTwo.classList.add(...colTwoInnerDivTwoClasses);

    const h1TwoColTwo = document.createElement('h4');
    h1TwoColTwo.innerText = `Total Amount`;
    colTwoInnerDivTwo.appendChild(h1TwoColTwo);

    const smallTotalPrice = document.createElement('small');
    const smallTotalPriceClasses = ['fs-4','ms-3'];
    smallTotalPrice.classList.add(...smallTotalPriceClasses);
    smallTotalPrice.innerText = priceAmountTotal;
    colTwoInnerDivTwo.appendChild(smallTotalPrice)

    

    colTwo.appendChild(colTwoInnerDiv);
    colTwo.appendChild(colTwoInnerDivTwo);

 
    const cartButtonTwo = document.createElement('button');
    const cartButtonTwoClasses = ['btn','bg-primary','text-white','m-2'];
    cartButtonTwo.classList.add(...cartButtonTwoClasses);
    cartButtonTwo.innerText = 'Buy Now';
    colTwo.appendChild(cartButtonTwo);

    const h1Cart = document.createElement('div');
    const h1CartClasses = ['display-4','text-uppercase','mb-4','fw-bolder']
    h1Cart.classList.add(...h1CartClasses);
    h1Cart.innerText = 'cart'
    cartContainer.appendChild(h1Cart);
    cartContainer.appendChild(divContainer);
}

if(data===null || data === ''){
    hideLoading.classList.add('d-none')
    const div = document.createElement('div');
    div.innerText = "Nothing In Cart"
    cartContainer.appendChild(div);
}else{
    const products = data.split(',');
    displayData(products);
    
}

