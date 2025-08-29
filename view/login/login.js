const loginform=document.getElementById('login_form');
loginform.addEventListener('submit',async(e)=>{
    e.preventDefault();
    alert('working')
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
 
        const res=await fetch('/user/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        });
        const result=await res.json();
        if(res.ok)
        {localStorage.setItem('token',result.token);
            loginform.reset();
            alert('login success');
            window.location.href='/chat/chat.html';
        }
    else{
    alert(result.message||'login failed');

    }
})