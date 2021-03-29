const reviewBox = document.getElementById('reviewBox');
const ratingReviewForm = document.getElementById('ratingReviewForm');
const reviewBoxReviewForm = document.getElementById('reviewBoxReviewForm');
const productIdReview = document.getElementById('productIdReview');
const productBuy = document.getElementById('productBuy');
const productAddToCart = document.getElementById('productAddToCart');

reviewBox.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const productId = productIdReview.innerText;
    const url = `/api/v1/products/${productId}/reviews`;

    try {
        const review = await axios.post(url,{
            rating:ratingReviewForm.value,
            comment:reviewBoxReviewForm.value
        })
        ratingReviewForm.value = '';
        reviewBoxReviewForm.value = null;
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
});

function addCart(productId){
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
}

productAddToCart.addEventListener('click',(e)=>{
    const productId = productIdReview.innerText;
    addCart(productId)
});

productBuy.addEventListener('click',(e)=>{
    const productId = productIdReview.innerText;
    addCart(productId);
    window.location.href = '/cart'

})