import Script from 'next/script';

export function Codepen({ url }: { url: string }) {
  return (
    <p
      className='codepen'
      data-height='300'
      data-default-tab='html,result'
      data-slug-hash={url.split('/pen/')[1]}
      data-user='lucasfernandodev'
    >
      <span>
        See the Pen <a href={url}>Login</a> by Lucas Fernando (
        <a href='https://codepen.io/lucasfernandodev'>@lucasfernandodev</a>) on{' '}
        <a href='https://codepen.io'>CodePen</a>.
      </span>
      <Script src="https://cpwebassets.codepen.io/assets/embed/ei.js" />
    </p>
  );
}
