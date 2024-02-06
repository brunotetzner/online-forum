import { EditAnswerUseCase } from "./edit-answer";
import { makeAnswer } from "test/factories/make-answer";
import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;
describe("Edit Answer UseCase", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);
    await sut.execute({
      answerId: newAnswer.id.toString(),
      content: "content-test",
      authorId: "author-1",
    });

    expect(await inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "content-test",
    });
  });

  it("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);
    expect(() => {
      return sut.execute({
        answerId: "answer-1",
        content: "content-test",
        authorId: "author-2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
