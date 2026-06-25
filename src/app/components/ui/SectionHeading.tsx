interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

export default function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <p className="font-mono text-[11px] uppercase tracking-widest text-text-2 mb-2">
        {eyebrow}
      </p>
      <h2
        className="font-medium text-text-1"
        style={{
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
        }}
      >
        {title}
      </h2>
    </div>
  );
}
