import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { Comment, CommentProps } from "../entities/comment";

export interface QuestionCommentsProps extends CommentProps {
  questionId: UniqueEntityID;
}

export class QuestionComments extends Comment<QuestionCommentsProps> {
  get questionId() {
    return this.props.questionId;
  }

  static create(
    props: Optional<QuestionCommentsProps, "createdAt">,
    id?: UniqueEntityID
  ) {
    const questionComment = new QuestionComments(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id
    );

    return questionComment;
  }
}
