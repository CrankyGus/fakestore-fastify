// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export function validateEmail(email: string): Promise<boolean> {
  return new Promise((resolve) => {
    resolve(expression.test(email));
  });
} 

