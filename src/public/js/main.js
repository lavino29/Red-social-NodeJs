const iconoADD = document.querySelector('#icono_ADD')
const file = document.querySelector('#file')
const publicacion = document.querySelectorAll('.publicacion')
const submenu = document.querySelector('.submenu')
const lista = document.querySelector('.lista')
const like = document.querySelectorAll('#like')

like.forEach(link=>{
    link.addEventListener('click',(e)=>{
        let dato = {
            id: e.target.parentElement.children[1].textContent
        }
        link.style = ' color: lightpink;'
       console.log(dato)
        fetch("http://localhost:3000/like",{
            method: 'POST',
            body: JSON.stringify(dato),
            headers:{
            "Content-type": "application/json"
            }

        }).then(res=> res.json())
        .then(res=> {
            link.nextSibling.nextSibling.textContent = 1 +  "like"
        })

    })
})


lista.addEventListener('click',()=>{
    submenu.classList.toggle('hidden')
})


let bandera = publicacion.length -1

for (let i = 0; i<publicacion.length; i++){
    
    publicacion[0].before(publicacion[bandera], publicacion[0])
    bandera--
} 


iconoADD.addEventListener('click',()=>{
    file.click()
}) 
