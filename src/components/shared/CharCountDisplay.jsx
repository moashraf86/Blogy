/* eslint-disable react/prop-types */
export const CharCountDisplay = ({ charCount, maxChars }) => {
  return (
    <div className="flex justify-end">
      <span
        className={
          charCount > maxChars ? "text-danger" : "text-muted-foreground"
        }
      >
        {charCount}
      </span>
      <span className="text-muted-foreground">/{maxChars}</span>
    </div>
  );
};
