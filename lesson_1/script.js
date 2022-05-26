let result = JSON.parse(localStorage.getItem('result')) || []
axios.get(`https://api.instantwebtools.net/v1/airlines`)
    .then(res => {
        result = res.data.filter(item => item.id < 101 && item.id > 0)
        reload(result)
        localStorage.result = JSON.stringify(result)
    })
    .catch(err => console.log('err'))
reload(result)

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

        span.onclick = (event) => {
            let id = event.target.parentNode.parentNode.parentNode.id

            result = result.filter(elem => elem.id !== +id)
            localStorage.result = JSON.stringify(result)
            reload(result)
        }
        let con = document.querySelector('.const')
        let select = document.querySelector('select')
        let inp = document.querySelector('.name_count')

        let input = document.querySelector('.air_name')
        input.onkeyup = () => {
            let filtered = result.filter(elem => elem.name.toLowerCase().includes(input.value.toLowerCase()))
            reload(filtered)  
        }
        inp.onkeyup = () => {
            let filtered = result.filter(elem => elem.country.toLowerCase().includes(inp.value.toLowerCase()))
            reload(filtered)        
        }
        select.onchange = () => {
            let arr2 = result.filter(elem => elem.established === select.value)
            console.log(arr2);
            reload(arr2)
        }

        let form = document.forms.rename
        let mpanel =  document.querySelector('.modal_panel')
        let back = document.querySelector('.back')

        form.onsubmit = (e) => { 
            e.preventDefault()
            
            let n = {
                id: Math.random(),
            }
            
            let fm =  new FormData(form)
            
            fm.forEach((value, key) => {
                n[key] = value
            });
            
            console.log(n);
            
            mpanel.style.top = '131%'
            back.style.display = 'none'

            let id = span2.parentNode.parentNode.parentNode.id

            let idx = result.filter(elem => elem.id === +id)
            result.splice(idx, 1, n)
            reload(result)
            localStorage.result = JSON.stringify(result)
        }
        span2.onclick = () => {
            mpanel.style.top = '13%'
            back.style.display = 'block'

        }

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