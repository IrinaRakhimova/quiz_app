import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

const getTopicData = async (request) => {

    const body = await request.body({ type: "form" }).value;
    const name = body.get("name");
    
    return { name, errors: {} };    
};

const topicValidationRules = {
    name: [validasaur.required],
  };


 const showTopicsPage = async ({ render, state, request }) => {
    const { name, errors } = await getTopicData(request);

    const user = await state.session.get("user");

    const topics = await topicsService.findTopics();
    const admin = await topicsService.findAdmin(user.id);
    
    render("topics.eta", { data: { name, errors }, topics, admin });
  }; 


const addTopic = async ({ request, response, render, user }) => {
    const admin = await topicsService.findAdmin(user.id);

    if (admin) {

    const { name } = await getTopicData(request);
  
    const [passes, validationErrors] = await validasaur.validate(
      { name },
      topicValidationRules,
    );
  
    if (!passes) {
      
      render("topics.eta", { data: { name, validationErrors }, topics: await topicsService.findTopics(), admin });
    } else {
      await topicsService.addTopic(
        user.id,
        name,
      );
  
      response.redirect("/topics");
    }
  } 
  };

  const deleteTopic = async ({ request, response, user }) => {
    const admin = await topicsService.findAdmin(user.id);

    if(admin) {

    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await topicsService.deleteTopic(urlParts[2]);
  
    response.redirect("/topics");
    }
  };

  export { showTopicsPage, addTopic, deleteTopic };