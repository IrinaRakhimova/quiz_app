import { sql } from "../database/database.js";

const findQuestionsById = async (id) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${id}`;
  
    return rows;
  };

  const addQuestions = async (userId, topicId, questionText) => {
    await sql`INSERT INTO questions
        (user_id, topic_id, question_text)
          VALUES (${userId}, ${topicId}, ${questionText})`;
  };

  const findQuestion = async (questionId) => {
    const result = await sql`SELECT * FROM questions WHERE id = ${questionId}`;
    return result[0].question_text;
  };

  const findOptions = async (questionId) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
  
    return rows;
  };

  const addOption = async (questionId, optionText, isCorrect) => {
    await sql`INSERT INTO question_answer_options
        (question_id, option_text, is_correct)
          VALUES (${questionId}, ${optionText}, ${isCorrect})`;
  };

  const deleteQuestion = async (questionId) => {
    await sql`DELETE FROM questions WHERE id = ${questionId}`;
  };

  const deleteOption = async (optionId) => {
    await sql`DELETE FROM question_answer_options WHERE id = ${optionId}`;
    await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${optionId}`;
  };


export { findQuestionsById, addQuestions, findQuestion, findOptions, addOption, deleteOption, deleteQuestion };