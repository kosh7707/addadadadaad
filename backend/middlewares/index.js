exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.status(403).json({ message: `로그인이 필요합니다.` });
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        return res.status(403).json({ message: `이미 로그인되어 있습니다.` });
    }
};

