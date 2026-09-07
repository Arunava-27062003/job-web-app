export type ParsedStudentInput = {
  name: string;
  className: string;
  stream: "SCIENCE" | "HUMANITIES";
  section: string;
  roll: string;
};

export function parseStudentInput(body: unknown): { data: ParsedStudentInput } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid request body." };
  const b = body as Record<string, unknown>;

  const name = String(b.name ?? "").trim();
  const className = String(b.className ?? "").trim();
  const stream = String(b.stream ?? "").trim().toUpperCase();
  const section = String(b.section ?? "").trim().toUpperCase();
  const roll = String(b.roll ?? "").trim();

  if (!name || !className || !stream || !section || !roll) {
    return { error: "All fields are required." };
  }
  if (!["11", "12"].includes(className)) {
    return { error: "Class must be 11 or 12." };
  }
  if (!["SCIENCE", "HUMANITIES"].includes(stream)) {
    return { error: "Stream must be Science or Humanities." };
  }

  return { data: { name, className, stream: stream as "SCIENCE" | "HUMANITIES", section, roll } };
}
