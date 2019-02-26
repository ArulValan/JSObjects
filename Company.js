
// Start the main app logic.
define(["C:\\Users\\ArulVC\\Desktop\\my_env\\JS\\JSObjects\\Department.js", "C:\\Users\\ArulVC\\Desktop\\my_env\\JS\\JSObjects\\Employee.js"],
    function (Department, Employee) {
        window.Department = Department;
        window.Employee = Employee;
        Company = function (CompanyName) {
            this.CompanyName = CompanyName;
            this.Employees = [];
            this.Departments = [];

            this.AddEmployee = function (givenEmployee) {
                var duplicateEmployee = this.Employees.filter(function (employee) {
                    return (employee.Name == givenEmployee.Name || employee.EmployeeID == givenEmployee.EmployeeID);
                })[0];
                if (duplicateEmployee === undefined) {
                    this.Employees.push(givenEmployee);
                }
                else {
                    console.log("Employee " + givenEmployee.Name + "  " + givenEmployee.EmployeeID + " Already Exists.");
                }
            };

            this.RemoveEmployee = function (givenEmployeeID) {
                var employeePosition = undefined;
                this.Employees.some(function (employee, index) {
                    if (employee.EmployeeID == givenEmployeeID) { employeePosition = index; return true; }
                });
                if (employeePosition === undefined) { console.log("Employee with Employee ID " + givenEmployeeID + " Could not be Found."); }
                else { this.Employees.splice(employeePosition, 1); }
                this.Departments = this.Departments.map(function (department) {
                    if (department.Members != undefined)
                        department.Members = department.Members.filter(function (departmentMember) {
                            return (!(departmentMember.DepartMentID == givenEmployeeID));
                        })[0];
                    return department;
                });
            };

            this.AddDepartment = function (givenDepartment) {
                var duplicateDepartment = this.Departments.filter(function (department) {
                    return (department.DepartmentID == givenDepartment.DepartmentID || department.DepartmentName == givenDepartment.DepartmentName);
                })[0];
                if (duplicateDepartment == null) {
                    this.Departments.push(givenDepartment);
                }
                else { console.log("Department with ID " + givenDepartment.DepartmentID + " Already Exists"); }
            };

            this.AssignToDepartment = function (givenEmployeeID, givenDepartmentID) {
                var departments = this.Departments;
                var employees = this.Employees;
                var targetDepartment = undefined;
                var employeeAlreadyAssigned = false;
                departments.some(function (department, index) {
                    if (department.DepartmentID == givenDepartmentID) {
                        department.Members.some(function (departmentMember) {
                            if (departmentMember.EmployeeID == givenEmployeeID) { employeeAlreadyAssigned = true; }
                        });
                        targetDepartment = index;
                        return true;
                    }
                });
                if (employeeAlreadyAssigned) {
                    console.log("Employee is already added to department.");
                    return false;
                }
                if (targetDepartment === undefined) {
                    console.log("Department with given ID " + givenDepartmentID + " cannot be Found.");
                    return false;
                }
                else {
                    var targetEmployee = undefined;
                    employees.some(function (employee, index) {
                        if (employee.EmployeeID == givenEmployeeID) { targetEmployee = index; return true; }
                    });
                    if (targetEmployee === undefined) {
                        console.log("Employee with given ID " + givenEmployeeID + " cannot be Found."); return false;
                    }
                    else {
                        departments[targetDepartment].Members
                            .push(employees[targetEmployee]); return true;
                    }
                };
            }

            this.GetAllEmployees = function () {
                return this.Employees;
            }

            this.RemoveDepartment = function (departmentID) {
                var removedFlag = false;
                this.Departments = this.Departments.filter(function (Department) {
                    if (Department.DepartmentID == departmentID) { removedFlag = true; }
                    return (!(Department.DepartmentID == departmentID));
                })
                if (removedFlag == false) { console.log("Department with Department ID " + departmentID + " Doesn't Exist."); }
            };

        }
    });