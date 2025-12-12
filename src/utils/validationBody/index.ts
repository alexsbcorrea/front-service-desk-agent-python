export function useValidation() {
  function ValidationBody(schema: any, body: any) {
    const errors = new Array();
    const passwords = new Array();

    Object.keys(schema).forEach((item, index) => {
      //Numbers
      if (schema[item].type == "number" && schema[item].required) {
        if ((schema[item].required && !body[item]) || body[item].length == 0) {
          errors.push({
            message: "O campo " + schema[item].label + " é obrigatório.",
          });
          return;
        }
        if (
          schema[item].min &&
          !isNaN(body[item]) &&
          body[item] < schema[item].min
        ) {
          errors.push({
            message:
              "O campo " +
              schema[item].label +
              " precisa ser no mínimo " +
              schema[item].min +
              ".",
          });
          return;
        }
        if (
          schema[item].max &&
          !isNaN(body[item]) &&
          body[item] > schema[item].max
        ) {
          errors.push({
            message:
              "O campo " +
              schema[item].label +
              " pode ser no máximo " +
              schema[item].max +
              ".",
          });
          return;
        }
        if (
          body[item] &&
          schema[item].regex &&
          !new RegExp(schema[item].regex).test(body[item])
        ) {
          errors.push({
            message:
              "O campo " + schema[item].label + " está em um formato inválido.",
          });
          return;
        }
      }
      //Numbers

      //Strings
      if (schema[item].type == "string" && schema[item].required) {
        if (schema[item].required && !body[item]) {
          errors.push({
            message: "O campo " + schema[item].label + " é obrigatório.",
          });
          return;
        }
        if (
          body[item] &&
          schema[item].min &&
          body[item].length < schema[item].min
        ) {
          errors.push({
            message:
              "O campo " +
              schema[item].label +
              " precisa ter no mínimo " +
              schema[item].min +
              " dígitos.",
          });
          return;
        }
        if (
          body[item] &&
          schema[item].max &&
          body[item].length > schema[item].max
        ) {
          errors.push({
            message:
              "O campo " +
              schema[item].label +
              " pode ter no máximo " +
              schema[item].max +
              " dígitos.",
          });
          return;
        }
        if (
          body[item] &&
          body[item].length > 0 &&
          schema[item].regex &&
          !new RegExp(schema[item].regex).test(body[item])
        ) {
          errors.push({
            message:
              "O campo " + schema[item].label + " está em um formato inválido.",
          });
          return;
        }

        if (item == "password" || item == "confirmPassword") {
          passwords.push(body[item]);
        }
      }
    });

    if (passwords.length == 2 && passwords[0] != passwords[1]) {
      errors.push({
        message: "A Senha e a Confirmação de Senha não correspondem.",
      });
    }

    return errors;
  }

  return { ValidationBody };
}
