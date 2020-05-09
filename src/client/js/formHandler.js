
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    
    console.log("::: Form Submitted :::")
    fetch('/test')
    .then(res => {
      return res.json()
    })
    .then(function(res) {
      document.getElementById('results').innerHTML = res.polarity;
      console.log(res);
    })
}

export { handleSubmit }
