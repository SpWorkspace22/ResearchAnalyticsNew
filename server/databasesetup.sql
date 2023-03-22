use researchanalytics;

-- drop table articles;
-- drop table author_platform;
-- drop table author;
-- drop table department;
-- drop table platform;


-- create table author(author_id int auto_increment primary key ,first_name varchar(100) not null,last_name varchar(100) not null,email varchar(100) unique , phone varchar(15),department_id int REFERENCES department(deparment_id));
-- create table platform(platform_code varchar(10) primary key,platform_name varchar(100) not null);
-- create table department(deparment_id int auto_increment primary key, department_name varchar(50) not null unique);
-- create table author_platform(author_id int REFERENCES author(author_id),platform_code varchar(10) references platform(platform_code), platform_id varchar(100));
-- create table articles(article_id int auto_increment primary key,article_name varchar(256) not null, journal_name varchar(256),pub_year int,citation int,
-- author_id int references author(author_id),platform_code varchar(10) references platform(platform_code));

-- insert into department(department_name) values("MCA");
-- insert into department(department_name) values("BTECH");
-- insert into department(department_name) values("MTECH");

-- insert into platform values("GS","google scholar");
-- insert into platform values("SC","scopus");

-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Perspectives on Marine Data Science as a Blueprint for Emerging Data Science Disciplines','Science Line',2008,243,10,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Science, Non-Science and Pseudo-Science','Science Offer',2019,139,9,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Predicting Public Trust in Science: The Role of Basic Orientations Toward Science, Perceived Trustworthiness of Scientists, and Experiences With Science','Science RIse',2016,250,3,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Using Data Sonification to Overcome Science Literacy, Numeracy, and Visualization Barriers in Science Communication','Science Drop',2016,276,5,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Open Science, Open Data, and Open Scholarship: European Policies to Make Science Fit for the Twenty-First Century','Science Line',2014,288,7,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Data Science and Big Data Analytics','Science Offer',2015,440,6,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Humanizing Big Data: Marketing at the Meeting of Data, Social Science, and Consumer Insight','Science Offer',2009,254,2,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('The Process of Analyzing Data is the Emergent Feature of Data Science','Science Drop',2015,110,6,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Big Data, Data Science, and Causal Inference: A Primer for Clinicians','Science Offer',2020,160,8,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Editorial: Data Science Applications to Inverse and Optimization Problems in Earth Science','Science Line',2003,217,10,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Data-Driven Supervised Learning for Life Science Data','Science Offer',2005,159,4,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('HPTMT Parallel Operators for High Performance Data Science and Data Engineering','Science Drop',2006,107,3,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('From the Field to the Cloud: A Review of Three Approaches to Sharing Historical Data From Field Stations Using Principles From Data Science','Science Line',2020,252,2,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Open Data, Collaborative Working Platforms, and Interdisciplinary Collaboration:','Science Offer',2013,444,9,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('How Data Mining, Data Warehousing, and On-Line Transactional Databases Are Helping Solve the Data Management Predicament','Science Drop',2021,117,7,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Efficient and Reliable Geocoding of German Twitter Data to Enable Spatial Data Linkage to Official Statistics and Other Data Sources','Science Line',2021,500,3,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Big Data Approaches for the Analysis of Large-Scale fMRI Data Using Apache Spark and GPU Processing: A Demonstration on Resting-State fMRI Data from the Human Connectome Project','Science Line',2021,90,1,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Streamlining Data and Service Centers for Easier Access to Data and Analytical Services: The Strategy of ODATIS as the Gateway to French Marine Data','Science Drop',2020,298,7,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Data Management: Data Warehousing and Data Mining','Science Drop',2014,73,2,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('The Objectivity of Science: Can Science Be Fully Objective','Science Line',2015,281,5,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Science of Networks: The New Science of Networks by Albert-Laszlo Barabasi','Science Line',2014,451,7,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Science Autonomy and Space Science: Application to the ExoMars Mission','Science Line',2012,174,1,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Creative Expression of Science through Poetry and Other Media can Enrich Medical and Science Education','Science Line',2009,367,9,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('RETHINKING Science Communication Education and Training: Towards a Competence Model for Science Communication','Science Line',2004,169,7,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Citizen Science Practices for Computational Social Science Research: The Conceptualization of Pop-Up Experiments','Science Line',2022,331,9,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Is Political Science an Art or Science?','Science Line',2006,447,6,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Forensic Science in Criminology: A Widely Respected and Highly Specialized Field of Science','Science Line',2017,175,1,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Science fiction has less to do with science and more to do with an endless reworking of the human condition','Science Line',2002,458,1,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('The Impact of Science Capital on Self-Concept in Science: A Study of University Students in New Zealand','Science Line',2018,225,6,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Social Science And Natural Science','Science Line',2007,407,5,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Is Science for Everyone? Exploring Intersectional Inequalities in Connecting With Science','Science Line',2009,491,4,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Emory-Tibet Science Initiative: Changes in Monastic Science Learning Motivation and Engagement During a Six-Year Curriculum','Science Line',2011,312,5,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Emotion Science in the Twenty-First Century. Time, Sex, and Behavior in Emotion Science: Over and Above','Science Line',2007,425,8,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Acknowledging and Supplanting White Supremacy Culture in Science Communication and STEM: The Role of Science Communication Trainers','Science Line',2003,133,4,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Science Journalism, Value Judgments, and the Open Science Movement','Science Line',2013,36,3,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Changes in United States Latino/a High School Students Science Motivational Beliefs','Science Line',2020,360,3,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Perspectives on Gender in Science, Technology, and Innovation','Science Line',2021,363,2,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Conversion and Departure Between Science and Social Science','Science Line',2003,445,1,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Science of adaptation to climate change and science for adaptation','Science Line',2005,467,2,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Thomas Kuhn: Pre-Science and Normal Science Periods','Science Line',2000,44,10,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Science and Pseudoscience From Ben Goldacre’s Bad Science','Science Line',2018,234,3,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('A Review of Microsoft Academic Services for Science of Science Studies','Science Line',2012,54,9,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Audiovisual Science Communication on TV and YouTube. How Recipients Understand and Evaluate Science Videos','Science Line',2003,329,3,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Importance Of Science About Carl Sagan "Science And Hope"','Science Line',2013,160,4,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Development Studies and Cross-Disciplinarity: Research at the Social Science-Physical Science Interface','Science Line',2016,285,2,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Everything Is Science: A Free City-Wide Science Festival','Science Line',2012,122,3,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('(When) Is Science Reporting Ethical? The Case for Recognizing Shared Epistemic Responsibility in Science Journalism','Science Line',2021,105,9,'GS');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Translational Science Education Through Citizen Science','Science Line',2014,289,5,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('The Relationship Between Attitude Toward Science and Academic Achievement in Science: A Three-Level Meta-Analysis','Science Line',2012,311,6,'SC');
-- insert into articles(article_name,journal_name,pub_year,citation,author_id,platform_code)VALUES('Identifying Economics’ Place Amongst Academic Disciplines: A Science or a Social Science','Science Line',2002,490,7,'SC');

select * from platform;
commit