import {
  IParamResponseHandler,
  IResponseHandler,
} from "src/interfaces/interfaces";

const responseHandler = ({
  status = true,
  message = "",
  payload = null,
}: IParamResponseHandler): IResponseHandler => {
  let response: IResponseHandler = {
    status,
  };

  if (payload) {
    response.payload = payload;
  }

  if (message) {
    response.message = message;
  }

  return response;
};

export default responseHandler;
