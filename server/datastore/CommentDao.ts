import { Comment } from '../types';

export interface CommentDao {
    createComment(comment: Comment): void;
    listComment(postId: string): Comment[];
    deleteComment(id: string): void;
}