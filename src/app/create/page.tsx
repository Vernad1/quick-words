import CreateArticleForm from "../components/CreateArticleForm";

export default function CreatePage() {
  return (
    <div>
      <div className="border-b-[1px] border-b-gray-300 px-14 py-6">
        <h2 className="text-xl">Create page</h2>
      </div>
      <CreateArticleForm></CreateArticleForm>
    </div>
  );
}
