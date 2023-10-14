import EditDiaryContainer from "@/components/edit-diary-container";

export async function generateStaticParams() {
  const diaries: IDiary[] = await fetch(`${process.env.BASE_URL}/api/diary`, {
    // cache: "no-store",
  }).then((res) => res.json());

  return diaries.map((diary) => ({
    diaryId: diary.id,
  }));
}

const getData = async (id: string) => {
  const res = await fetch(`${process.env.BASE_URL}/api/diary/${id}`);
  const data = await res.json();
  return data;
};

const Page = async ({ params }: { params: { diaryId: string } }) => {
  const { diaryId } = params;
  const diary: IDiary = await getData(diaryId);

  return <EditDiaryContainer diary={diary} />;
};

export default Page;
