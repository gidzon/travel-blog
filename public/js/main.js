let btnCategory = document.querySelector('#btn-category')
let formCategory = document.forms.category;
const tbody = document.querySelector('#category_data');


function deleteElem(elem){
    let size = elem.childElementCount

    for (let i = 0; i < size; i++){
        elem.firstElementChild.remove()
    }
}


function insertValueInDom(data) {
   let elemOld = document.querySelector('#category_data')

    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr')
        let tdId = document.createElement('td')
        let tdName = document.createElement('td')
        let tdBtnDelete = document.createElement('td')
        let tdBtnUpdate = document.createElement('td')

        elemOld.append(tr)
        elemOld.lastElementChild.append(tdId)
        elemOld.lastElementChild.append(tdName)
        elemOld.lastElementChild.firstElementChild.innerText = data[i].id
        elemOld.lastElementChild.lastElementChild.innerText = data[i].name
        elemOld.lastElementChild.append(tdBtnDelete)
        let btnHtmlDelete = `<button  id='category-delete' data-id='${data[i].id}'>удалить</button>`

        elemOld.lastElementChild.lastElementChild.innerHTML = btnHtmlDelete

        elemOld.lastElementChild.append(tdBtnUpdate)
        let btnHtmlUpdate = `<button id="category-update" data-id="${data[i].id}">редактировать</button>`
        elemOld.lastElementChild.lastElementChild.innerHTML = btnHtmlUpdate
    }


}


async function sendPostForm(url, body) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type" : 'application/json'
        },
        body: JSON.stringify(body)
    });
    let result = await response.json()
    formCategory.lastChild.remove()
    await deleteElem(document.querySelector('#category_data'))

     insertValueInDom(result)

}


async function getDataFetch(url) {
    let response = await fetch(url);
    if (response.ok && response.headers.get('Content-Type') == 'application/json') {
        return response.json();
    } else {
       console.log(response.status, response.headers.get('Content-Type')); 
    }
}

btnCategory.addEventListener('click', function () {
    formCategory.classList.remove('hidden')
})

formCategory.addEventListener('submit', async function(e){
    e.preventDefault();
    let dataCategory = {}

    if (typeof category.id.value === 'undefined') {
         dataCategory.name = category.name.value
    } else {
         dataCategory.name = category.name.value
        dataCategory.id = category.id.value
    }

    sendPostForm('/admin/dashboard/category/store', dataCategory)
    formCategory.classList.add('hidden')
})



for (const tbodyElement of tbody.rows) {
   let btnCategoryUpdate = tbodyElement.cells[3].childNodes[0]
    btnCategoryUpdate.addEventListener('click', async function() {
       formCategory.classList.remove('hidden')
       let id = btnCategoryUpdate.dataset.id
      let  inputHidden = document.createElement('input')
        inputHidden.type = "hidden"
        inputHidden.value = id
        inputHidden.name = 'id'
        formCategory.append(inputHidden)
       let input = formCategory[0]
       let dataForm = await getDataFetch('/admin/dashboard/categories/' + id)
       input.value = dataForm.name
    });
}