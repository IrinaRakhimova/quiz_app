import { sql } from "../database/database.js";

const findTopics = async () => {
    const rows = await sql`SELECT * FROM topics ORDER BY name DESC`;
  
    return rows;
  };

  const findAdmin = async (id) => {
    const result = await sql`SELECT admin FROM users WHERE id = ${id}`; 
    return result[0].admin;
  };

  const addTopic = async (userId, name) => {
    await sql`INSERT INTO topics
        (user_id, name)
          VALUES (${userId}, ${name})`;
  };

  const deleteTopic = async (id) => {
    await sql`DELETE FROM question_answers WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${id})`;
    await sql`DELETE FROM question_answer_options WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${id})`;
    await sql`DELETE FROM questions WHERE topic_id = ${id}`;
    await sql`DELETE FROM topics WHERE id = ${id}`; 
  };

  const findTopicById = async (topicId) => {
    const rows = await sql`SELECT * FROM topics WHERE id = ${topicId};`;
    return rows[0].name;
  };


export { findTopics, findAdmin, addTopic, deleteTopic, findTopicById };