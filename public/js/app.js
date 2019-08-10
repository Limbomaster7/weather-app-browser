





const weatherForm = document.querySelector("form")
const searchElement = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")



weatherForm.addEventListener("submit", (event) => {

    event.preventDefault()

    const location = searchElement.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    fetch(`/weather?address=${location}`)
    .then( res => {
        return res.json()
    })
    .then( data => {

        if (data.error) {
            messageOne.textContent = ""
            messageTwo.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
        
    })
    .catch(err => {
        console.log(err)
    })



})