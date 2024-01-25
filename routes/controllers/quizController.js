import * as topicsService from "../../services/topicsService.js";
import * as quizService from "../../services/quizService.js";
import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";


const getTopicData = async (request) => {

    const body = await request.body({ type: "form" }).value;
    const name = body.get("name");
    
    return { name, errors: {} };    
};

 const showTopicsPage = async ({ render, request, response, state }) => {
    const user = await state.session.get("user");

    if (user) {
    const { name, errors } = await getTopicData(request);

    const topics = await topicsService.findTopics();
    
    render("quiz.eta", { data: { name, errors }, topics });
    } else {
        response.redirect("/auth/login");
    };
  }; 

  
const chooseQuestion = async ({ request, render, response }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const topicId = urlParts[2];

    const questions = await quizService.randomQuestion(topicId);

    if (questions.length > 0) {
        const question  = questions[0];
        
        response.redirect(`/quiz/${topicId}/questions/${question.id}`);
        
    } else {
        render("noQuestions.eta");
    }
};

const showRandomQuestion = async ({ render, request }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const topicId = urlParts[2];

    const questions = await quizService.randomQuestion(topicId);
    

    if (questions.length > 0) {
        const question  = questions[0];
        const questionText = question.question_text;
        const options = await quizService.answerOptions(question.id);
    
    render("randomQuestion.eta", { questionText, options, question, topicId });
    } 
  }; 

const addAnswer = async ({  response, request, state }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const topicId = urlParts[2];
    const questionId = urlParts[4];
    const optionId = urlParts[6];
    const user = await state.session.get("user");
    const answer = await quizService.isCorrect(optionId);

    await quizService.addAnswer(
        user.id,
        questionId,
        optionId,
      );
      if (answer === true) {
        response.redirect(`/quiz/${topicId}/questions/${questionId}/correct`);
    } else {
        response.redirect(`/quiz/${topicId}/questions/${questionId}/incorrect`);
    }
};

const showCorrectPage = async ({ render, request }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const topicId = urlParts[2];
    render("correct.eta", { topicId});
}; 
  
const showIncorrectPage = async ({ render, request }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const topicId = urlParts[2];
    const questionId = urlParts[4];
    const rightOption = await quizService.isCorrectText(questionId);
  
    render("incorrect.eta", { topicId, rightOption });
}; 

  export { showTopicsPage, chooseQuestion, showRandomQuestion, addAnswer, showCorrectPage, showIncorrectPage };