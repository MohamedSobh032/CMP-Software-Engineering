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

// add event listener to submit button
const form = document.getElementById("employeeForm")
form.addEventListener("submit", async (ev) => {
  
  ev.preventDefault();
  await createEmployee();
})

async function createEmployee() {

  // get data from input field
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;

  // send data to BE
  await fetch('http://localhost:3000/api/v1/employee', {
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
    .catch(error => {
      console.error(error);
      return;
    })
  
  // call fetchEmployees
  fetchEmployees()
  console.log(`Employee with name ${name}, and ID: ${id}, created successfully`)
}


// add event listener to delete button
const table = document.getElementById('dataTable');
table.addEventListener("click", async (ev) => {

  // check if the clicked is a button
  if (ev.target.tagName === 'BUTTON') {
    const row = ev.target.closest('tr');
    const id = row.cells[0].textContent;
    await deleteEmployee(id);
  }
});

async function deleteEmployee(id) {

  // send id to BE
  await fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: "DELETE"
  })
    .then(response => {
      if (!response.ok) {
        response.json().then(errorData => {
          console.log(`Failed to delete employee with ID ${id}:`, errorData.message);
        });
        return;
      }
    })
    .catch(error => {
      console.error(error);
      return;
    })

  // call fetchEmployees
  fetchEmployees()
  console.log(`Employee with ID ${id} deleted successfully.`);
}


fetchEmployees()
