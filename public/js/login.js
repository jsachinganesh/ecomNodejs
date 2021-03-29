const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('login-form')
const formBtn = document.getElementById('form-btn');


form.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const emailValue = email.value;
    const passwordValue = password.value;
    console.log(emailValue,passwordValue);
    try {
        const login = await axios.post('/api/v1/users/login',{
            email: emailValue,
            password: passwordValue
        });

        setTimeout(function(){
            window.location.href = '/';
        }, 2000);
        console.log("sucess");
    } catch (error) {
        console.log(error);
    }
});

