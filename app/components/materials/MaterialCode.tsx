import { useRef, useState, useEffect } from "react";

interface MaterialCodeProps {
  code: string;
}

function MaterialCode({ code }: MaterialCodeProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
    });
  };

  return (
    <div className='w-full bg-secondary rounded-lg p-6'>
      <h3 className='text-lg font-bold text-secondary-foreground mb-4'>CSS</h3>
      <pre
        ref={codeRef}
        className='bg-secondary p-4 rounded-lg overflow-x-auto text-sm text-secondary-foreground font-mono whitespace-pre-wrap mb-4'
      >
        {code}
      </pre>
      <button
        onClick={handleCopyCode}
        className='w-full py-3 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg transition-colors flex items-center justify-center font-medium'
      >
        {copied ? <span>복사됨!</span> : <span>COPY CSS</span>}
      </button>
    </div>
  );
}

export default MaterialCode;
