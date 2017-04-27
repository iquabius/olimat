import Head from 'next/head'
import Link from 'next/link'

export default () => (
  <div>
    <Head>
      <title>Olimat 🔥</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>

    <header>
      <nav>
        <Link href='/'><a>Home</a></Link> |
      </nav>
    </header>

    <p>Olá, esta é a aplicação 'frontend' para o projeto Olimat!</p>
    <hr />
    <p>Olhe a aba do navegador ☝</p>
    <p>A aplicação agora tem um título 🙋</p>
  </div>
)
