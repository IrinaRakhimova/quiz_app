import * as mainService from "../../services/mainService.js";

const showCounts = async ({ render }) => {

  render("main.eta", {
    topicsCount: await mainService.countTopics(),
    answersCount: await mainService.countAnswers(),
    questionsCount: await mainService.countQuestions(),
  });
};

export { showCounts };
