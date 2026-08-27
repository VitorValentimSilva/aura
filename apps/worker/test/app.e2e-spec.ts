import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { App } from "supertest/types";

import { AppModule } from "@/app.module";

describe("AppModule (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/health/live (GET)", () => {
    return request(app.getHttpServer()).get("/health/live").expect(200).expect({ status: "ok" });
  });

  afterEach(async () => {
    await app.close();
  });
});
