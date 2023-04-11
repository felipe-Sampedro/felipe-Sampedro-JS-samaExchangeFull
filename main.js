console.log('exchange');
const moneda_uno = document.getElementById('moneda_uno')
const moneda_dos = document.getElementById('moneda_dos')
const qtyOne = document.getElementById('cantidad_uno')
const qtyTwo = document.getElementById('cantidad_dos')
const details = document.getElementById('details')
const reverse = document.getElementById('btn')
let prefMonedaUno,prefMonedaDos, taza1, taza2,coin,rates2,prim=null,rept=0

qtyOne.addEventListener('input',()=>{
    qtyTwo.value=(qtyOne.value*taza2).toFixed(2)
})

moneda_uno.addEventListener('change',()=>{    
    const coin = 'https://api.exchangerate-api.com/v4/latest/'+moneda_uno.value
    rept=1
    result(coin,valueSelected,tazas)
})

reverse.onclick = () =>{
    const rev =moneda_dos.value
    console.log(rev);
    const coin = 'https://api.exchangerate-api.com/v4/latest/'+moneda_dos.value
    moneda_dos.value=moneda_uno.value
    rept=1;
    result(coin,valueSelected,tazas)
    moneda_uno.value=rev
    reverse.classList.toggle('flipped')
}

    

moneda_dos.addEventListener('change',()=>{ 
    taza2 = rates2[moneda_dos.value]
    const numero = qtyOne.value*taza2.toFixed(0)
    qtyTwo.value=numero.toFixed(2)
    prefMonedaDos=moneda_dos.value
    details.innerText=`1 ${prefMonedaUno} = ${taza2} ${prefMonedaDos}`
})

const URL = 'https://api.exchangerate-api.com/v4/latest/USD'

function result(coin,cb1,cb2){
    const results = fetch(coin==null?URL:coin)
    .then(res => res.json())
    .then(data => {
        const {rates} = data
        console.log(rates);
        for (const key in rates) {
            if (rept==0) {
                const moneda_unoOpt = document.createElement('option')
                moneda_unoOpt.value =key
                moneda_unoOpt.text = key
                moneda_uno.appendChild(moneda_unoOpt)

                const moneda_dosOpt = document.createElement('option')
                moneda_dosOpt.value =key
                moneda_dosOpt.text = key
                console.log(moneda_unoOpt.text);
                if (moneda_dosOpt.text == 'COP' && prim == null) {
                    moneda_dosOpt.selected=true
                    prim=prim+1
                } 
                moneda_dos.appendChild(moneda_dosOpt)
            }
        }
        cb1()
        cb2(rates[prefMonedaUno],rates[prefMonedaDos],rates)
        return rates
    })
}

result(coin,valueSelected,tazas)

    function valueSelected() {
        const selected1 = document.getElementById('moneda_uno').value
        const selected2 = document.getElementById('moneda_dos').value
        prefMonedaUno = selected1
        prefMonedaDos = selected2
        return prefMonedaUno, prefMonedaDos
    }

    function tazas(tz1,tz2,tazas){
        taza1= tz1
        taza2= tz2
        rates2=tazas
        const numero= qtyOne.value*taza2
        qtyTwo.value=numero.toFixed(2)
        details.innerText=`1 ${prefMonedaUno} = ${taza2} ${prefMonedaDos}`
    }


