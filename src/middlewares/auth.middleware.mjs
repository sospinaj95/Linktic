import env from '../env.mjs';

export async function AuthMiddleware (req, res, next) {
    const keyAuth = req.headers['authorization'];
    if (!keyAuth) {
        return res.status(401).send({code: 0, message: 'Autorización requerida'});
    }
    if (keyAuth !== env.keyAuth) {
        return res.status(403).send({code: 0, message: 'No autorizado'});
    }
    next();
}
