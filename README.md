# cloud-computing-term-project

- `DB`: postgreSQL 15.5

- /app.js 에서 user/password 수정 필요

- server port: 3000 / db port: 5432

- .env 추가 필요

# API 사용 방법

## 회원가입
### URL: `/auth/register`
### Method: `POST`
### Request Body: 

    {
        "user_id": "your_user_id",
        "user_pw": "your_password"
    }

## 로그인
### URL: `/auth/login`
### Method: `POST`
### Request Body:

    {
        "user_id": "your_user_id",
        "user_pw": "your_password"
    }

## 로그아웃
### URL: `/auth/logout`
### Method: `POST`