const db = require(process.cwd() + '/database');

exports.follow = async(req, res, next) => {
    const { followee_id } = req.body;
    try {
        const result = await db.query(`select * from accounts where user_id = $1`, [followee_id]);
        if (result.rows.length === 1) {
            const followee_account_id = result.rows[0].id;
            const follower_account_id = req.user.id;
            if (follower_account_id === followee_account_id) {
                return res.status(400).json({ message: `같은 아이디 팔로우 불가` });
            }
            await db.query(`insert into follow(follower_account_id, followee_account_id) 
                            values ($1, $2) 
                            on conflict (follower_account_id, followee_account_id) DO NOTHING`
                            , [follower_account_id, followee_account_id]);
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
            const followee_account_id = result.rows[0].id;
            const follower_account_id = req.user.id;

            await db.query(`DELETE FROM follow 
                            WHERE follower_account_id = $1 
                              AND followee_account_id = $2`
                            , [follower_account_id, followee_account_id]);

            return res.status(200).json({ message: `언팔로우 성공` });
        }
        else return res.status(400).json({ message: `언팔로우 실패` });
    } catch (err) {
        console.error(err);
        return next(err);
    }
};

exports.getFollowerList = async (req, res, next) => {
    const { user_id } = req.body;
    try {
        const result = await db.query(`select * from accounts where user_id = $1`, [user_id]);
        if (result.rows.length === 1) {
            const user_account_id = result.rows[0].id;
            const follow_result = await db.query(`select followee_account_id from follow where follower_account_id = $1`, [user_account_id]);
            const followee_ids = follow_result.rows.map(row => row.followee_account_id);
            if (followee_ids.length > 0) {
                const { rows } = await db.query(`select user_id, description from accounts where id = any($1::int[])`, [followee_ids]);
                return res.status(200).json({
                    code: 200,
                    message: "성공",
                    value: rows
                });
            }
            else return res.status(200).json({
                code: 200,
                message: "성공",
                value: []
            });
        }
        else return res.status(400).json({ message: `팔로워 조회 실패` });
    } catch (err) {
        console.error(err);
        return next(err);
    }
}

exports.getFollowingList = async (req, res, next) => {
    const { user_id } = req.body;
    try {
        const result = await db.query(`select * from accounts where user_id = $1`, [user_id]);
        if (result.rows.length === 1) {
            const user_account_id = result.rows[0].id;
            const follow_result = await db.query(`select follower_account_id from follow where followee_account_id = $1`, [user_account_id]);
            const follower_ids = follow_result.rows.map(row => row.follower_account_id);
            if (follower_ids.length > 0) {
                const { rows } = await db.query(`select user_id, description from accounts where id = any($1::int[])`, [follower_ids]);
                return res.status(200).json({
                    code: 200,
                    message: "성공",
                    value: rows
                });
            }
            else return res.status(200).json({
                code: 200,
                message: "성공",
                value: []
            });
        }
        else return res.status(400).json({ message: `팔로잉 조회 실패` });
    } catch (err) {
        console.error(err);
        return next(err);
    }
}