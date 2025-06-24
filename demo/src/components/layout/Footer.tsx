
export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-20 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Client Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
