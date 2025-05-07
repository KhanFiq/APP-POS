import request from 'supertest'
import {app} from '../src/app.js'

describe('User Test', () => {
    it('should be a valid user login success', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({
                username: 'alice',
                password: 'password'
            })
        expect(res.status).toBe(200)
    });

    it('should be an invalid user login success', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({
                username: 'alice',
                password: 'wrong password'
            })
        expect(res.status).toBe(404)
    });
});
