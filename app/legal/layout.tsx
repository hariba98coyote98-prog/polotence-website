import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="flex-1 relative z-10 pt-32 pb-24">
        <div className="container-x max-w-3xl">
          <article className="prose-style">{children}</article>
        </div>
      </main>
      <Footer />
      <style>{`
        .prose-style h1 { font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.02em; line-height: 1; text-transform: uppercase; margin-bottom: 1.5rem; }
        .prose-style h2 { font-size: 1.25rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 0.75rem; color: var(--color-fg-primary); }
        .prose-style h3 { font-size: 1rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem; color: var(--color-fg-primary); }
        .prose-style p { color: var(--color-fg-secondary); line-height: 1.7; margin-bottom: 1rem; }
        .prose-style ul, .prose-style ol { color: var(--color-fg-secondary); padding-left: 1.5rem; margin-bottom: 1rem; }
        .prose-style li { line-height: 1.7; margin-bottom: 0.25rem; }
        .prose-style strong { color: var(--color-fg-primary); font-weight: 600; }
        .prose-style a { color: var(--color-accent); text-underline-offset: 4px; }
        .prose-style a:hover { text-decoration: underline; }
      `}</style>
    </>
  );
}
