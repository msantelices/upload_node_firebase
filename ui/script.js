const form = document.querySelector('#form')

const nameInput = document.querySelector('#name')
const fileInput = document.querySelector('#file')

form.addEventListener('submit', async(e)=> {
    e.preventDefault()

    const data = new FormData()
    data.append('name', nameInput.value)
    data.append('file', fileInput.files[0])

    try {
        const res = await fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: data
        })

        const json = await res.json()

        console.log(json)
    } catch(e) {
        console.log(e)
    }
})