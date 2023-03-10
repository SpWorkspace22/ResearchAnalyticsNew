use researchanalytics;

drop table author;
create table author(author_id int auto_increment ,first_name varchar(100) not null,last_name varchar(100) not null,email varchar(100) primary key, phone varchar(15));

