import { PrismaClient } from "@prisma/client";
import { subjectLevels, careers, genericCapstones, type QSeed } from "./seedData";

const prisma = new PrismaClient();

async function createQuestions(levelId: string, questions: QSeed[]) {
  await prisma.question.createMany({
    data: questions.map((q, i) => ({
      levelId,
      order: i + 1,
      text: q.text,
      options: JSON.stringify(q.options),
      correctIndex: q.correct,
      hint: q.hint,
      explanation: q.explanation,
      difficulty: q.difficulty ?? 1,
    })),
  });
}

async function main() {
  console.log("Clearing existing data...");
  await prisma.progress.deleteMany();
  await prisma.question.deleteMany();
  await prisma.careerPath.deleteMany();
  await prisma.level.deleteMany();
  await prisma.student.updateMany({ data: { selectedCareerId: null } });
  await prisma.career.deleteMany();

  console.log("Seeding shared subject levels...");
  const levelIdByKey = new Map<string, string>();
  for (const s of subjectLevels) {
    const level = await prisma.level.create({
      data: {
        stream: s.stream,
        kind: "SUBJECT",
        subject: s.subject,
        title: s.title,
        description: s.description,
        passScore: 60,
        baseXp: 100,
      },
    });
    levelIdByKey.set(s.key, level.id);
    await createQuestions(level.id, s.questions);
  }

  console.log("Seeding careers, capstones and paths...");
  for (const c of careers) {
    const career = await prisma.career.create({
      data: {
        slug: c.slug,
        name: c.name,
        stream: c.stream,
        tagline: c.tagline,
        description: c.description,
        icon: c.icon,
        order: c.order,
      },
    });

    let order = 1;
    for (const key of c.subjectLevelKeys) {
      const levelId = levelIdByKey.get(key);
      if (!levelId) throw new Error(`Unknown subject level key: ${key}`);
      await prisma.careerPath.create({
        data: { careerId: career.id, levelId, order: order++ },
      });
    }

    const capstone = await prisma.level.create({
      data: {
        stream: c.stream,
        kind: "CAPSTONE",
        subject: c.name,
        title: c.capstoneTitle,
        description: c.capstoneDescription,
        passScore: 60,
        baseXp: 200,
      },
    });
    await createQuestions(capstone.id, c.capstoneQuestions);
    await prisma.careerPath.create({
      data: { careerId: career.id, levelId: capstone.id, order: order++ },
    });
  }

  console.log("Seeding generic capstones for custom (student-typed) careers...");
  for (const g of genericCapstones) {
    const level = await prisma.level.create({
      data: {
        stream: g.stream,
        kind: "CAPSTONE",
        subject: g.subject,
        title: g.title,
        description: g.description,
        passScore: 60,
        baseXp: 200,
        isGenericCapstone: true,
      },
    });
    await createQuestions(level.id, g.questions);
  }

  console.log(
    `Seeded ${subjectLevels.length} subject levels, ${careers.length} careers, and ${genericCapstones.length} generic capstones.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
