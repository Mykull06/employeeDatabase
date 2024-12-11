import inquirer from "inquirer";
import { db } from "./connection"; // Import the `db` instance from connection

interface Department {
  id: number;
  name: string;
}

interface Role {
  id: number;
  title: string;
  salary: number;
  department_id: number;
}

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  role_id: number;
  manager_id: number | null;
}

// Main menu function
function mainMenu(): void {
  console.log("Return to the main menu.");
  // Add your menu logic here
}

// Add department function
async function addDepartment(): Promise<void> {
  try {
    const { departmentName } = await inquirer.prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter the name of the new department:",
      },
    ]);

    const query = "INSERT INTO departments (name) VALUES ($1)";
    await db.query(query, [departmentName]); // Use `db` instance for queries
    console.log(`Added ${departmentName} to departments.`);
    mainMenu();
  } catch (err) {
    console.error("Error adding department:", err);
  }
}

// Add role function
async function addRole(): Promise<void> {
  try {
    const { rows: departments } = await db.query<Department>("SELECT * FROM departments"); // Use `db`

    const { roleTitle, roleSalary, departmentId } = await inquirer.prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Enter the title of the new role:",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter the salary for the new role:",
      },
      {
        type: "list",
        name: "departmentId",
        message: "Select the department for the new role:",
        choices: departments.map((dept) => ({ name: dept.name, value: dept.id })),
      },
    ]);

    const query = "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)";
    await db.query(query, [roleTitle, parseInt(roleSalary), departmentId]); // Use `db`
    console.log(`Added ${roleTitle} role to the database.`);
    mainMenu();
  } catch (err) {
    console.error("Error adding role:", err);
  }
}

// Add employee function
async function addEmployee(): Promise<void> {
  try {
    const { rows: roles } = await db.query<Role>("SELECT * FROM role"); // Use `db`
    const { rows: managers } = await db.query<Employee>("SELECT * FROM employees");

    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the first name of the employee:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the last name of the employee:",
      },
      {
        type: "list",
        name: "roleId",
        message: "Select the role for the employee:",
        choices: roles.map((role) => ({ name: role.title, value: role.id })),
      },
      {
        type: "list",
        name: "managerId",
        message: "Select the manager for the employee (if any):",
        choices: ([
          { name: "None", value: null },
        ] as { name: string; value: number | null }[]).concat(
          managers.map((manager) => ({
            name: `${manager.first_name} ${manager.last_name}`,
            value: manager.id,
          }))
        ),
      },
    ]);

    const query =
      "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)";
    await db.query(query, [firstName, lastName, roleId, managerId]); // Use `db`
    console.log(`Added ${firstName} ${lastName} to the database.`);
    mainMenu();
  } catch (err) {
    console.error("Error adding employee:", err);
  }
}

export { addDepartment, addRole, addEmployee };
