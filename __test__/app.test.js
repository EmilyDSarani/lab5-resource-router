//should probably write each of these tests first
//beforeEach, and afterAll- deletes and creates fresh store folders. This is so when we do our getAll, we are getting the EXACT number of items we expect instead of a ton of different things that were created. 
//this is like the setup crew
const request = require('supertest');
const { rm, mkdir } = require('fs/promises');
const app = require('../lib/app');
// const SimpleDb = require('../lib/simple-db');


const rootDir = `${__dirname}/store`;

describe('singer CRUD API', () => {
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });

  afterAll(() => { 
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });

  it('POST creating the new singer and returning it', async () => {

    const singer = { name: 'Brandon Urie', age: 34, genre: 'pop punk' };
    const res = await request(app).post('/singers').send(singer);

    expect(res.body).toEqual({ ...singer, id: expect.any(String) });
  });
});
