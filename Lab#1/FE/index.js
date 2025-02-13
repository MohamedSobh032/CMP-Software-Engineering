function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
const form = document.getElementById("employeeForm")
form.addEventListener("submit", (ev) => {
  
  ev.preventDefault();
  createEmployee();
})

// TODO
// add event listener to delete button

// TODO
function createEmployee() {

  // get data from input field
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;

  // send data to BE
  fetch('http://localhost:3000/api/v1/employee', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "name": name,
      "id": id
    }),
  })
  .then(response => {
    if (!response.ok) {
      response.json().then(errorData => {
        console.log("Failed,", errorData.message);
      });
      return;
    }
  })
  .catch(error => console.error(error))
  
  // call fetchEmployees
  fetchEmployees()
}

// TODO
function deleteEmployee() {
  // get id
  // send id to BE
  // call fetchEmployees
}

fetchEmployees()
