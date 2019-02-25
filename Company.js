Employee = function (Name, Age, EmployeeID) {
    this.Name = Name; this.Age = Age; this.EmployeeID = EmployeeID;
}

Department = function (DepartMentID, DepartmentName) {
    this.DepartmentID = DepartMentID; this.DepartmentName = DepartmentName; this.Members = []
}

Company = function (CompanyName) {

    this.CompanyName = CompanyName;
    this.Employees = [];
    this.Departments = [];

    this.AddEmployee = function (name, age, employeeID) {
        DuplicateEmployee = this.Employees.filter(function (Employee) {
            return (!(Employee.Name == name || Employee.EmployeeID == employeeID))
        })
        if (DuplicateEmployee != null) {
            this.Employees.push(new Employee(Name, Age, EmployeeID));
        }
    };

    this.RemoveEmployee = function (Name, Age, EmployeeID) {
        this.Employees = this.Employees.filter(function (Employee) {
            return (!(Employee.Name == Name || Employee.EmployeeID == EmployeeID))
        })
        this.Departments = this.Departments.map(function (Department) {
            Department.Members=Department.Members.filter(function (DepartmentMember) {
                return (!(DepartmentMember.Name == Name || DepartmentMember.DepartMentID == EmployeeID))
            })[0]
            return Department
        })
    };

    this.AddDepartment = function (DepartmentID, DepartmentName) {
        DuplicateDepartment = this.Departments.filter(function (Department) {
            return (Department.DepartmentID == DepartmentID || Department.DepartmentName == DepartmentName)
        })[0]
        if (DuplicateDepartment == null) {
            // var CreatedEmployee = new Employee(Name, Age, EmployeeID)
            this.Departments.push(new Department(DepartmentID, DepartmentName))
        }
    };

    this.AssignToDepartment = function (Name, Age, EmployeeID, DepartmentID, DepartmentName) {
        Sucessfull = false;
        this.Departments.map(function (Department) {
            if (DepartmentID == Department.DepartMentID || DepartmentName == DepartmentName) {
                var targetDepartment = this.Employees.filter(function (Employee) {
                    return (Employee.Name == Name || Employee.EmployeeID == EmployeeID)
                })[0];
                if (targetDepartment != null) { Department.Members.push(targetDepartment); Sucessfull = true; }
            }
        }.bind(this))
        return Sucessfull;
    }

    this.GetAllEmployees= function(){
        return this.Employees;
    }

    this.RemoveDepartment = function (DepartmentID, DepartmentName) {
        this.Departments = this.Departments.filter(function (Department) {
            return (!(Department.DepartmentID == DepartmentID || Department.DepartmentName == DepartmentName))
        })
    };
    
}