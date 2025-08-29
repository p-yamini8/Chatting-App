

const signupform=document.getElementById('signup-form');
signupform.addEventListener('submit',async(e)=>{
    alert('work')
    
    e.preventDefault();
    const name=document.getElementById('name').value;
    const email=document.getElementById('email').value;
    const phone=document.getElementById('phone').value;
    const password=document.getElementById('password').value;

    const response=await fetch('/user/signup',{
        method:'POST',
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({name,email,phone,password})
    })
    const result=await response.json();
    if(response.ok)
    {signupform.reset();
       alert('login success')
    }
     else {
                alert('Signup failed: ' + result.message);
            }
     }
     
)