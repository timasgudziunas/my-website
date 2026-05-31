type Props = {
  label?: string;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
  className?: string;
};

const ratioClass: Record<NonNullable<Props["aspectRatio"]>, string> = {
  video:   "aspect-video",
  square:  "aspect-square",
  portrait: "aspect-[3/4]",
  wide:    "aspect-[21/9]",
};

export default function ImagePlaceholder({
  label = "image",
  aspectRatio = "video",
  className = "",
}: Props) {
  return (
    <div
      className={`${ratioClass[aspectRatio]} w-full bg-surface rounded-[2px] flex items-center justify-center ${className}`}
    >
      <span className="font-mono text-[10px] text-subtle tracking-[0.2em] uppercase select-none">
        [ {label} ]
      </span>
    </div>
  );
}
