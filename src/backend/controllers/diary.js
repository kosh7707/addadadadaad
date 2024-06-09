const db = require(process.cwd() + '/database');

exports.writeDiary = async(req, res, next) => {
    const { user_id, date, emoji, title, content } = req.body;
    const [ month, day, year ] = date.split('/');
    const save_date = 20 + year + "-" + month + "-" + day;
    try {
        const result = await db.query(`select * from accounts where user_id = $1`, [user_id]);
        if (result.rows.length === 1) {
            const user_account_id = result.rows[0].id;

            await db.query(`insert into diary(user_account_id, date, emoji, title, content) 
                            values ($1, $2, $3, $4, $5)
                            on conflict (user_account_id, date)
                            do update set emoji = excluded.emoji, title = excluded.title, content = excluded.content`,
                            [user_account_id, save_date, emoji, title, content]);

            const query = `select id as diary_id, TO_CHAR(date, 'MM/DD/YY') AS date, emoji, title, content
                                  from diary 
                                  where user_account_id = $1
                                    and date = $2`;
            const { rows } = await db.query(query, [user_account_id, save_date]);

            return res.status(200).json({
                message: `다이어리 작성 성공`,
                values: rows
            });
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
            const query = `select id as diary_id, TO_CHAR(date, 'MM/DD/YY') AS date, emoji, title, content
                                  from diary 
                                  where user_account_id = $1
                                    and extract(year from date) = $2
                                    and extract(month from date) = $3`;
            const { rows } = await db.query(query, [user_account_id, year, month]);
            return res.status(200).json({
                message: "다이어리 조회 성공",
                value: rows
            });
        }
        else return res.status(400).json({ message: "다이어리 조회 실패" });
    } catch (err) {
        console.error(err);
        return next(err);
    }
}