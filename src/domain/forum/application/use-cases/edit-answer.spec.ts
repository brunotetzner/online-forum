import { EditAnswerUseCase } from "./edit-answer";
import { makeAnswer } from "test/factories/make-answer";
import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answers-attachments-repository";
import { makeAnswerAttachment } from "test/factories/make-answer-attachments";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer UseCase", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );

    sut = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerAttachmentsRepository
    );
  });

  it("should be able to edit a answer", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID("1"),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID("2"),
      })
    );
    await sut.execute({
      answerId: newAnswer.id.toString(),
      content: "content-test",
      authorId: "author-1",
      attachmentsIds: ["1", "3"],
    });

    expect(await inMemoryAnswersRepository.items[0]).toMatchObject({
      content: "content-test",
    });
    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems
    ).toHaveLength(2);
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachmentId: new UniqueEntityID("1") }),
        expect.objectContaining({ attachmentId: new UniqueEntityID("3") }),
      ]
    );
  });

  it("should not be able to edit a answer from another user", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID("author-1") },
      new UniqueEntityID("answer-1")
    );

    await inMemoryAnswersRepository.create(newAnswer);
    const result = await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: "author-2",
      content: "Conteúdo teste",
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
