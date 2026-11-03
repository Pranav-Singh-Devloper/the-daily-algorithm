// Renders "##highlighted##" spans in editorial rubric red inside body copy.
export const Rich = ({ text, className = "" }) => {
  const parts = String(text).split("##");
  return (
    <p className={className}>
      {parts.map((s, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-rubric font-semibold">
            {s}
          </strong>
        ) : (
          s
        )
      )}
    </p>
  );
};
