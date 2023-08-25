import { kv } from "@vercel/kv";
import DiaryType from "@/types";

export async function findAll() {
  return (await kv.lrange("diaries", 0, -1)) as DiaryType[];
}

export async function findById(id: string) {
  const doc = await findAll();
  return doc.find((item) => item.id === id);
}

// export async function create(diary: DiaryType) {
//   const doc = await findAll();
//   doc.push(diary);
//   await kv.set("diaries", JSON.stringify(doc));
// }

export async function update(diary: DiaryType) {
  const doc = await findAll();
  const index = doc.findIndex((item) => item.id === diary.id);
  await kv.lset("diaries", index, diary);
}
