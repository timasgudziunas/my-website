type Tone = "sand" | "sky" | "gold" | "steel" | "coffee";

type Props = {
  label?: string;
  aspectRatio?: "video" | "square" | "portrait" | "wide";
  tone?: Tone;
  /** Corner-radius utility. Defaults to a hairline round; pass "rounded-none" to sit flush. */
  rounded?: string;
  className?: string;
};

const ratioClass: Record<NonNullable<Props["aspectRatio"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

/** Box fill + label color per palette tone. Dark tones get a light label. */
const toneClass: Record<Tone, string> = {
  sand: "bg-surface text-subtle",
  sky: "bg-panel-sky text-deep/70",
  gold: "bg-panel-gold text-warm",
  steel: "bg-steel text-coffee/70",
  coffee: "bg-coffee text-dust/60",
};

export default function ImagePlaceholder({
  label = "image",
  aspectRatio = "video",
  tone = "sand",
  rounded = "rounded-[3px]",
  className = "",
}: Props) {
  return (
    <div
      className={`${ratioClass[aspectRatio]} w-full ${toneClass[tone]} ${rounded} flex items-center justify-center ${className}`}
    >
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase select-none">
        [ {label} ]
      </span>
    </div>
  );
}
