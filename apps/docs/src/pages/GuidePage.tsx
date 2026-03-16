import { Markdown } from '../components/Markdown';

interface GuidePageProps {
  content: string;
}

export function GuidePage({ content }: GuidePageProps) {
  return <Markdown content={content} />;
}
