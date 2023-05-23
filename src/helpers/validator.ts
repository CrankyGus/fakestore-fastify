/* eslint-disable @typescript-eslint/no-inferrable-types */
const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PasswordRegex:RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+\-=|]).{8,32}$/;


export function validateEmail(email: string): Promise<boolean> {
  return new Promise((resolve) => {
    resolve(expression.test(email));
  });
}


export function validatePassword(password: string): Promise<boolean> {
  return new Promise((resolve) => {
    resolve(PasswordRegex.test(password));
  })
}