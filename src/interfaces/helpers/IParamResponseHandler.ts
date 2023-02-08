interface IParamResponseHandler {
  status?: number | string | boolean;
  message?: string | any | undefined;
  payload?: any | unknown | undefined | null;
}

export default IParamResponseHandler;
