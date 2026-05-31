import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0D0A07] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div
            className="w-3 h-3 rounded-full mx-auto mb-8"
            style={{
              background: "#57534E",
              boxShadow: "0 0 8px rgba(87,83,78,0.5)",
            }}
          />
          <h1 className="font-display text-5xl font-semibold text-[#FAFAF9] mb-4">
            Not found
          </h1>
          <p className="text-[#78716C] mb-8">
            This page doesn't exist. The temple or resource you're looking for
            may have moved.
          </p>
          <Link href="/" className="btn-saffron inline-flex cursor-pointer">
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
