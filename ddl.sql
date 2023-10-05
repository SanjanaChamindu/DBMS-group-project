CREATE TABLE `pay_grade` (
  `paygrade_id` char(10),
  `basic_salary` float,
  `ot_benifits` float,
  `annual_leaves` int,
  `casual_leaves` int,
  `maternity_leaves` int,
  `no_pay_leaves` int,
  PRIMARY KEY (`paygrade_id`)
);

CREATE TABLE `job_title` (
  `job_title_id` char(10),
  `job_title_name` varchar(20),
  `paygrade_id` char(10),
  PRIMARY KEY (`job_title_id`),
  FOREIGN KEY (`paygrade_id`) REFERENCES `pay_grade`(`paygrade_id`)
);

CREATE TABLE `employee_record` (
  `record_id` char(10),
  `employee_id` char(10),
  `description` varchar(100),
  `annual_leaves_taken` int,
  `casual_leaves_taken` int,
  `maternity_leaves_taken` int,
  `no_pay_leaves_taken` int,
  PRIMARY KEY (`record_id`)
);

CREATE TABLE `leaves` (
  `leave_id` char(10),
  `record_id` char(10),
  `supervisor_approval` boolean,
  PRIMARY KEY (`leave_id`),
  FOREIGN KEY (`leave_id`) REFERENCES `employee_record`(`record_id`)
);

CREATE TABLE `permission_level` (
  `permission_level_id` char(10),
  `view_information_access` boolean,
  `edit_information_access` boolean,
  `absence_related_access` boolean,
  `adding_employee_access` boolean,
  `add_atributes_access` boolean,
  PRIMARY KEY (`permission_level_id`)
);

CREATE TABLE `permission_status` (
  `user_name` varchar(20),
  `password` varchar(255),
  `permission_level_id` char(10),
  PRIMARY KEY (`user_name`),
  FOREIGN KEY (`permission_level_id`) REFERENCES `permission_level`(`permission_level_id`)
);

CREATE TABLE `organization` (
  `registration_id` char(10),
  `name` varchar(20),
  `address` varchar(50),
  PRIMARY KEY (`registration_id`)
);

CREATE TABLE `department` (
  `department_id` char(10),
  `organization_id` char(10),
  `hod_id` char(10),
  `area` varchar(20),
  `budget` float(2),
  PRIMARY KEY (`department_id`),
  FOREIGN KEY (`organization_id`) REFERENCES `organization`(`registration_id`)
);

CREATE TABLE `employee_organizational` (
  `employee_id` char(10),
  `NIC` char(12),
  `user_name` varchar(20),
  `supervisor_id` char(10),
  `job_title_id` char(10),
  `department_id` char(10),
  `employment_status` varchar(20),
  PRIMARY KEY (`employee_id`),
  FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`),
  FOREIGN KEY (`job_title_id`) REFERENCES `job_title`(`job_title_id`)
);

CREATE TABLE `employee_personal` (
  `NIC` char(12),
  `name` varchar(30),
  `birth_day` date,
  `marital_status` varchar(10),
  `vital_information` varchar(10),
  `emergency_contact` varchar(10),
  `nationality` varchar(15),
  `` < TYPE >,
  PRIMARY KEY (`NIC`)
);