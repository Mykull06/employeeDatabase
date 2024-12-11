INSERT INTO departments (name) VALUES
('Software Engineering'),
('Finance'),
('Legal'),
('Learning and Development'),
('Sales');
       
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 100000, 1),
('Accountant', 80000, 2),
('Attorney', 120000, 3),
('Trainer', 60000, 4),
('Salesperson', 70000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Tony', 'Stark', 1, NULL),
('Louis', 'Litt', 2, 1),
('Harvey', 'Spectre', 3, 1),
('Michael', 'Scott', 4, 1),
('Bruce', 'Wayne', 5, 1);