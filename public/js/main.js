// управление категориями
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

//управление статьями

function createTdTable(parent, data) {
    data.forEach(function (item, i, arr){
        let td = document.createElement('td')
        td.innerText = item.id
        parent.append(td)
        td = document.createElement('td')
        td.innerText = item.title
        parent.append(td)
        td = document.createElement('td')
        td.innerText = item.subcontent
        parent.append(td)

        let btnDelete = `<button id='article-delete' data-id='${item.id}'>удалить</button>`
        td = document.createElement('td')
        td.innerHTML = btnDelete
        parent.append(td)

        let btnUpdate = `<button id='article-update' data-id='${item.id}'>изменить</button>`
        td = document.createElement('td')
        td.innerHTML = btnUpdate
        parent.append(td)
    })
}

function createColTable(parent, data) {
    let td = document.createElement('td')
    td.innerText = data.id
    parent.append(td)
    td = document.createElement('td')
    td.innerText = data.title
    parent.append(td)
    td = document.createElement('td')
    td.innerText = data.subcontent
    parent.append(td)

    let btnDelete = `<button id='article-delete' data-id='${data.id}'>удалить</button>`
    td = document.createElement('td')
    td.innerHTML = btnDelete
    parent.append(td)

    let btnUpdate = `<button id='article-update' data-id='${data.id}'>изменить</button>`
    td = document.createElement('td')
    td.innerHTML = btnUpdate
    parent.append(td)
}
function addEventUpdateArticles(elem, numElem) {
    for (let articlesRowElement of elem) {
        articlesRowElement.childNodes[numElem].lastChild
            .addEventListener('click', async event => {
                let id = event.path[0].dataset.id
                let article = await getDataFetch(`/admin/dashboard/article/${id}`)
                const forms = document.forms[1]
                forms.elements[0].value = article[0].title
                forms.elements[1].value = article[0].id_category
                forms.elements[2].value = article[0].subcontent
                forms.elements[3].value = article[0].content
                let  inputHidden = document.createElement('input')
                inputHidden.type = "hidden"
                inputHidden.value = id
                inputHidden.name = 'id'
                forms.append(inputHidden)
            });
    }
}
document.forms.article.addEventListener('submit', async e => {
    e.preventDefault()
   let response = await fetch('/admin/dashboard/article', {
        method: 'POST',
        body: new FormData(document.article)
    });
    let articles = await response.json()
    if (document.forms[1].length == 6) {
        document.forms[1].elements.id.remove()
    }

    document.forms.article.title.value = ''
    document.forms.article.id_category.value = ''
    document.forms.article.subcontent.value = ''
    document.forms.article.content.value = ''
    let dashboardArticle = document.querySelector('.articles_dashboard')
    if(document.querySelector('#show_articles') == null) {
        document.querySelector('#not_articles').remove()
        let table = document.createElement('table')
        table.id = 'show_articles'
        dashboardArticle.append(table)
        table = document.querySelector('#show_articles')
        let thead = document.createElement('thead')
        table.append(thead)
        thead.append(document.createElement('tr'))

        thead.lastElementChild.append(document.createElement('td'))
        thead.lastElementChild.lastElementChild.innerText = 'ID'
        thead.lastElementChild.append(document.createElement('td'))
        thead.lastElementChild.lastElementChild.innerText = 'Заголовок'
        thead.lastElementChild.append(document.createElement('td'))
        thead.lastElementChild.lastElementChild.innerText = 'Отрывок'
        thead.lastElementChild.append(document.createElement('td'))
        thead.lastElementChild.lastElementChild.innerText = 'Действие'


        table = document.querySelector('#show_articles')
        let tbody = document.createElement('tbody')
        tbody.id = 'tbarticles'
        table.append(tbody)
        tbody.append(document.createElement('tr'))
        let tr = tbody.lastElementChild


        await createTdTable(tr, articles)
        let articlesRow = document.querySelector('#tbarticles').rows
        addEventUpdateArticles(articlesRow, 4)
    } else {

        let tbody = document.querySelector(`#tbarticles`)
        deleteElem(tbody)
        let tr;
        for (let i = 0; i < articles.length; i++){
            tbody.append(document.createElement('tr'))

            tr = tbody.lastElementChild
            createColTable(tr, articles[i])
        }
        let articlesRow = document.querySelector('#tbarticles').rows
        addEventUpdateArticles(articlesRow, 4)
    }
})

const articlesRow = document.querySelector('#tbarticles').rows
addEventUpdateArticles(articlesRow, 9)

