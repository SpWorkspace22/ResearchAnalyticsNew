use researchanalytics;

drop table author;
drop table department;
create table author(author_id int auto_increment primary key ,first_name varchar(100) not null,last_name varchar(100) not null,email varchar(100) unique , phone varchar(15));
create table department(deparment_id int auto_increment primary key, department_name varchar(50) not null unique);

Alter table author add department_id int REFERENCES department(deparment_id);

insert into department(department_name) values("MCA");
insert into department(department_name) values("BTECH");
insert into department(department_name) values("MTECH");

select * from author;
select * from department;



commit