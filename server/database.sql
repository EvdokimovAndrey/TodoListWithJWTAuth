CREATE DATABASE authtodo;

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_surname VARCHAR(255) NOT NULL,
  user_middle_name VARCHAR(255) NOT NULL,
  user_login VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  supervisor boolean,
  PRIMARY KEY(user_id)
);

CREATE TABLE todo(
  todo_id SERIAL,
  user_id UUID,
  title VARCHAR(255),
  description VARCHAR(255),
  date_of_end timestamptz,
  date_of_creation timestamptz,
  date_of_update timestamptz,
  _priority_ integer,
  _status_ integer default 0,
  creater VARCHAR(255),
  responsible VARCHAR(255),
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- INSERT INTO users (user_name, user_surname, user_middle_name, user_login, user_password, supervisor) VALUES ('Andrey', 'Evdokimov', 'Andreevich', 'EvdokimovAndrey', 'andrey123', true);

-- INSERT INTO users (user_name, user_surname, user_middle_name, user_login, user_password, supervisor) VALUES ('henry', 'h', 'h', 'henryly213@gmail.com', 'kthl8822', false);

-- DELETE FROM users WHERE user_id = 'b4054392-e6cf-4c47-af11-1018b0cf7226';