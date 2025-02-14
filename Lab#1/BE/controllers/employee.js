const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

exports.deleteEmployee = async (req, res, next) => {

  const { id } = req.params;
  const index = employee.findIndex(currentEmployees => currentEmployees.id === id);

  if (index === -1) return res.status(404).json({ message: `Employee with ID ${id} not found.` });

  employee.splice(index, 1);
  res.status(200).json({ message: `Employee with ID ${id} deleted successfully.` });
};

exports.createEmployee = async (req, res, next) => {
  
  const {name, id} = req.body;
  
  if (employee.find(currentEmployees => currentEmployees.id === id))
    return res.status(400).json({ message: `Employee with ID: ${id} already exists`});
  
  employee.push({ id: id, name: name })
  res.status(201).json({ message: "Employee created successfully", employee: { id, name } });
};
