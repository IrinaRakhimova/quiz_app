import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const getRegistrationData = async(request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const data = {
    email: params.get("email"),
    password: params.get("password"),
    errors: {},
  };

  return data;

};

const topicValidationRules = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const registerUser = async ({ request, response, render }) => {
  const data = await getRegistrationData(request);

  const [passes, errors] = await validasaur.validate(
    data,
    topicValidationRules,
  );

  if (!passes){
    data.validationErrors = errors;
    render("registration.eta", data);
  } else {
    data.password = await bcrypt.hash(data.password); 

  await userService.addUser(
    data.email,
    data.password,
  );

  response.redirect("/auth/login");
  }
};



const showRegistrationForm = async ({ render, request }) => {
  const data = await getRegistrationData(request);
  render("registration.eta", data);
};

export { registerUser, showRegistrationForm };