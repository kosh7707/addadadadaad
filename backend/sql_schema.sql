drop table if exists accounts cascade;
create table accounts (
    account_id      serial primary key,
    user_id         varchar(20) unique    not null,
    user_pw         varchar(255)          not null,
    created_date    timestamp default current_timestamp,
    last_login      timestamp default current_timestamp
);

drop table if exists follow cascade;
create table follow (
    follower_id int references accounts(account_id),
    followee_id int references accounts(account_id),
    primary key (follower_id, followee_id)
);


