import * as questionsService from "../../services/questionsService.js";
import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

const getQuestionData = async (request) => {
  
 const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const topicId = urlParts[2];
  const body = request.body({ type: "form" });
  const params = await body.value;


    const data = {
      question_text: params.get("question_text"),
      questions: await questionsService.findQuestionsById(topicId),
      topic: { id: topicId },
      errors: {}, 
    };

   
    return data;    
};

const questionValidationRules = {
   question_text: [validasaur.required, validasaur.minLength(1)],
  };


 const showQuestionsPage = async ({ render, request }) => {

  const data = await getQuestionData(request);
  render("questions.eta", data);
  }; 


const addQuestion = async ({ request, response, render, user }) => {

    const data = await getQuestionData(request);
  
    const [passes, errors] = await validasaur.validate(
      data,
      questionValidationRules,
    );
  
    if (!passes) {
      data.validationErrors = errors;
      
      render("questions.eta", data);
    } else {

      await questionsService.addQuestions(
        user.id,
        data.topic.id,
        data.question_text,
      );
  
      response.redirect(`/topics/${data.topic.id}`);
    }
  }; 

  export { showQuestionsPage, addQuestion };