import {
  containsLetter,
  containsNumber,
  containsSpecialCharacter,
} from "@/lib/utils";

export const validatePassword = (password: string) => {
  let errorMessage = "";
  if (password.length < 8) {
    errorMessage = "Password must be 8 characters long";
  } else if (!containsLetter(password)) {
    errorMessage = "Password must have 1 letter";
  } else if (!containsNumber(password)) {
    errorMessage = "Password must have 1 number";
  } else if (!containsSpecialCharacter(password)) {
    errorMessage = "Password must have 1 special character";
  }

  if (errorMessage) {
    return {
      isValid: false,
      errorMessage,
    };
  }
  return {
    isValid: true,
  };
};
