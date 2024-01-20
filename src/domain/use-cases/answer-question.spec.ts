import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

test("Create an answer", () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const answer = answerQuestion.execute({
    instructorId: "any_id",
    questionId: "any_id",
    content: "any content",
  });

  expect(answer.content).toEqual("any content");
});
