function findCodeInText(child: any){
  return !!child.key.match(/code/g) || !!child.key.match(/pre/g)
}

const ParagraphRenderer = ({ children, className }: any) => {

  const renderDiv = <div className={className}>{children}</div>;
  const renderP = <p className={className}>{children}</p>;

  const hasCode = !!children.find((child: any) =>
      typeof child === "object" && child.key && findCodeInText(child)
  );

  return hasCode ? (renderDiv) : (renderP);
};


export default ParagraphRenderer;