import {userLogin} from '../validation/user.validation.js';
import prisma from '../utils/prisma.js';
import {compare} from '../utils/bcrypt.js';
import {generateAccessToken} from '../utils/jwt.js';

export const doLogin = async (req, res) => {
    const {error, value} = userLogin(req.body);
    if (error) {
        res.status(400).json({
            message: String(error.message)
        });
    }

    const user = await prisma.users.findUnique({
        where: {
            username: value.username
        }
    });
    try {
        if (user) {
            if (compare(value.password, user.password)) {
                user.password = 'xxxxxxxxxx';
                const accessToken = generateAccessToken({id: user.id});
                return res.status(200).json({
                    message: 'Login Success',
                    user: {
                        username: user.username,
                        role: user.role
                    },
                    accessToken
                });

            } else {
                res.status(401).json({
                    message: 'Username atau password salah.',
                });
            }
        } else {
            res.status(401).json({
                message: 'Username atau password salah.'
            });
        }
    } catch (err) {
        console.info(`Exception while doing something: ${err}`);
        return res.status(500).json({
            message: 'Internal server error.' + err,
            result: null
        });
    }
};
