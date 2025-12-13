'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

// Custom components for MDX
const components = {
  h1: (props: any) => (
    <h1 className="text-4xl font-bold text-warmgray-900 mb-6 mt-8" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold text-warmgray-900 mb-4 mt-8" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-semibold text-warmgray-800 mb-3 mt-6" {...props} />
  ),
  p: (props: any) => (
    <p className="text-lg text-warmgray-600 mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside text-warmgray-600 mb-4 space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside text-warmgray-600 mb-4 space-y-2" {...props} />
  ),
  li: (props: any) => (
    <li className="text-lg text-warmgray-600" {...props} />
  ),
  a: (props: any) => (
    <a className="text-lavender-600 hover:text-lavender-700 underline" {...props} />
  ),
  strong: (props: any) => (
    <strong className="font-semibold text-warmgray-900" {...props} />
  ),
  em: (props: any) => (
    <em className="italic text-warmgray-700" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-lavender-500 pl-4 italic text-warmgray-600 my-6" {...props} />
  ),
};

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote {...source} components={components} />
    </div>
  );
}

// Server-side function to serialize MDX content
export async function serializeMDX(content: string): Promise<MDXRemoteSerializeResult> {
  return await serialize(content);
}
