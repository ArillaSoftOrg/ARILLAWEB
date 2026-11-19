import { Badge } from "@/components/ui/badge";

const KIND_LABELS = {
  LIVE_DEMO: "Canlı Demo",
  DESIGN_CONCEPT: "Tasarım Konsepti",
  CLIENT_PROJECT: "Yayınlanmış Proje",
} as const;

const KIND_CLASSES = {
  LIVE_DEMO: "border-emerald-200 bg-emerald-50 text-emerald-700",
  DESIGN_CONCEPT: "border-home-border bg-home-surface text-home-fg",
  CLIENT_PROJECT: "border-home-primary bg-home-primary-soft text-home-fg",
} as const;

export type ExampleKind = keyof typeof KIND_LABELS;

export function getExampleKindLabel(kind: ExampleKind) {
  return KIND_LABELS[kind];
}

export default function ExampleKindBadge({ kind }: { kind: ExampleKind }) {
  return (
    <Badge variant="outline" className={KIND_CLASSES[kind]}>
      {KIND_LABELS[kind]}
    </Badge>
  );
}
