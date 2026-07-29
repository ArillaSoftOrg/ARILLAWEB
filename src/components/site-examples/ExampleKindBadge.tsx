import { Badge } from "@/components/ui/badge";

const KIND_LABELS = {
  LIVE_DEMO: "Canlı Demo",
  DESIGN_CONCEPT: "Tasarım Konsepti",
  CLIENT_PROJECT: "Yayınlanmış Proje",
} as const;

const KIND_CLASSES = {
  LIVE_DEMO: "border-emerald-200 bg-emerald-50 text-emerald-700",
  DESIGN_CONCEPT: "border-violet-200 bg-violet-50 text-violet-700",
  CLIENT_PROJECT: "border-blue-200 bg-blue-50 text-blue-700",
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
