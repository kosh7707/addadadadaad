const passport = require('passport');
const local = require('./localStrategy');
const db = require(process.cwd() + '/database');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.account_id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const result = await db.query('select * from accounts WHERE id = $1', [id]);
            if (result.rows.length === 1) {
                const user = result.rows[0];
                done(null, user);
            }
            else done(null);
        } catch (err) {
            console.error(err);
            done(err);
        }
    });

    local();
}