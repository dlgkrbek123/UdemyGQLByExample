import knex from 'knex';

export const connection = knex({
  client: 'better-sqlite3',
  connection: {
    filename: './data/db.sqlite3',
  },
  useNullAsDefault: true,
});

// N + 1 문제 (서버 이슈)
// jobs가 5개의 row를 내려주는 경우
// db에 5 + 1의 요청을 보내게 된다.
// 왜냐하면 Job이 연관된 company를 필드 리졸버에서 호출
connection.on('query', ({ sql, bindings }) => {
  const query = connection.raw(sql, bindings).toQuery();
  console.log('[db]', query);
});
