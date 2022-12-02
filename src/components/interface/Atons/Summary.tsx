interface SummaryProps {
  content: string;
  className?: string;
}

const Summary = ({ content, className }: SummaryProps) => {
  function truncateWithEllipses(text: string, max: number) {
    return text.substring(0, max - 1) + (text.length > max ? '...' : '');
  }

  return <p className={className}>{truncateWithEllipses(content, 114)}</p>;
};

export default Summary;
