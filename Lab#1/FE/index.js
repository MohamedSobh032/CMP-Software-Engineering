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
document.getElementById("employeeForm").addEventListener("submit", (ev) => { ev.preventDefault(); createEmployee(); })

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
        response.json().then(errorData => console.log(`Failed, ${errorData.message}`));
        return;
      }
      // call fetchEmployees
      fetchEmployees()
      document.getElementById('employeeForm').reset();
      console.log(`Employee with name ${name}, and ID: ${id}, created successfully`);
    })
    .catch(error => { console.error(error); return; })
}


// add event listener to delete button
document.getElementById('dataTable').addEventListener("click", (ev) => {

  // check if the clicked is a button
  if (ev.target.tagName === 'BUTTON') {
    const row = ev.target.closest('tr');
    const id = row.cells[0].textContent;
    deleteEmployee(id);
  }
});

function deleteEmployee(id) {

  // send id to BE
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: "DELETE"
  })
    .then(response => {

      if (!response.ok) {
        response.json().then(errorData => console.log(`Failed to delete employee with ID ${id}: ${errorData.message}`));
        return;
      }
      // call fetchEmployees
      fetchEmployees()
      console.log(`Employee with ID ${id} deleted successfully.`);
    })
    .catch(error => { console.error(error); return; })
}

fetchEmployees()
