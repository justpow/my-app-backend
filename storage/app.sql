CREATE TABLE users(
   id SERIAL       NOT NULL,
   username       varchar(20)    NOT NULL,
   email          varchar(100)     NOT NULL,
   pass       varchar(255)   NOT NULL,
   create_time    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   update_time    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);