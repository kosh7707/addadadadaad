const db = require(process.cwd() + '/database');

exports.follow = async(req, res, next) => {
    const { followee_id } = req.body;
    try {
        const result = await db.query(`select * from accounts where user_id = $1`, [followee_id]);
        if (result.rows.length === 1) {
            const followee_account_id = result.rows[0].account_id;
            const follower_account_id = req.user.account_id;
            if (follower_account_id === followee_account_id) {
                return res.status(400).json({ message: `같은 아이디 팔로우 불가` });
            }
            await db.query(`insert into follow(follower_id, followee_id) values ($1, $2) on conflict (follower_id, followee_id) DO NOTHING`, [follower_account_id, followee_account_id]);
            return res.status(200).json({ message: `팔로우 성공` });
        }
        else return res.status(400).json({ message: `팔로우 실패` });
    } catch (err) {
        console.error(err);
        return next(err);
    }
};

exports.unfollow = async (req, res, next) => {
    const { followee_id } = req.body;
    try {
        const result = await db.query(`SELECT * FROM accounts WHERE user_id = $1`, [followee_id]);
        if (result.rows.length === 1) {
            const followee_account_id = result.rows[0].account_id;
            const follower_account_id = req.user.account_id;

            await db.query(`DELETE FROM follow WHERE follower_id = $1 AND followee_id = $2`, [follower_account_id, followee_account_id]);

            return res.status(200).json({ message: `언팔로우 성공` });
        }
        else return res.status(400).json({ message: `언팔로우 실패` });
    } catch (err) {
        console.error(err);
        return next(err);
    }
};