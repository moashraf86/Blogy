/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
export const CommentForm = ({
  handleChangeComment,
  handleSubmit,
  handleCancelEdit,
  content,
  currentUser,
  error,
  formRef,
  buttonLabel,
  commentToEdit,
  commentHasChanged,
}) => {
  const isGuest = currentUser?.isGuest;
  return (
    <div ref={formRef}>
      <label
        htmlFor="comment"
        className="inline-block text-primary font-bold text-xl mb-6"
      >
        Write a Comment
      </label>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1">
        <textarea
          className="w-full p-3 text-primary border border-input bg-transparent rounded-lg shadow-sm focus:ring-0 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          name="comment"
          id="comment"
          rows={4}
          placeholder={
            isGuest || !currentUser ? "Sign in to comment" : "Write a comment"
          }
          onChange={handleChangeComment}
          value={content}
          disabled={isGuest || !currentUser}
        ></textarea>
        {error && <p className="text-danger">{error}</p>}
        <div className="flex items-center gap-3 justify-end">
          {commentToEdit ? (
            <Button
              label="Cancel Editing"
              variant="outline"
              size="lg"
              type="button"
              className="self-end text-base"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          ) : null}
          <Button
            size="lg"
            type="submit"
            className="self-end text-base"
            disabled={isGuest || !currentUser || !commentHasChanged}
            label={buttonLabel === "Write" ? "Write a Comment" : "Edit Comment"}
          >
            {buttonLabel}
          </Button>
        </div>
      </form>
    </div>
  );
};
