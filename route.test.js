process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('./app');
const items = require('./fakeDb');

let item = {name: 'MasterSword', price: 500}

beforeEach(async () => {
    items.push(item)
});

afterEach(async () => {
    items = []
});

describe('GET /items', async () => {
    test('Return list of all items', async () => {
        const res = await request(app).get('/items');
        const { items } = res.body;
        expect(res.statusCode).toBe(200);
    })
});

describe('GET /items/:name', async () => {
    test('Get an item', async () => {
        const res = await request(app).get(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual(item);
    });
});

describe('POST to /items', async () => {
    test('Create new item', async () => {
        const res = await request(app).post('/items').send({
            name: 'Kite', price: 12
        });
        expect(res.statusCode).toBe(200);
    });
});

describe('PATCH /items/:name', async () => {
    test('Update an Item', async () => {
        const res = await request(app).patch(`/items/${item.name}`)
        .send({name: 'Boat'});
        expect(res.statusCode).toBe(200);
        expect(res.body.item).toEqual({name: 'Boat'});
    });
});

describe('DELETE /items/:name', async () => {
    test('Delete an item from items', async () => {
        const res =  await request(app).delete(`/items/${item.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: 'Deleted'});
    });
});