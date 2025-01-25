import inquirer from "inquirer";
import { RegisterationParams } from "../types";
import { registerParamsDTO } from "../validators";
import { ValidationError } from "../../shared/errors";
import { registerService } from "../services";

inquirer.prompt([
  {
    type: "input",
    name: "firstName",
    message: "Please enter your first name: "
  },
  {
    type: "input",
    name: "lastName",
    message: "Please enter your last name: "
  },
  {
    type: "input",
    name: "email",
    message: "Please enter your email id: "
  },
  {
    type: "input",
    name: "mobileNumber",
    message: "Please enter your mobile number: "
  },
  {
    type: "password",
    name: "password",
    message: "Please enter your password: "
  },
  {
    type: "password",
    name: "confirmPassword",
    message: "Please re-enter your password: "
  },
]).then((answers) => {
  let {error, value: params } = registerParamsDTO.validate(answers, { abortEarly: false })
  
  if(error) {
    throw new ValidationError(JSON.stringify({
      'errors': error.details
    }))
  }

  params = params as RegisterationParams

  registerService(params, 'admin', false).then((user) => {
    console.log("Admin created successfully")
    console.log(JSON.stringify(user, null, 2))
  })
})