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


function addEventCategoryElements(elem) {
    for (const tbodyElement of elem) {
        let btnCategoryUpdate = tbodyElement.cells[3].childNodes[0]
        let btnCategoryDelete = tbodyElement.cells[2].childNodes[0]
        let id = btnCategoryUpdate.dataset.id
        btnCategoryDelete.addEventListener('click', async () => {
           let categories = await getDataFetch(`/admin/dashboard/category/delete/${id}`)
            changeTableCategory(categories)
        })
        btnCategoryUpdate.addEventListener('click', async function() {
            document.forms.category.classList.remove('hidden')

            let  inputHidden = document.createElement('input')
            inputHidden.type = "hidden"
            inputHidden.value = id
            inputHidden.name = 'id'
            document.forms.category.append(inputHidden)
            let input = document.forms.category[0]
            let dataForm = await getDataFetch('/admin/dashboard/categories/' + id)
            input.value = dataForm.name
        });
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
    return  await response.json()
}

async function changeTableCategory(category) {
    await deleteElem(document.querySelector('#category_data'))

    await  insertValueInDom(category)
    addEventCategoryElements(tbody.rows)
    if (document.forms.category.length > 2) {
        document.forms.category.lastChild.remove()
    }
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

   let categories = await sendPostForm('/admin/dashboard/category/store', dataCategory)
    formCategory.classList.add('hidden')
    changeTableCategory(categories)
})


addEventCategoryElements(tbody.rows)