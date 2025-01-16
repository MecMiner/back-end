const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({ valid: false });
    }

    jwt.verify(token, chaveToken, (err, decoded) => {
        if (err) {
            return res.json({ valid: false });
        }

        // Token válido
        return res.json({ valid: true });
    });
}