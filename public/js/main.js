let btnCategory = document.querySelector('#btn-category')
let formCategory = document.forms.category;
let btnCategoryUpdate = document.querySelector('#category-update')

async function sendPostForm(url, body) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type" : 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (response.ok == true && response.headers.get('Content-Type') == 'application/json') {
        return response.json();
    } else {
       console.log(response.status, response.headers.get('Content-Type')); 
    }
}

async function getDataFetch(url) {
    let response = await fetch(url);
    if (response.ok == true && response.headers.get('Content-Type') == 'application/json') {
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

    let category = formCategory[0].value;
    await sendPostForm('/admin/dashboard/category/store', {category})
    formCategory.classList.add('hidden')
})

btnCategoryUpdate.addEventListener('click', async function() {
    formCategory.classList.remove('hidden')
    let id = btnCategoryUpdate.dataset.id
    let input = formCategory[0]
    let dataForm = await getDataFetch('/admin/dashboard/categories/' + id)
    input.value = dataForm.name
})