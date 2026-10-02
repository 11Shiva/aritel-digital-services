const s=document.getElementById('service'),a=document.getElementById('amount'),m=document.getElementById('msg');
function upd(){a.textContent='₹'+Number(s.options[s.selectedIndex].dataset.amount).toLocaleString('en-IN')}s.onchange=upd;
document.querySelectorAll('[data-service]').forEach(x=>x.onclick=()=>{s.value=x.dataset.service;upd()});
document.getElementById('payForm').onsubmit=async e=>{e.preventDefault();m.textContent='Creating secure payment session...';let o=s.options[s.selectedIndex];try{
let r=await fetch('/api/create-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:name.value,email:email.value,phone:phone.value,service:s.value,amount:Number(o.dataset.amount)})});
let d=await r.json();if(!r.ok)throw Error(d.error||'Unable to create order');let cf=Cashfree({mode:d.mode});await cf.checkout({paymentSessionId:d.payment_session_id,redirectTarget:'_self'});
}catch(err){m.textContent=err.message}};