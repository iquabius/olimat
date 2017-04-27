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
        <Link href='/questions'><a>Questões</a></Link> |
      </nav>
    </header>

    <h1>Questões</h1>
    <p>Página para listar as Questões.</p>
  </div>
)
