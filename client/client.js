// Access form elements
const form = document.querySelector("form");
const spinner = document.querySelector("#spinner");
const API_URL = "http://localhost:3000/woofs"

// Listen for form submit
form.addEventListener("submit", (e) => {
e.preventDefault();
// Get form data => name/breed/woofs data
const formData = new FormData(form);
const name = formData.get("name");
const breed = formData.get("breed");
const woofs = formData.get("woofs");
// Put form data into object
const woof = {
    name,
    breed,
    woofs
  };
// Hide form & display spinner
form.style.display = "none";
spinner.style.display = "";


// Submit form
fetch(API_URL, {
  method: "POST",
  body: JSON.stringify(woof),
  headers: {
    "content-type": "application/json"
  }
})
  .then(response => response.json())
  .then(createdWoof => {
    console.log(createdWoof);
    form.reset();
  })
  .catch(error => console.log(error));


  
});
spinner.style.display = "none";