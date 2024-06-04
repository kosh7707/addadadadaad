drop table if exists accounts cascade;
create table accounts (
    id              serial primary key,
    user_id         varchar(20) unique    not null,
    user_pw         varchar(255)          not null,
    description     text,
    created_date    timestamp default current_timestamp,
    last_login      timestamp default current_timestamp
);

drop table if exists diary cascade;
create table diary (
    id              serial primary key,
    user_account_id int references accounts(id),
    date            timestamp default current_timestamp,
    emoji           varchar(20),
    title           varchar(255),
    content         text
);

drop table if exists follow cascade;
create table follow (
    follower_account_id int references accounts(id),
    followee_account_id int references accounts(id),
    primary key (follower_account_id, followee_account_id)
);


