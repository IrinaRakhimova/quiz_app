import * as questionsService from "../../services/questionsService.js";
import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

const getData = async (request) => {
  
 const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const topicId = urlParts[2];
  const questionId = urlParts[4];

  const body = request.body({ type: "form" });
  const params = await body.value;

    const data = {
      option_text: params.get("option_text"),
      is_correct: params.get("is_correct"),   
      topic: { id: topicId },
      question: { id: questionId, text: await questionsService.findQuestion(questionId) },
      options: await questionsService.findOptions(questionId),
      errors: {}, 
    };

   
    return data;    
};

const optionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
   };

const showQuestionPage = async ({ render, request }) => {
    const data = await getData(request);
    
    render("question.eta", data);
}; 

const addOption = async ({ request, response, render, user }) => {

    const data = await getData(request);
  
    const [passes, errors] = await validasaur.validate(
      data,
      optionValidationRules,
    );
  
    if (!passes) {
      data.validationErrors = errors;
      
      render("question.eta", data);
    } else {

        const correct = async () => {
            const data = await getData(request);
            const isCorrect = data.is_correct;

            return isCorrect === "on" || !!isCorrect;
        };
        const isCorrect = await correct();
        await questionsService.addOption(
        data.question.id,
        data.option_text,
        isCorrect,
      );
  
      response.redirect(`/topics/${data.topic.id}/questions/${data.question.id}`);
    }
  }; 
  
  const deleteOption = async ({ request, response, user }) => {
    const data = await getData(request);

    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await questionsService.deleteOption(urlParts[6]);
  
    response.redirect(`/topics/${data.topic.id}/questions/${data.question.id}`);
  };

  const deleteQuestion = async ({ request, response, user }) => {
    const data = await getData(request);

    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await questionsService.deleteQuestion(urlParts[4]);
    console.log(urlParts[4]);
  
    response.redirect(`/topics/${data.topic.id}`);
  };

  export {  showQuestionPage, addOption, deleteOption, deleteQuestion };