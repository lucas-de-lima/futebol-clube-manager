import * as sinon from "sinon";
import * as chai from "chai";
import * as jwt from "jsonwebtoken";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

import { Model } from "sequelize";

chai.use(chaiHttp);

const { expect } = chai;

const mockMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      id: 16,
      teamName: "São Paulo",
    },
    awayTeam: {
      id: 8,
      teamName: "Grêmio",
    },
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      id: 9,
      teamName: "Internacional",
    },
    awayTeam: {
      id: 14,
      teamName: "Santos",
    },
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      id: 4,
      teamName: "Corinthians",
    },
    awayTeam: {
      id: 11,
      teamName: "Napoli-SC",
    },
  },
];

const matchesMockTrue = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: true,
    homeTeam: {
      id: 16,
      teamName: "São Paulo",
    },
    awayTeam: {
      id: 8,
      teamName: "Grêmio",
    },
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: true,
    homeTeam: {
      id: 9,
      teamName: "Internacional",
    },
    awayTeam: {
      id: 14,
      teamName: "Santos",
    },
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      id: 4,
      teamName: "Corinthians",
    },
    awayTeam: {
      id: 11,
      teamName: "Napoli-SC",
    },
  },
];

const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sImlhdCI6MTY4MzU1NDI3MywiZXhwIjoxNjg0MTU5MDczfQ.0cYBEnAPk4iSf0DMqtu-_wEERmUSppQjQiLj533jxuw";

describe("Teste da rota de Matches", () => {
  afterEach(sinon.restore);

  it("A requisição deve retornar todos as partidas", async () => {
    sinon.stub(Model, "findAll").resolves(mockMatches as any);
    const { status, body } = await chai.request(app).get("/matches");
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(mockMatches);
  });

  it("A requisição deve retornar as partidas pela query inProgress:true", async () => {
    sinon.stub(Model, "findAll").resolves(matchesMockTrue as any);
    const { status, body } = await chai
      .request(app)
      .get("/matches")
      .query({ inProgress: true });
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesMockTrue);
  });

  it("A requisição deve atualizar uma partida pelo id", async () => {
    const update = {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: true,
      homeTeam: { id: 16, teamName: 'São Paulo' },
      awayTeam: { id: 8, teamName: 'Grêmio' }
    }
    const secret = "jwt_secret";
    const fakeVerify = sinon.fake.returns({
      "email": "user@user.com",
      "password": "secret_user"
    });
    sinon.stub(jwt, 'verify').callsFake(fakeVerify);
    jwt.verify(mockToken, secret);
    sinon.assert.calledOnce(fakeVerify);
    sinon.assert.calledWith(fakeVerify, mockToken, secret);

    sinon.stub(Model, "update").resolves(update as any);
    sinon.stub(Model, "findByPk").resolves(matchesMockTrue[0] as any);

    const { status, body } = await chai
      .request(app)
      .patch("/matches/1")
      .set("Authorization", mockToken)
      .send({
        homeTeamGoals: 1,
        awayTeamGoals: 1,
      });

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(update);
  });
});
