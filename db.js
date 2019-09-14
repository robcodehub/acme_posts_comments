const pg = require('pg');
const { Client } = pg;
const uuid = require('uuid')
const client = new Client('postgres://localhost/acme_posts_comments');
const faker = require('faker');


client.connect();

const postOneId = uuid.v4();
const postTwoId = uuid.v4();
const postThreeId = uuid.v4();

const tagOneId = uuid.v4();
const tagTwoId = uuid.v4();
const tagThreeId = uuid.v4();

const randBio = () => {
  return faker.lorem.paragraph();
};

const SQL = `
  DROP TABLE IF EXISTS tags;
  DROP TABLE IF EXISTS posts;

  CREATE TABLE posts (
    id UUID PRIMARY KEY,
    topic VARCHAR(255)
  );

  CREATE TABLE tags (
    id UUID PRIMARY KEY,
    text VARCHAR(255),
    post_id UUID REFERENCES posts(id)
  );

  INSERT INTO posts (id, topic) values ('${postOneId}','Node');
  INSERT INTO posts (id, topic) values ('${postTwoId}','Express');
  INSERT INTO posts (id, topic) values ('${postThreeId}','React');

  INSERT INTO tags (id, text, post_id) values ('${tagOneId}', 'Challenging', '${postTwoId}');
  INSERT INTO tags (id, text, post_id) values ('${tagTwoId}', 'Loved It', '${postThreeId}');
  INSERT INTO tags (id, text, post_id) values ('${tagThreeId}', 'What??', '${postThreeId}');
`


const syncAndSeed = async () =>{
  await client.query(SQL);
};


const findAllPosts = async () => {
  const response = await client.query('SELECT * FROM posts');
  return response.rows;
};

const findAllTags = async () =>{
  const response = await client.query('SELECT * FROM tags');
  return response.rows;
};

module.exports = {
  syncAndSeed,
  findAllPosts,
  findAllTags
}
