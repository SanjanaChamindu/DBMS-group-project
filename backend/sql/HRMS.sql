-- Creating database
DROP DATABASE IF EXISTS hrms;

CREATE DATABASE hrms;

USE hrms;

-- Creating tables
CREATE TABLE `organization` (
  `registration_id` char(10),
  `name` varchar(20),
  `address` varchar(50),
  PRIMARY KEY (`registration_id`)
);

CREATE TABLE `department` (
  `department_id` char(10) NOT NULL,
  `organization_id` char(10),
  `hod_id` char(10),
  `department_name` varchar(20),
  `budget` float(2),
  PRIMARY KEY (`department_id`),
  FOREIGN KEY (`organization_id`) REFERENCES `organization`(`registration_id`)
);

CREATE TABLE `contact_details` (
  `employee_id` char(10),
  `primary_phone_number` varchar(20),
  `secondary_phone_number` varchar(20),
  `email_address` varchar(50),
  `primary_emergency_contact` varchar(20),
  `secondary_emergency_contact` varchar(20),
  `address` varchar(70),
  `mothers_name` varchar(50),
  `fathers_name` varchar(50),
  `health_conditions` varchar(50),
  PRIMARY KEY (`employee_id`)
);

CREATE TABLE `permission_level` (
  `permission_level_id` char(10),
  `view_information_access` boolean,
  `edit_information_access` boolean,
  `absence_related_access` boolean,
  `adding_employee_access` boolean,
  `add_attributes_access` boolean,
  PRIMARY KEY (`permission_level_id`)
);

CREATE TABLE `pay_grades` (
  `paygrade_id` char(10),
  `basic_salary` float(2),
  `ot_benefits` float(2),
  `number_of_annual_leaves` int,
  `number_of_casual_leaves` int,
  `number_of_maternity_leaves` int,
  `number_of_no_pay_leaves` int,
  PRIMARY KEY (`paygrade_id`)
);

CREATE TABLE `leave_request` (
  `leave_request_id` int,
  `employee_id` char(10),
  `date` date,
  `description` varchar(100),
  `supervisor_approval` tinyint(1),
  `leave_type` varchar(10),
  PRIMARY KEY (`leave_request_id`)
);

CREATE TABLE `leave_record` (
  `employee_id` char(10),
  `annual_leaves_taken` int,
  `casual_leaves_taken` int,
  `maternity_leaves_taken` int,
  `no_pay_leaves_taken` int,
  PRIMARY KEY (`employee_id`)
);

CREATE TABLE `job_title` (
  `job_title_id` char(10),
  `job_title_name` varchar(40),
  `paygrade_id` char(10),
  PRIMARY KEY (`job_title_id`),
  FOREIGN KEY (`paygrade_id`) REFERENCES `pay_grades`(`paygrade_id`)
);

CREATE TABLE `user` (
  `user_name` varchar(20),
  `password` varchar(255),
  `permission_level_id` char(10),
  PRIMARY KEY (`user_name`),
  FOREIGN KEY (`permission_level_id`) REFERENCES `permission_level`(`permission_level_id`)
);

CREATE TABLE `employee` (
  `employee_id` char(10),
  `nic` char(12),
  `full_name` varchar(100),
  `gender` char(1),
  `user_name` varchar(20),
  `supervisor_id` char(10),
  `job_title_id` char(10),
  `department_id` char(10),
  `employment_status` varchar(20),
  `birth_day` date,
  `marital_status` varchar(10),
  `nationality` varchar(15),
  PRIMARY KEY (`employee_id`),
  FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`) ON DELETE
  SET
    NULL,
    FOREIGN KEY (`employee_id`) REFERENCES `contact_details`(`employee_id`),
    FOREIGN KEY (`job_title_id`) REFERENCES `job_title`(`job_title_id`),
    FOREIGN KEY (`employee_id`) REFERENCES `leave_record`(`employee_id`),
    FOREIGN KEY (`user_name`) REFERENCES `user`(`user_name`)
);

-- Inserting data into the tables
INSERT INTO
  `organization` (`registration_id`, `name`, `address`)
VALUES
  (
    '3333300001',
    'Jupyter-Colombo Main',
    'No:72, 35th street, Colombo 0, Sri Lanka'
  ),
  (
    '3333300002',
    'Jupyter-Kandy',
    'No:98, Peradeniya, Sri Lanka'
  ),
  (
    '3333300003',
    'Jupyter-Islamabad',
    'No:23, street 24, Islamabad, Pakistan'
  ),
  (
    '3333300004',
    'Jupyter-Dhaka',
    'No:3, DPI Road, Dhaka, Bangladesh'
  );

INSERT INTO
  `department` (
    `department_id`,
    `organization_id`,
    `hod_id`,
    `department_name`,
    `budget`
  )
VALUES
  (
    '2505000001',
    '3333300001',
    '1820249322',
    'Finance',
    35000000.00
  ),
  (
    '2505000002',
    '3333300001',
    '1820282383',
    'Product development',
    95000000.00
  ),
  (
    '2505000003',
    '3333300001',
    '1820232623',
    'HR',
    25000000.00
  ),
  (
    '2505000004',
    '3333300001',
    '1820200312',
    'Security',
    50000000.00
  ),
  (
    '2505000005',
    '3333300001',
    '1820259954',
    'Marketing',
    75000000.00
  );

INSERT INTO
  `contact_details` (
    `employee_id`,
    `primary_phone_number`,
    `secondary_phone_number`,
    `email_address`,
    `primary_emergency_contact`,
    `secondary_emergency_contact`,
    `address`,
    `mothers_name`,
    `fathers_name`,
    `health_conditions`
  )
VALUES
  (
    '1820244756',
    '+55 876 524 1661',
    '+62 756 127 0619',
    'mblasiak0@smugmug.com',
    '+387 475 201 6177',
    '+55 862 830 4816',
    '61 Derek Lane',
    'Rica',
    'Deceased',
    'Diabetes'
  ),
  (
    '1820215507',
    '+351 751 952 3058',
    '+380 325 329 2730',
    'sgething1@adobe.com',
    '+62 812 872 9990',
    '+52 702 578 2689',
    '67 Carey Drive',
    'Leyla',
    'Salomo',
    'Normal'
  ),
  (
    '1820259954',
    '+57 300 443 3325',
    '+970 232 963 8536',
    'hcullingworth2@baidu.com',
    '+62 816 269 4616',
    '+62 593 459 7352',
    '897 Old Gate Lane',
    'Liana',
    'Hunter',
    'Normal'
  ),
  (
    '1820200312',
    '+351 429 947 3148',
    '+57 939 551 0079',
    'mfifoot3@vistaprint.com',
    '+86 435 709 8641',
    '+7 437 739 7331',
    '43124 Macpherson Hill',
    'Deceased',
    'Matty',
    'Heart Condition'
  ),
  (
    '1820220823',
    '+255 818 759 8306',
    '+212 618 134 1921',
    'dcrufts4@sphinn.com',
    '+81 546 606 6116',
    '+66 746 821 4320',
    '3 Ruskin Point',
    'Sephira',
    'Delaney',
    'Normal'
  ),
  (
    '1820231924',
    '+1 217 322 0223',
    '+46 862 907 3112',
    'gpyburn5@ebay.co.uk',
    '+63 226 275 8379',
    '+63 152 479 5670',
    '91 Morning Point',
    'Ros',
    'Graeme',
    'Normal'
  ),
  (
    '1820298781',
    '+7 373 325 8184',
    '+54 283 106 2877',
    'hheersma6@netvibes.com',
    '+33 998 361 2927',
    '+92 338 254 1556',
    '34 Sutherland Street',
    'Micki',
    'Hal',
    'Normal'
  ),
  (
    '1820251791',
    '+63 463 688 0955',
    '+7 821 911 6175',
    'hmaggorini7@seesaa.net',
    '+225 444 624 5071',
    '+62 992 408 4209',
    '07 Muir Hill',
    'Deceased',
    'Deceased',
    'Normal'
  ),
  (
    '1820216076',
    '+86 247 235 7650',
    '+226 528 850 4425',
    'wlarner8@wunderground.com',
    '+55 271 722 0527',
    '+353 236 175 3639',
    '7411 Continental Way',
    'Ruperta',
    'Will',
    'High Blood Pressure'
  ),
  (
    '1820289568',
    '+63 471 579 7856',
    '+55 191 865 5704',
    'skleis9@dmoz.org',
    '+86 329 189 9711',
    '+1 312 659 7270',
    '6 Dexter Way',
    'Ruthann',
    'Deceased',
    'Diabetes'
  ),
  (
    '1820288600',
    '+355 231 581 4542',
    '+51 211 912 0379',
    'nshannahana@comcast.net',
    '+34 346 327 0634',
    '+66 928 781 7578',
    '4 Golf View Center',
    'Ysabel',
    'Deceased',
    'Normal'
  ),
  (
    '1820212248',
    '+1 658 823 2208',
    '+86 412 823 7459',
    'greinerb@amazonaws.com',
    '+86 378 205 7578',
    '+86 399 540 8436',
    '73 Transport Road',
    'Gillian',
    'Gage',
    'Diabetes'
  ),
  (
    '1820267651',
    '+51 266 607 3039',
    '+82 596 754 5703',
    'cdominecc@yellowbook.com',
    '+66 707 786 3673',
    '+420 871 941 5537',
    '85834 Jana Hill',
    'Ainsley',
    'Corrie',
    'Heart Condition'
  ),
  (
    '1820204486',
    '+81 390 953 6000',
    '+351 282 326 9302',
    'aalfusod@gnu.org',
    '+62 376 564 4575',
    '+57 354 342 3044',
    '8773 Anderson Circle',
    'Deceased',
    'Arther',
    'High Blood Pressure'
  ),
  (
    '1820249322',
    '+86 390 281 7222',
    '+81 686 434 2671',
    'sheavisidee@ebay.com',
    '+62 189 705 4300',
    '+385 433 490 7042',
    '46642 Grayhawk Hill',
    'Cybil',
    'Stanly',
    'Normal'
  ),
  (
    '1820246608',
    '+46 408 920 9963',
    '+86 193 172 2962',
    'zbomef@wix.com',
    '+66 534 624 8518',
    '+66 366 595 6770',
    '337 Waywood Junction',
    'Bryn',
    'Zebadiah',
    'Asthma'
  ),
  (
    '1820232623',
    '+62 155 380 4010',
    '+62 481 999 9217',
    'ebenkheg@princeton.edu',
    '+64 301 261 9376',
    '+254 246 558 5961',
    '456 Morning Terrace',
    'Germain',
    'Deceased',
    'Normal'
  ),
  (
    '1820282383',
    '+7 424 303 9409',
    '+31 507 970 8584',
    'dbernocchih@hc360.com',
    '+1 972 715 6283',
    '+44 151 333 7285',
    '63 Brown Way',
    'Jillana',
    'Dagny',
    'Normal'
  ),
  (
    '1820238098',
    '+63 327 386 4318',
    '+86 861 836 1278',
    'lmccorleyi@pinterest.com',
    '+995 450 411 9048',
    '+63 208 961 8762',
    '0 Northridge Drive',
    'Deceased',
    'Lonnard',
    'Normal'
  ),
  (
    '1820280114',
    '+30 789 333 4040',
    '+86 811 275 1655',
    'swhorltonj@ucoz.ru',
    '+81 603 536 4681',
    '+507 488 877 3703',
    '77134 Killdeer Trail',
    'Ambur',
    'Sherwynd',
    'Heart Condition'
  );

INSERT INTO
  `Permission_level` (
    `permission_level_id`,
    `view_information_access`,
    `edit_information_access`,
    `absence_related_access`,
    `adding_employee_access`,
    `add_attributes_access`
  )
VALUES
  ('8193600001', false, false, false, false, false),
  ('8193600002', TRUE, TRUE, false, false, false),
  ('8193600003', TRUE, TRUE, TRUE, TRUE, false),
  ('8193600004', TRUE, TRUE, TRUE, TRUE, TRUE);

INSERT INTO
  `Pay_grades` (
    `paygrade_id`,
    `basic_salary`,
    `ot_benefits`,
    `number_of_annual_leaves`,
    `number_of_casual_leaves`,
    `number_of_maternity_leaves`,
    `number_of_no_pay_leaves`
  )
VALUES
  (
    '6743100000',
    '9000000',
    '5000000',
    43,
    34,
    35,
    366
  ),
  (
    '6743100001',
    '8000000',
    '4500000',
    43,
    33,
    35,
    366
  ),
  (
    '6743100002',
    '7000000',
    '4000000',
    41,
    33,
    35,
    366
  ),
  (
    '6743100003',
    '5000000',
    '3000000',
    41,
    33,
    30,
    366
  ),
  (
    '6743100004',
    '4000000',
    '2000000',
    38,
    30,
    30,
    366
  );

INSERT INTO
  `Leave_request` (
    `leave_request_id`,
    `Employee_id`,
    `date`,
    `description`,
    `supervisor_approval`,
    `Leave_type`
  )
VALUES
  (
    1,
    '1820231924',
    '2023-12-01',
    'Request for an annual leave, for a personal tax issue',
    1,
    'Casual'
  ),
  (
    2,
    '1820267651',
    '2023-12-01',
    'Personal Health Checkup',
    1,
    'Annual'
  );

INSERT INTO
  `Leave_record` (
    `employee_id`,
    `Annual_leaves_taken`,
    `Casual_leaves_taken`,
    `Maternity_leaves_taken`,
    `No_pay_leaves_taken`
  )
VALUES
  ('1820244756', 0, 0, 0, 0),
  ('1820215507', 0, 0, 0, 0),
  ('1820259954', 0, 0, 0, 0),
  ('1820200312', 0, 0, 0, 0),
  ('1820220823', 0, 0, 0, 0),
  ('1820231924', 0, 1, 0, 0),
  ('1820298781', 0, 0, 0, 0),
  ('1820251791', 0, 0, 0, 0),
  ('1820216076', 0, 0, 0, 0),
  ('1820289568', 0, 0, 0, 0),
  ('1820288600', 0, 0, 0, 0),
  ('1820212248', 0, 0, 0, 0),
  ('1820267651', 1, 0, 0, 0),
  ('1820204486', 0, 0, 0, 0),
  ('1820249322', 0, 0, 0, 0),
  ('1820246608', 0, 0, 0, 0),
  ('1820232623', 0, 0, 0, 0),
  ('1820282383', 0, 0, 0, 0),
  ('1820238098', 0, 0, 0, 0),
  ('1820280114', 0, 0, 0, 0);

INSERT INTO
  `Job_title` (`job_title_id`, `job_title_name`, `paygrade_id`)
VALUES
  ('5535500001', 'HR Manager', '6743100000'),
  (
    '5535500101',
    'Senior Software Engineer',
    '6743100001'
  ),
  ('5535500102', 'Software Engineer', '6743100003'),
  (
    '5535500103',
    'Intern Software Engineer',
    '6743100004'
  ),
  ('5535500201', 'Senior QA Engineer', '6743100001'),
  ('5535500202', 'QA Engineer', '6743100003'),
  ('5535500203', 'Intern QA Engineer', '6743100004'),
  ('5535500301', 'Accountant', '6743100002'),
  ('5535500302', 'Junior Accountant', '6743100003'),
  ('5535500303', 'Intern Accountant', '6743100004');

INSERT INTO
  `User` (`user_name`, `password`, `permission_level_id`)
VALUES
  (
    'rferrarag',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600004'
  ),
  (
    'aeldershawe',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600003'
  ),
  (
    'cfitcheth',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600003'
  ),
  (
    'bpinchbeck8',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600003'
  ),
  (
    'cbulman2',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600003'
  ),
  (
    'dcasari0',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600003'
  ),
  (
    'sdeaconson3',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600003'
  ),
  (
    'mwebbyi',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600003'
  ),
  (
    'gkendrew7',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600003'
  ),
  (
    'brollittb',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600003'
  ),
  (
    'sduval5',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600002'
  ),
  (
    'amacfie1',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600002'
  ),
  (
    'kmartusovj',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600002'
  ),
  (
    'wtommen6',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600002'
  ),
  (
    'sbrolechand',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600001'
  ),
  (
    'bdarree9',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600001'
  ),
  (
    'snorvala',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600001'
  ),
  (
    'apembery4',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600001'
  ),
  (
    'lkohringf',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600001'
  ),
  (
    'mwilloughbyc',
    '$2a$10$RB.sBqP41fWQJwXVgFLtZ.0ogU4/VHkmxPl7uq67zhFovrjSbdZ1S',
    '8193600001'
  );

INSERT INTO
  `Employee` (
    `Employee_id`,
    `NIC`,
    `Full_Name`,
    `Gender`,
    `user_name`,
    `supervisor_id`,
    `job_title_id`,
    `department_id`,
    `employment_status`,
    `birth_day`,
    `marital_status`,
    `Nationality`
  )
VALUES
  (
    '1820232623',
    '195122656419',
    'Romonda Ferrara',
    'M',
    'rferrarag',
    '',
    '5535500001',
    '2505000003',
    'Active',
    '1951-08-14',
    'Married',
    'SriLankan'
  ),
  (
    '1820249322',
    '195175791067',
    'Aubine Eldershaw',
    'F',
    'aeldershawe',
    '1820232623',
    '5535500301',
    '2505000001',
    'Active',
    '1951-09-14',
    'Married',
    'SriLankan'
  ),
  (
    '1820282383',
    '195284438703',
    'Clovis Fitchet',
    'F',
    'cfitcheth',
    '1820232623',
    '5535500101',
    '2505000002',
    'Active',
    '1952-12-09',
    'Married',
    'Chinese'
  ),
  (
    '1820216076',
    '196221007572',
    'Bobina Pinchbeck',
    'M',
    'bpinchbeck8',
    '1820232623',
    '5535500201',
    '2505000002',
    'Active',
    '1962-07-29',
    'Married',
    'Indian'
  ),
  (
    '1820259954',
    '196610874637',
    'Camella Bulman',
    'M',
    'cbulman2',
    '1820232623',
    '5535500101',
    '2505000005',
    'Active',
    '1965-07-05',
    'Single',
    'SriLankan'
  ),
  (
    '1820244756',
    '196771429520',
    'Daria Casari',
    'F',
    'dcasari0',
    '1820232623',
    '5535500301',
    '2505000005',
    'Active',
    '1967-08-02',
    'Married',
    'SriLankan'
  ),
  (
    '1820200312',
    '196908853119',
    'Standford Deaconson',
    'M',
    'sdeaconson3',
    '1820232623',
    '5535500101',
    '2505000004',
    'Active',
    '1969-03-29',
    'Married',
    'SriLankan'
  ),
  (
    '1820238098',
    '196976209212',
    'Matthias Webby',
    'F',
    'mwebbyi',
    '1820232623',
    '5535500101',
    '2505000004',
    'Active',
    '1969-09-19',
    'Married',
    'SriLankan'
  ),
  (
    '1820251791',
    '197071972576',
    'Gunilla Kendrew',
    'F',
    'gkendrew7',
    '1820232623',
    '5535500101',
    '2505000003',
    'Active',
    '1970-08-07',
    'Single',
    'Chinese'
  ),
  (
    '1820212248',
    '197608776191',
    'Brianna Rollitt',
    'M',
    'brollittb',
    '1820232623',
    '5535500201',
    '2505000004',
    'Active',
    '1976-03-27',
    'Single',
    'SriLankan'
  ),
  (
    '1820231924',
    '197808660606',
    'Sayers Duval',
    'M',
    'sduval5',
    '1820200312',
    '5535500102',
    '2505000004',
    'Active',
    '1978-03-27',
    'Single',
    'SriLankan'
  ),
  (
    '1820215507',
    '197962842614',
    'Arthur MacFie',
    'F',
    'amacfie1',
    '1820212248',
    '5535500202',
    '2505000004',
    'Active',
    '1979-05-08',
    'Married',
    'SriLankan'
  ),
  (
    '1820280114',
    '198423797298',
    'Kean Martusov',
    'M',
    'kmartusovj',
    '1820249322',
    '5535500302',
    '2505000001',
    'Active',
    '1984-08-24',
    'Married',
    'SriLankan'
  ),
  (
    '1820298781',
    '198620437983',
    'Werner Tommen',
    'M',
    'wtommen6',
    '1820249322',
    '5535500302',
    '2505000001',
    'Active',
    '1986-07-23',
    'Married',
    'SriLankan'
  ),
  (
    '1820204486',
    '198964729227',
    'Siusan Brolechan',
    'F',
    'sbrolechand',
    '1820282383',
    '5535500103',
    '2505000002',
    'Active',
    '1989-05-27',
    'Married',
    'Chinese'
  ),
  (
    '1820289568',
    '199016873570',
    'Bartolemo Darree',
    'M',
    'bdarree9',
    '1820216076',
    '5535500203',
    '2505000002',
    'On Leave',
    '1990-06-17',
    'Married',
    'SriLankan'
  ),
  (
    '1820288600',
    '199161092127',
    'Sammy Norval',
    'F',
    'snorvala',
    '1820216076',
    '5535500203',
    '2505000002',
    'Active',
    '1991-04-20',
    'Single',
    'SriLankan'
  ),
  (
    '1820220823',
    '199766701198',
    'Annadiana Pembery',
    'F',
    'apembery4',
    '1820259954',
    '5535500103',
    '2505000005',
    'Active',
    '1997-06-16',
    'Married',
    'SriLankan'
  ),
  (
    '1820246608',
    '199957333971',
    'Lexy Kohring',
    'F',
    'lkohringf',
    '1820259954',
    '5535500203',
    '2505000005',
    'Active',
    '1999-03-14',
    'Single',
    'SriLankan'
  ),
  (
    '1820267651',
    '200278886007',
    'Marsiella Willoughby',
    'F',
    'mwilloughbyc',
    '1820244756',
    '5535500303',
    '2505000005',
    'Active',
    '2002-10-15',
    'Married',
    'SriLankan'
  );