import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const getData = async (request) => {
  const data = {
    error: "",
  };

  return data;
};

const processLogin = async ({ request, response, state, render }) => {
  const data = await getData(request);
  
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await userService.findUserByEmail(
    params.get("email"),
  );
  if (userFromDatabase.length != 1) {
    data.error = "Wrong email or password.";
    render("login.eta", data);
    response.redirect("/auth/login");
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    data.error = "Wrong email or password.";
    render("login.eta", data);
    return;
  }

  await state.session.set("user", user);
  response.redirect("/topics");
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};

export { processLogin, showLoginForm };