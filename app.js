const apiKey = "KXpVgRKktI7Zl06Z2Tc5EiRvxFb5QmfqQceNJupS";
let state = "";
let limit = "";

function getResponse() {
  const url = `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${limit}&api_key=${apiKey}`;
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => dispalyresults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function dispalyresults(responseJson) {
  $("main").empty();
  for (let i = 0; i < responseJson.data.length; i++)
    $("main").append(
      `<h1>${responseJson.data[i].fullName}</h1><p>${responseJson.data[i].description}</p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>`
    );
}

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    limit = $("#js-max-results").val();
    state = $("#input").val();
    getResponse();
  });
}

$(watchForm);
