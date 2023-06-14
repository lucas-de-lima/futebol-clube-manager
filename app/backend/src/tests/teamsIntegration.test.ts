import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import Example from "../database/models/ExampleModel";

import { Response } from "superagent";
import { Model } from "sequelize";

chai.use(chaiHttp);

const { expect } = chai;

const mockTeams = [
  {
    id: 1,
    teamName: "Avaí/Kindermann",
  },
  {
    id: 2,
    teamName: "Bahia",
  },
  {
    id: 3,
    teamName: "Botafogo",
  },
  {
    id: 4,
    teamName: "Corinthians",
  },
  {
    id: 5,
    teamName: "Cruzeiro",
  },
  {
    id: 6,
    teamName: "Ferroviária",
  },
  {
    id: 7,
    teamName: "Flamengo",
  },
  {
    id: 8,
    teamName: "Grêmio",
  },
  {
    id: 9,
    teamName: "Internacional",
  },
  {
    id: 10,
    teamName: "Minas Brasília",
  },
  {
    id: 11,
    teamName: "Napoli-SC",
  },
  {
    id: 12,
    teamName: "Palmeiras",
  },
  {
    id: 13,
    teamName: "Real Brasília",
  },
  {
    id: 14,
    teamName: "Santos",
  },
  {
    id: 15,
    teamName: "São José-SP",
  },
  {
    id: 16,
    teamName: "São Paulo",
  },
];

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sImlhdCI6MTY4MzUwMTIzNCwiZXhwIjoxNjg0MTA2MDM0fQ.53FhTFyBJCK7XjlHyzPVYDDOMYemVoqm0ZbyeJcvYD8";

describe("Teste da rota de Team", () => {
  afterEach(sinon.restore);

  it("A requisição deve retornar todos as times", async () => {
    sinon.stub(Model, "findAll").resolves(mockTeams as any);
    const { status, body } = await chai
      .request(app)
      .get("/teams")
      .set("Authorization", token);
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(mockTeams);
  });

  it("A requisição deve retornar um time pelo id", async () => {
    sinon.stub(Model, "findByPk").resolves(mockTeams[0] as any);
    const { status, body } = await chai
      .request(app)
      .get("/teams/1")
      .set("Authorization", token);
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(mockTeams[0]);
  });

  it("A requisição não deve retornar um time com id inválido", async () => {
    sinon.stub(Model, "findByPk").resolves(null);
    const { status, body } = await chai
      .request(app)
      .get("/teams/999")
      .set("Authorization", token);
    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ message: "Team not found" });
  });
});
