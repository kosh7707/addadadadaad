const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require(process.cwd() + '/database');

exports.register = async (req, res, next) => {
    const {user_id, user_pw} = req.body;
    try {
        const result = await db.query(`select * from accounts where user_id=$1`, [user_id]);
        if (result.rows.length === 0) {
            const hash = await bcrypt.hash(user_pw, 12);
            await db.query(`insert into accounts(user_id, user_pw) values ($1, $2)`, [user_id, hash]);
            return res.status(200).json({ message: `회원가입 성공` });
        }
        else return res.status(400).json({ message: `유저 아이디 중복` });
    } catch (err) {
        console.error(err);
        return next(err);
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (authErr, user) => {
        if (authErr) {
            console.error(authErr);
            return next(authErr);
        }
        if (!user) {
            return res.status(401).redirect('/auth/login');
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            await db.query(`update accounts set last_login = current_timestamp where account_id = $1`, [user.account_id]);
            return res.status(200).json({ message: `로그인 성공` });
        });
    }) (req, res, next);
};

exports.logout = (req, res) => {
    req.logout(() => {
        return res.status(200).json({ message: `로그아웃 성공` });
    });
};