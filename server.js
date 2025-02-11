const Koa = require('koa');
const { koaBody } = require('koa-body');
const { faker } = require('@faker-js/faker')

const app = new Koa();

app.use(koaBody());

app.use(async (ctx) => {
  if (ctx.path === '/messages/unread' && ctx.method === 'GET') {

    const messages = Array.from({ length: Math.floor(Math.random() * 10) }, () => ({
      id: faker.string.uuid(),
      from: faker.internet.email(),
      subject: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      received: Math.floor(faker.date.past().getTime() / 1000),
    }));

    ctx.body = {
      status: 'ok',
      timestamp: Math.floor(Date.now() / 1000),
      messages,
    };
    ctx.status = 200;
  } else {
    ctx.status = 404;
    ctx.body = { status: 'error', message: 'Not Found' };
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});