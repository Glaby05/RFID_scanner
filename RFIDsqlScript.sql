--@block
CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('viewer', 'admin', 'manager') NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- rfid_tag VARCHAR(100) UNIQUE NOT NULL
);

--@block
CREATE TABLE warehouse (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL,
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES employee(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--@block
CREATE TABLE item (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    rfid_tag VARCHAR(100) UNIQUE NOT NULL,
    warehouse_id INT,
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--@block
CREATE TABLE inventory_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  warehouse_id INT DEFAULT NULL,
  item_id INT NOT NULL,
  employee_id INT DEFAULT NULL,   -- nullable because of ON DELETE SET NULL below
  action ENUM('added', 'removed', 'moved') NOT NULL,
  quantity INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (warehouse_id) REFERENCES warehouse(id) ON DELETE SET NULL,
  FOREIGN KEY (item_id) REFERENCES item(id) ON DELETE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE SET NULL
)


-- --@block
-- DROP DATABASE IF EXISTS scanrfid;

-- -- @block
-- CREATE DATABASE scanrfid;
