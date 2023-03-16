use researchanalytics;

drop table author_platform;
drop table author;
drop table department;
drop table platform;

create table author(author_id int auto_increment primary key ,first_name varchar(100) not null,last_name varchar(100) not null,email varchar(100) unique , phone varchar(15),department_id int REFERENCES department(deparment_id));
create table platform(platform_code varchar(10) primary key,platform_name varchar(100) not null);
create table department(deparment_id int auto_increment primary key, department_name varchar(50) not null unique);
create table author_platform(author_id int REFERENCES author(author_id),platform_code varchar(10) references platform(platform_code), platform_id varchar(100));

insert into department(department_name) values("MCA");
insert into department(department_name) values("BTECH");
insert into department(department_name) values("MTECH");

insert into platform values("GS","google scholar");
insert into platform values("SC","scopus");

select * from author;
select * from author_platform;

commit