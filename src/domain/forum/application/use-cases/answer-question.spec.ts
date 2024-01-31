import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import { Answer } from "@/domain/entities/answer";
import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";

const fakeAnswerRepository: AnswerRepository = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  create: async (answer: Answer) => {},
};

test("Create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);
  const answer = await answerQuestion.execute({
    instructorId: "any_id",
    questionId: "any_id",
    content: "any content",
  });

  expect(answer.content).toEqual("any content");
});
