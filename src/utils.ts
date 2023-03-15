import evaluate from '@emmetio/math-expression';
import { Variable } from './types';

export const calculate = (expression: string, variables: Variable[]) => {
  if (!expression) return null;
  try {

    let parsedExpression = expression.toLowerCase();
    for (const variable of variables) {
      const placeholders = [
        `{${variable.name}}`,
        `{${variable.name} }`,
        `{ ${variable.name}}`,
        `{ ${variable.name} }`,
      ];

      for (const placeholder of placeholders) {
        if (parsedExpression.includes(placeholder)) {
          parsedExpression = parsedExpression.replace(placeholder, String(variable.value));
        }
      }
    }
    //console.log({parsedExpression});

    return evaluate(parsedExpression);
  } catch (error) {
    //console.log(error);
    return null;
  }
}
