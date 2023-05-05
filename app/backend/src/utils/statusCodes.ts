interface IStatusCodes {
  ok: number;
  notFound: number;
  created: number;
  badRequest: number;
  unauthorized: number;
  unprocessableEntity: number;
  noContent: number;

}

const statusCodes: IStatusCodes = {
  ok: 200,
  notFound: 404,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  unprocessableEntity: 422,
  noContent: 204,
};

export default statusCodes;
