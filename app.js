const affichage = document.querySelector('.affichage')
const btns = document.querySelectorAll('button')
const inputs = document.querySelectorAll('input')
const infoTxt = document.querySelector('.info-txt')
let dejaFait = false

const today = new Date()
// console.log(today)

const nextWeek = new Date(today.getTime()+ 7*24*60*60*1000)
//ce calcul va nous permettre d'ajouter une semaine

// console.log((nextWeek))

let day=('0'+nextWeek).slice(9,11)
//ceci va permettre de transformer en chaîne de caractères de l'index 9 jusqu'à 11 non inclus

// console.log(day)
let month = ('0'+(today.getMonth()+1)).slice(-2)
//+1 parce qu'ils comptent les mois à partir de 0 à 11
let year = today.getFullYear()
document.querySelector('input[type=date]').value=`${year}-${month}-${day}`
//date ne retourne pas une chaine de caractère donc il faut d'abord la transformer en chaines de caractères

btns.forEach(btn=>{
    btn.addEventListener('click', btnAction)
})

function btnAction(e){
    let nvObj = {}

    inputs.forEach(input=>{
        let attrName = input.getAttribute('name')
        let attrValeur = attrName !== "cookieExpire" ? input.value : input.valueAsDate
        nvObj[attrName] = attrValeur
    })
    // console.log(nvObj)

    let description = e.target.getAttribute('data-cookie')

    if(description === "creer"){
        creerCookie(nvObj.cookieName, nvObj.cookieValue, nvObj.cookieExpire)
    }else if(description === "toutAfficher"){
        listeCookies()
    }

}

function creerCookie(name,value, exp){
    
    infoTxt.innerText = ""

    affichage.innerHTML = ""

    //sie le cookie a le un même nom
    let cookies = document.cookie.split(';')

    cookies.forEach(cookie =>{
        cookie = cookie.trim()
        // console.log(cookie)
        let formatCookie = cookie.split('=')
        console.log(formatCookie)

        if(formatCookie[0] === encodeURIComponent(name)){
            dejaFait = true
        }

    })

    if(dejaFait){
        infoTxt.innerText = "Un cookie possède déjà ce nom !"
        dejaFait = false
        return
    }

    // console.log(cookies)

    if(name.length === 0){
        infoTxt.innerText = `Impossible de définir un cookie sans nom`
        return
    }

    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp.toUTCString()}`
    let info = document.createElement('li')
    info.innerText = `Cookie ${name} crée !`
    affichage.appendChild(info)
    setTimeout(()=>{
        info.remove()
    },1500)

}

function listeCookies(){
    
    let cookies = document.cookie.split(';')
    console.log(cookies)
    if(cookies.join()===""){
        console.log(cookies.join())
        infoTxt.innerText = "Pas de cookies à afficher"
        return
    }

    cookies.forEach(cookie=>{
        cookie = cookie.trim()
        let formatCookie = cookie.split('=')

        // console.log(formatCookie)
        let item = document.createElement('li')


        infoTxt.innerText = 'Cliquez sur un cookie dans la liste pour le supprimer.'
        item.innerText = `Nom: ${decodeURIComponent(formatCookie[0])}, Valeur:${decodeURIComponent(formatCookie[1])}`
        //pour décoder ce qu'on avait encodé ie les espaces remplacés par des pourcentages...
        affichage.appendChild(item)

        //Suppression cookie
        item.addEventListener('click',()=>{
            document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`
            item.innerText = `Cookie ${formatCookie[0]} supprimé`
            setTimeout(()=>{
                item.remove()
            },1000)
        })
    })

}
