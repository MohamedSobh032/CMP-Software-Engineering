const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
};

// TODO
exports.createEmployee = async (req, res, next) => {
  
  const {name, id} = req.body;
  
  // Check ID
  if (employee.find(currentEmployees => currentEmployees.id === id)) {
    return res.status(400).json({ message: `Employee with ID: ${id} already exists`});
  }

  employee.push({ id: id, name: name })
  res.status(201).json({ message: "Employee created successfully", employee: { id, name } });
};
