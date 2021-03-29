const alertProductAddCard = document.querySelector('.alertProductAddCard');
const addToCartAll = document.querySelectorAll('.addToCard').forEach((el,i)=>{
    el.addEventListener('click',(e)=>{
        const productId = e.target.parentElement.previousSibling.innerText;
        // localStorage.setItem('productCart', 'Tom');

        const productCart = localStorage.getItem("productCart");
        if(productCart===null){
            localStorage.setItem('productCart',[productId]);
         
        }else{
            if(!productCart.includes(productId)){
                
                localStorage.setItem("productCart",[productCart,productId]);
            }
        }
        alertProductAddCard.classList.remove('d-none');
        setTimeout(()=>{
            alertProductAddCard.classList.add('d-none')
        },2000)

    })
});

