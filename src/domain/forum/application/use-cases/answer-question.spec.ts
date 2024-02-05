import { expect, test, describe, beforeEach } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";

let inMemoryAnwerRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Create a answer", async () => {
  beforeEach(() => {
    inMemoryAnwerRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnwerRepository);
  });

  test("Should be able to create a answer", async () => {
    const { answer } = await sut.execute({
      questionId: "1",
      instructorId: "2",
      content: "any content",
    });

    expect(answer.id).toBeTruthy();
    expect(inMemoryAnwerRepository.items[0].id).toEqual(answer.id);
  });
});
