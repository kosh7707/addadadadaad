# cloud-computing-term-project

- `DB`: postgreSQL 15.5

- /database/index.js 에서 user/password 수정 필요

- server port: 3000 / db port: 5432

- .env 추가 필요

# API 사용 방법

## 회원가입
- **URL: `/auth/register`**
- **Method: `POST`**
- **Request Body:** 
```json
    {
        "user_id": "your_user_id",
        "user_pw": "your_password"
    }
```
- **Response**
```json
// 회원가입 성공 시
code: 200
    {
        "message": "회원가입 성공" 
    }
        
// 회원가입 실패 시
code: 400
    {
        "message": "유저 아이디 중복"
    }
```

## 로그인
### URL: `/auth/login`
### Method: `POST`
### Request Body:
    {
        "user_id": "your_user_id",
        "user_pw": "your_password"
    }
- **Response**
```json
// 로그인 성공 시
code: 200
    {
        "message": "로그인 성공" 
    }
```

## 로그아웃
### URL: `/auth/logout`
### Method: `GET`
- **Response**
```json
// 로그아웃 성공 시
code: 200
    {
        "message": "로그아웃 성공" 
    }
```

## 팔로우
### URL: `/follow/follow`
- **Method: `POST`**
- **Request Body:**
```json
    {
        "followee_id": "followee_id",
    }
```
- **Response**
```json
// 팔로우 성공 시
code: 200
    {
        "message": "팔로우 성공"
    }

// 팔로우 실패 시
code: 400
    {
        "message": "팔로우 실패"   
    }
code: 400
    {
        "message": "같은 아이디 팔로우 불가"
    }
```

## 언팔로우
### URL: `/follow/unfollow`
- **Method: `POST`**
- **Request Body:**
```json
    {
        "followee_id": "followee_id",
    }
```
- **Response**
```json
// 언팔로우 성공 시
code: 200
    {
        "message": "언팔로우 성공"
    }

// 언팔로우 실패 시
code: 400
    {
        "message": "언팔로우 실패"   
    }
```
