export const containsLetter = (chars: string) => /[a-zA-Z]/g.test(chars);

export const containsNumber = (chars: string) => /\d/g.test(chars);

export const containsSpecialCharacter = (chars: string) =>
  /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/g.test(chars);
