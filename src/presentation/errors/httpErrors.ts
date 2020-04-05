class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);

    this.name = 'MissingParamError';
  }
}

class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`);

    this.name = 'InvalidParamError';
  }
}

export { MissingParamError, InvalidParamError };
