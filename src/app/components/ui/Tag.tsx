interface TagProps {
  label: string;
  hoverable?: boolean;
}

export default function Tag({ label, hoverable = true }: TagProps) {
  return (
    <span className={`inline-block font-mono text-[11px] px-2.5 py-1 bg-surface border border-border rounded-full text-text-2 ${hoverable ? "kinetics-tag-pop tag-hover" : ""}`}>
      {label}
    </span>
  );
}
