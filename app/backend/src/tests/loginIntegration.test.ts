import * as sinon from "sinon";
import * as chai from "chai";
import * as jwt from "jsonwebtoken";

// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import Example from "../database/models/ExampleModel";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sImlhdCI6MTY4MzU1NDI3MywiZXhwIjoxNjg0MTU5MDczfQ.0cYBEnAPk4iSf0DMqtu-_wEERmUSppQjQiLj533jxuw";

describe("Teste da rota de Login", () => {
  afterEach(sinon.restore);

  it("Se não existir o campo e-mail deve falhar", async () => {
    const { status, body } = await chai
      .request(app)
      .post("/login")
      .send({ password: "secret_admin" });
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: "Invalid email or password" });
  });

  it("Se o campo e-mail for inválido deve falhar", async () => {
    const { status, body } = await chai
      .request(app)
      .post("/login")
      .send({ password: "secret_admin", email: "userInvalid@user.com" });
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: "Invalid email or password" });
  });

  it("Se o campo password for inválido deve falhar", async () => {
    const { status, body } = await chai
      .request(app)
      .post("/login")
      .send({ password: "invalid_password", email: "user@user.com" });
    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: "Invalid email or password" });
  });

  it("Deve retornar o token de acesso se os dados de login estiverem corretos", async () => {
    const fakeUser = { email: "user@user.com", password: "secret_user" };
    const secret = "jwt_secret";
    const token = jwt.sign(fakeUser, secret);
  
    const fakeVerify = sinon.fake.returns(mockToken);

    
    sinon.stub(jwt, "sign").callsFake(fakeVerify);
    jwt.verify(token, secret);
  
    const { status, body } = await chai
      .request(app)
      .post("/login")
      .send({ email: fakeUser.email, password: fakeUser.password });
  
    expect(status).to.be.equal(200);
    expect(body).to.have.property("token").that.is.a("string");
  
  });
  

  it('Se não existir token ao acessar a rota "/login/role"', async () => {
    const {status, body} = await chai.request(app).get('/login/role')
    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ "message": "Token not found" })
  });
});
