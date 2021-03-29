const inputFile = document.getElementById('inputGroupFile02');
const addItemBtn = document.getElementById('addItemBtn');
const addItemForm = document.getElementById('addItemForm');
const addItemType = document.getElementById('addItemType');
const addItemName = document.getElementById('addItemName');
const addItemBrand = document.getElementById('addItemBrand');
const addItemRating = document.getElementById('addItemRating');
const addItemManufacturer = document.getElementById('addItemManufacturer');
const addItemModelName = document.getElementById('addItemModelName');
const addItemRamSize = document.getElementById('addItemRamSize');
const addItemMemoryStorageCapacity = document.getElementById('addItemMemoryStorageCapacity');
const addItemResolution = document.getElementById('addItemResolution');
const addItemGraphicsCard = document.getElementById('addItemGraphicsCard');
const addItemPrice = document.getElementById('addItemPrice');



addItemForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const data = new FormData();
    if(inputFile.files.length != 0){
        console.log(inputFile.files[0]);
        data.append('image',inputFile.files[0]);
    }
   

    data.append('type','laptop');
    data.append('name','HP 14 Laptop (Ryzen 5 3500U/8GB/1TB HDD + 256GB SSD/Win 10/Microsoft Office 2019/Radeon Vega 8 Graphics), DK0093AU');
    data.append('brand','HP Store');
    data.append('price',484848);
    data.append('ratings',"5");
    data.append('manufacturer',"addItemManufacturer.val");
    data.append('modelName',"addItemModelName.value");
    data.append('ramSize',8);
    data.append('memoryStorageCapacity',"864654654 tb");
    data.append('resolution',"addItemResolution.value");
    data.append('graphicsCard',"addItemGraphicsCard.value");

    try {
        const addItem = await axios({
            method:"post",
            url:'/api/v1/products',
            data,
            headers:{ "Content-Type": "multipart/form-data" }
        })
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
 
})



























    // data.append('type',addItemType.value);
    // data.append('name',addItemName.value);
    // data.append('brand',addItemBrand.value);
    // data.append('price',addItemPrice.value);
    // data.append('ratings',addItemRating.value);
    // data.append('manufacturer',addItemManufacturer.value);
    // data.append('modelName',addItemModelName.value);
    // data.append('ramSize',addItemRamSize.value);
    // data.append('memoryStorageCapacity',addItemMemoryStorageCapacity.value);
    // data.append('resolution',addItemResolution.value);
    // data.append('graphicsCard',addItemGraphicsCard.value);