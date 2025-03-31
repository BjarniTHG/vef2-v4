export default function Form({ 
    onSubmit, 
    children 
  }: { 
    onSubmit: (e: React.FormEvent) => void, 
    children: React.ReactNode 
  }) {
    return (
      <form onSubmit={onSubmit} className="space-y-6">
        {children}
      </form>
    );
  }