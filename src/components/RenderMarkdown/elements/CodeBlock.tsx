import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';


interface CodeBlockProps{
  language?: string | undefined;
  children: any,
  className: string | undefined
}

export default function CodeBlock({className, children} : CodeBlockProps ) {

  const isClassName = typeof className !== 'undefined' && className.includes('language');
  const currentLanguage = isClassName ? className.replaceAll('language-', '') : '';

  return (

    <SyntaxHighlighter 
      className="code"  
      language={currentLanguage} 
      style={dracula}
      PreTag={typeof className !== 'undefined' ? 'pre' : 'code'}
    >
      {children}
    </SyntaxHighlighter>
  );
}
