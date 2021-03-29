const clickMainPhoto = document.querySelectorAll('.clickMainPhoto');
const mainItems = ['/apple-macbook-air-(13-inch-1.1ghz-dual-core-10th-generation-intel-core-i3-processor-8gb-ram-256gb-storage)-gold','/redmi-9a-(nature-green-2gb-ram-32gb-storage)-or-2ghz-octa-core-helio-g25-processor','/hp-pavilion-gaming-15.6-inch-fhd-gaming-laptop-(ryzen-5-4600h8gb1tb-hdd-+-256gb-ssdwindows-10144hznvidia-gtx-1650-4gbshadow-black)-15-ec1052ax'];
clickMainPhoto.forEach((el,i)=>{
    el.addEventListener('click',(e)=>{
        window.location.href = mainItems[i]
    });
})