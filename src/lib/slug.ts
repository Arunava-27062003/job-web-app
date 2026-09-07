export function slugify(input: string): string {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "career"
  );
}

const ICON_POOL = ["🧭", "🚀", "⭐", "🎯", "🔮", "🧩", "🛤️", "🌟", "🎓", "🛠️"];

export function iconForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return ICON_POOL[hash % ICON_POOL.length];
}
