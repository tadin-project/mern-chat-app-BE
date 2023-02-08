export interface IError {
  status: number;
  fields: {
    name: {
      message: string;
    };
  };
  message: string;
  name: string;
}

class ErrorHandler extends Error implements IError {
  public status = 500;

  public success = false;

  public fields: { name: { message: string } };

  constructor(msg: string, statusCode: number, name: string = "ErrorHandler") {
    super();
    this.message = msg;
    this.status = statusCode;
    this.name = name;
    this.fields = {
      name: { message: msg },
    };
  }
}

export default ErrorHandler;
