import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { Answer } from '@/domain/entities/answer'
import { AnswerRepository } from '@/repositories/answer-repository'

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => {},
}

test('Create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)
  const answer = await answerQuestion.execute({
    instructorId: 'any_id',
    questionId: 'any_id',
    content: 'any content',
  })

  expect(answer.content).toEqual('any content')
})
