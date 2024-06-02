-- root 유저 생성 쿼리
create user asdf1234 with encrypted password 'root';
alter user asdf1234 with superuser;
alter user asdf1234 with createdb;
alter user asdf1234 with createrole;
alter user asdf1234 with replication;
alter user asdf1234 with bypassrls;
-- create tablespace ts_databasetermproject owner asdf1234 location 'C:\Program Files\PostgreSQL\15\data\';
-- create database databasetermproject owner asdf1234 tablespace ts_databasetermproject;
create database databasetermproject owner asdf1234;