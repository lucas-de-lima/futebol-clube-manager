import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota de Login', () => {
    afterEach(sinon.restore)

    it('Se não existir o campo e-mail deve falhar', async () => {
        const {status, body} = await chai.request(app).post('/login').send({password: 'secret_admin'})
        expect(status).to.be.equal(401)
        expect(body).to.be.deep.equal({ "message": "Invalid email or password" })
      });

      it('Se o campo e-mail inválido deve falhar', async () => {
        const {status, body} = await chai.request(app).post('/login').send({password: 'secret_admin', email: 'userInvalid@user.com'})
        expect(status).to.be.equal(401)
        expect(body).to.be.deep.equal({ "message": "Invalid email or password" })
      });

      it('Se o campo password inválido deve falhar', async () => {
        const {status, body} = await chai.request(app).post('/login').send({password: 'invalid_password', email: 'user@user.com'})
        expect(status).to.be.equal(401)
        expect(body).to.be.deep.equal({ "message": "Invalid email or password" })
      });

      it('Se os dados válidos deve passar', async () => {
        const {status, body} = await chai.request(app).post('/login').send({password: 'secret_user', email: 'user@user.com'})
        expect(status).to.be.equal(200)
        expect(body).to.have.property('token').that.is.a('string')
      });

      // it('testa ao enviar os dados corretos para a rota /login', async () => {
      //   const {status, body} = await chai
      //     .request(app)
      //     .post('/login')
      //     .send({
      //       email: "admin@admin.com",
      //       password: "secret_admin"
      //     })
      //     expect(status).to.be.equal(200);
      //     expect(body).to.have.property('token').that.is.a('string');
      // })

      // it('Se não existir token ao acessar a rota "/login/role"', async () => {
      //   const {status, body} = await chai.request(app).get('/login/role')
      //   expect(status).to.be.equal(401)
      //   expect(body).to.be.deep.equal({ "message": "Token not found" })
      // });

      // it('Se não existir token ao acessar a rota "/login/role"', async () => {
      //   const {status, body} = await chai.request(app).get('/login/role').set('Authorization', 'invalidToken')
      //   expect(status).to.be.equal(401)
      //   expect(body).to.be.deep.equal({ "message": "Token not found" })
      // });


  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

});
