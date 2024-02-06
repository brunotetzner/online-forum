import { EditQuestionUseCase } from "./edit-question";
import { makeQuestion } from "test/factories/make-question";
import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;
describe("Edit Question UseCase", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);
    await sut.execute({
      questionId: newQuestion.id.toString(),
      title: "titulo teste",
      content: "content-test",
      authorId: "author-1",
    });

    expect(await inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: "titulo teste",
      content: "content-test",
    });
  });

  it("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("question-1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);
    expect(() => {
      return sut.execute({
        questionId: "question-1",
        title: "titulo teste",
        content: "content-test",
        authorId: "author-2",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
