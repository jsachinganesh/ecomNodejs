const form = document.getElementById('form-updateme');
const aboutmename = document.getElementById('aboutmename');
const aboutmeemail = document.getElementById('aboutmeemail');
const currentpassword = document.getElementById('currentpassword');
const aboutmepassword = document.getElementById('aboutmepassword');
const aboutmepasswordconform = document.getElementById('aboutmepasswordconform');
// const aboutmefavthing = document.getElementById('aboutmefavthing');
// const aboutmefavmovie = document.getElementById('aboutmefavmovie');
const btnEdit = document.querySelector('.btnEdit');
const editPassword = document.querySelector('.editPassword');
const updatePassword = document.querySelector('#updatePassword');

form.addEventListener('click',async(e)=>{

  
    try {
        console.log('formUpdateMe');
        const userUpdate = await axios.patch('/api/v1/users/updateme',{
            name:aboutmename.value,
            email:aboutmeemail.value
        });
        console.log('success');
        window.location.reload();
    } catch (error) {
        console.log(error);
    }

    
})

function removeAttReadOnly(atts){
    return atts.forEach((el,i)=>{
        el.removeAttribute('realonly')
    });
}

btnEdit.addEventListener('click',(e)=>{
    aboutmename.removeAttribute('readonly');
    aboutmeemail.removeAttribute('readonly');
})

editPassword.addEventListener('click',(e)=>{
    currentpassword.removeAttribute('readonly');
    aboutmepassword.removeAttribute('readonly');
    aboutmepasswordconform.removeAttribute('readonly');
})

updatePassword.addEventListener('click',async (e)=>{
    try {
        const update = await axios.patch('/api/v1/users/updatepassword',{
            password:currentpassword.value,
            updatePassword:aboutmepassword.value,
            updatePasswordConform:aboutmepasswordconform.value
        });
        console.log('success');
        window.location.reload();
    } catch (error) {
        console.log(error);
    }


});