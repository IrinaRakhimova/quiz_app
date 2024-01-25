import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as questionsController from "./controllers/questionsController.js";
import * as questionController from "./controllers/questionController.js";
import * as quizController from "./controllers/quizController.js";
import * as quizApi from "../routes/apis/quizApi.js";

const router = new Router();

router.get("/", mainController.showCounts);

router.get("/topics/:id", questionsController.showQuestionsPage);
router.post("/topics/:id", questionsController.addQuestion);

router.post("/topics/:id/delete", topicsController.deleteTopic);

router.get("/topics", topicsController.showTopicsPage);
router.post("/topics", topicsController.addTopic);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/topics/:id/questions/:id", questionController.showQuestionPage);
router.post("/topics/:id/questions/:id/options", questionController.addOption);
router.post("/topics/:id/questions/:id/options/:id/delete", questionController.deleteOption);


router.post("/topics/:id/questions/:id/delete", questionController.deleteQuestion);

router.get("/quiz", quizController.showTopicsPage);

router.get("/quiz/:id", quizController.chooseQuestion);

router.get("/quiz/:id/questions/:id", quizController.showRandomQuestion);
router.post("/quiz/:id/questions/:id/options/:id", quizController.addAnswer);

router.get("/quiz/:id/questions/:id/correct", quizController.showCorrectPage);
router.get("/quiz/:id/questions/:id/incorrect", quizController.showIncorrectPage);

router.get("/api/questions/random", quizApi.randomQuestion);
router.post("/api/questions/answer", quizApi.answerQuestion);

export { router };
 