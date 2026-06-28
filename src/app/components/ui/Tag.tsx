interface TagProps {
  label: string;
}

export default function Tag({ label }: TagProps) {
  return (
    <span className="inline-block font-mono text-[11px] px-2.5 py-1 bg-surface border border-border rounded-full text-text-2 tag-hover">
      {label}
    </span>
  );
}
