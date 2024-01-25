import { sql } from "../database/database.js";

const countTopics = async () => {
    const result = await sql`SELECT COUNT(*) AS count FROM topics;`;
    const count = result[0]?.count || 0;
    return count;
  };

  const countQuestions = async () => {
    const result = await sql`SELECT COUNT(*) AS count FROM questions;`;
    const count = result[0]?.count || 0;
    return count;
  };

  const countAnswers = async () => {
    const result = await sql`SELECT COUNT(*) AS count FROM question_answers;`;
    const count = result[0]?.count || 0;
    return count;
  };

export { countTopics, countQuestions, countAnswers };