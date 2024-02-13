import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answers-attachments-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: FetchQuestionAnswersUseCase;
describe("Fetch Recent Questions", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  it("should be able to fetch recent answers", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question1") })
    );

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question1") })
    );

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question1") })
    );

    const result = await sut.execute({
      page: 1,
      questionId: "question1",
    });

    expect(result.value?.answers).toHaveLength(3);
  });

  it("should be able to fetch answers with pagination", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question1") })
    );

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question1") })
    );

    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question1") })
    );

    const result = await sut.execute({
      page: 2,
      questionId: "question1",
    });

    expect(result.value?.answers).toHaveLength(0);
  });
});
