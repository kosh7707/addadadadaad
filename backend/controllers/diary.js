const db = require(process.cwd() + '/database');

exports.writeDiary = async(req, res, next) => {
    const { user_id, date, emoji, title, content } = req.body;
    try {
        const result = await db.query(`select * from accounts where user_id = $1`, [user_id]);
        if (result.rows.length === 1) {
            const user = result.rows[0];
            await db.query(`insert into diary(user_account_id, emoji, title, content) values ($1, $2, $3, $4)`
                , [user.id, emoji, title, content]);
            return res.status(200).json({message: `다이어리 작성 성공`});
        }
        else return res.status(400).json({message: `다이어리 작성 실패`});
    } catch (err) {
        console.error(err);
        return next(err);
    }
}

exports.getDiary = async(req, res, next) => {
    const { user_id, year, month } = req.body;
    try {
        const result = await db.query(`SELECT * FROM accounts WHERE user_id = $1`, [user_id]);
        if (result.rows.length === 1) {
            const user_account_id = result.rows[0].id;
            const query = `
            SELECT d.id                        AS diary_id,
                   TO_CHAR(d.date, 'MM/DD/YY') AS date,
                   d.emoji,
                   d.title,
                   d.content
            FROM diary d
            WHERE d.user_account_id = $1
              AND EXTRACT(YEAR FROM d.date) = $2
              AND EXTRACT(MONTH FROM d.date) = $3;
        `;
            const { rows } = await db.query(query, [user_account_id, year, month]);
            return res.status(200).json({
                message: "조회 성공",
                value: rows
            });
        }
        else return res.status(400).json({ message: "다이어리 조회 실패" });
    } catch (err) {
        console.error(err);
        return next(err);
    }
}