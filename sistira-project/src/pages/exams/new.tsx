import { useRouter } from "next/router";
import { useState } from "react";
import { createExam } from "../api/exams";
import Layout from "@/components/Layout";

export default function NewExamPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setError('Título obrigatório');

    try {
      const exam = await createExam({ title: title.trim(), description: description.trim() });
      router.push(`/exams/${exam.id}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Criar Prova</button>
    </form>
  );
}

NewExamPage.getLayout = (page: React.ReactElement) => (
  <Layout title="Provas">{page}</Layout>
);