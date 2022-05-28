let result = JSON.parse(localStorage.getItem('res')) || []

function react() {
    axios.get(`http://localhost:3001/users`)
        .then(res => {
            result = res.data
            localStorage.setItem('res', JSON.stringify(result))
            reload(result)
        })
        .catch(err => console.log('err'))
}
react()

let res = JSON.parse(localStorage.getItem('res'))
if(res) {
    reload(res)
}

searchFirst()
searchSecond()

function reload(arr) {
    let cont = document.querySelector('.boxes')
    cont.innerHTML = ''
    for (let item of arr) {
        let box = document.createElement('div')
        let img_box = document.createElement('div')
        let center = document.createElement('div')
        let h4 = document.createElement('h4')
        let h5 = document.createElement('h5')
        let p = document.createElement('p')
        let del_change_box = document.createElement('div')
        let span = document.createElement('span')
        let span2 = document.createElement('span')
        let img2 = document.createElement('img')

        box.classList.add('box')
        del_change_box.classList.add('del_change_box')
        img_box.classList.add('img_box')
        center.classList.add('center')
        span.innerHTML = 'Удалить'
        span2.innerHTML = 'Изменить'
        h5.innerHTML = item.established
        h4.innerHTML = item.name
        box.id = item.id
        p.innerHTML = 'Sri Lanka'
        img2.src = './more_horiz_FILL0_wght400_GRAD0_opsz48 (1).png'

        cont.append(box)
        box.append(img_box, center, img2)
        center.append(h4, h5, p)
        del_change_box.append(span, span2)
        center.append(del_change_box)

        img_box.onclick = (e) => {
            let b = document.querySelector('.name')
            let b2 = document.querySelector('.count')
            let b4 = document.querySelector('.from_to')
            let b5= document.querySelector('.create_data')
            let b6 = document.querySelector('.website')
            let b7 = document.querySelector('.slogan')

            let mpanel_3 = document.querySelector('.modal_panel_3')
            let back_3 = document.querySelector('.back_3') 
            mpanel_3.style.top = '13%'
            back_3.style.display = 'block'
            
            back_3.onclick = () => {
                mpanel_3.style.top = '-131%'
                back_3.style.display = 'none'
            }

            let id = e.target.parentNode.id
            let idx = result.findIndex(elem => elem.id === +id)

            console.log(result[idx]);
            b.innerHTML = result[idx].name 
            b2.innerHTML = result[idx].country 
            b4.innerHTML = `SriLanka - ${result[idx].country}`
            b5.innerHTML = result[idx].established 
            b6.innerHTML = result[idx].website 
            b7.innerHTML = result[idx].slogan 
        }

        span.onclick = (event) => {
            let id = event.target.parentNode.parentNode.parentNode.id

            result = result.filter(elem => elem.id !== +id)
            localStorage.res = JSON.stringify(result)
            reload(result)
        }
        let con = document.querySelector('.const')
        let select = document.querySelector('select')
        let inp =  document.querySelector('.name_count')
        
        select.onchange = () => {
            let arr2 = result.filter(elem => elem.established === select.value)
            reload(arr2)
        }
        forms(span2)
        con.onclick = () => {
            con.src = './Vector (3).png'
            select.style.display = 'block'
            inp.style.display = 'block'
        }
        img2.onclick = () => {
            del_change_box.style.display = 'block'
            del_change_box.style.display = 'flex'
            setTimeout(() => {
                del_change_box.style.opacity = '1'
            }, 400);
            setTimeout(() => {
                del_change_box.style.opacity = '0'
                del_change_box.style.display = 'block'
                del_change_box.style.display = 'flex'
            }, 5000);
        }
    }
}

function searchFirst() {
    let input = document.querySelector('.air_name')
    input.onkeyup = () => {
        let filtered = result.filter(elem => elem.name.toLowerCase().includes(input.value.toLowerCase()))
        reload(filtered)  
    }
}

function searchSecond() {
    let inp = document.querySelector('.name_count')
    inp.onkeyup = () => {
        let filtered = result.filter(elem => elem.country.toLowerCase().includes(inp.value.toLowerCase()))
        reload(filtered)        
    }
}


function forms(span2) {
    let form = document.forms.rename
        let form_2 = document.forms.add
        let mpanel =  document.querySelector('.modal_panel')
        let mpanel_2 =  document.querySelector('.modal_panel_2')
        let back = document.querySelector('.back')
        let back_2 = document.querySelector('.back_2')
        let btn_add = document.querySelector('.add')

        btn_add.onclick = () => {
            mpanel_2.style.top = '13%'
            back_2.style.display = 'block'
            form_2.onsubmit = (event) => { 
                event.preventDefault()
                
                let n = {
                    id: Math.random(),
                }
    
                let fm =  new FormData(form_2)
                
                fm.forEach((value, key) => {
                    n[key] = value
                });
                
                console.log(n);
                setPost(n)
                mpanel_2.style.top = '-131%'
                back_2.style.display = 'none'
            }
        }
        back_2.onclick = () => {
            mpanel_2.style.top = '-133%'
            back_2.style.display = 'none'
        }
        span2.onclick = (e) => {
            mpanel.style.top = '13%'
            back.style.display = 'block'
            back.onclick = () => {
                mpanel.style.top = '-133%'
                back.style.display = 'none'
            }
            form.onsubmit = (event) => { 
                event.preventDefault()
                
                let n1 = {
                    id: Math.random(),
                }
    
                let fm =  new FormData(form)
                
                fm.forEach((value, key) => {
                    n1[key] = value
                });
                
                mpanel.style.top = '131%'
                back.style.display = 'none'

                axios.get('http://localhost:3001/users')
                    .then(res => {
                        let id = e.target.parentNode.parentNode.parentNode.id
                        let idx = result.findIndex(elem => elem.id === +id)
                        
                        res.data.splice(idx, 1, n1)
                        result = res.data
                        reload(result)
                    })
                    .catch(err => console.log(err))
            }
        }

}

function setPost(post) {
    axios.post('http://localhost:3001/users', post)
        .then(res => console.log(res))
        .catch(err => console.log(err))

    react()
}
