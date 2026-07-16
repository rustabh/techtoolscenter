import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="container-tight flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        The page you’re looking for doesn’t exist or has moved. Try exploring our tools instead.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>Go home</Link>
        <Link href="/tools" className={cn(buttonVariants())}>Browse tools</Link>
      </div>
    </div>
  );
}
