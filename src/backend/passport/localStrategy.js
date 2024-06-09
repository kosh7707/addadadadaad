const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require(process.cwd() + '/database');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'user_id',
        passwordField: 'user_pw',
        passReqToCallback: false,
    }, async (user_id, user_pw, done) => {
        try {
            const result = await db.query(`select * from accounts where user_id = $1`, [user_id]);
            if (result.rows.length === 1) {
                const user = result.rows[0];
                const comp = bcrypt.compare(user_pw, user.user_pw);
                if (comp) {
                    done(null, user);
                } else {
                    done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
                }
            } else {
                done(null, false, {message: '가입되지 않은 회원입니다.'});
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    }))
};