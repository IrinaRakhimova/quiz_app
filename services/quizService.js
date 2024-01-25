import { sql } from "../database/database.js";


const randomQuestion = async (topicId) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topicId} ORDER BY RANDOM() LIMIT 1`;
  
    return rows;
  }; 

 const answerOptions = async (questionId) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
  
    return rows;
 } ;

 const addAnswer = async (userId, questionId, optionId) => {
    await sql`INSERT INTO question_answers
        (user_id, question_id, question_answer_option_id)
          VALUES (${userId}, ${questionId}, ${optionId})`;
  };

  const isCorrect = async (id) => {
    const result = await sql`SELECT * FROM question_answer_options WHERE id = ${id}`; 
    return result[0].is_correct;
  };

  const isCorrectText = async (questionId) => {
    const result = await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId} AND is_correct = ${true}`; 
    return result[0].option_text;
  };

export { randomQuestion, answerOptions, addAnswer, isCorrect, isCorrectText };