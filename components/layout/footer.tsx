import { NewsletterForm } from "@/components/newsletter-form";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="font-semibold">Subscribe to our newsletter</h2>
        <NewsletterForm />
      </div>
    </footer>
  );
}
