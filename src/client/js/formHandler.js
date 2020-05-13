
function handleSubmit(event) {
  event.preventDefault()

  // check what text was put into the form field
  let formText = document.getElementById('name').value
  Client.checkForName(formText)

  // Form Validation
  if (formText.length == 0) {
    alert('Please enter text/url');
    return
  }

  console.log("::: Form Submitted :::")
   fetch('http://localhost:8081/sentiment')
    .then(function (data) {
      console.log(data);
      postData('http://localhost:8081/add', { polarity: data.polarity, polarity_confidence: data.polarity_confidence, text: formText });
    })
    .then(
      updateUI()
    )

// Function to POST data 
    const postData = async (url = '', data = {}) => {
      const response = await fetch(url, {
          method: 'POST',
          credentials: 'same-origin',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({data}), // body data type must match "Content-Type" header        
      });
  
      try {
          const newData = await response.json();
          return newData
      }
      catch (error) {
          console.log("error", error);
      }
  }

// Function to GET Project Data 
  const updateUI = async () => {
    const response = await fetch('http://localhost:8081/all');
    console.log(response);
    try {
      const allData = await response.json();
      console.log(allData);
      document.getElementById('polarity').innerHTML = allData.polarity;
      document.getElementById('polarity_confidence').innerHTML = allData.polarity_confidence;
      document.getElementById('text').innerHTML = allData.formText;
    } catch (error) {
      console.log("error", error);
    }
  }
}

  export { handleSubmit}
