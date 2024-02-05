import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
    {/* Seção 1: Texto à esquerda, Imagem à direita */}
<section className="my-8 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
  <div className="text-center lg:text-left lg:w-1/2 lg:pr-4">
    <h2 className="text-4xl font-extrabold text-green-800 mb-4">Quem Somos</h2>
    <p className="text-gray-600">
  Bem-vindo ao nosso espaço dedicado à ciência, onde professores apaixonados se uniram para criar uma plataforma única. Nossa missão é tornar a ciência acessível a todos, promovendo o aprendizado de maneira envolvente e divertida. Aqui, oferecemos uma variedade de experimentos gratuitos, cuidadosamente elaborados por educadores, para inspirar a curiosidade e facilitar o entendimento dos princípios científicos. Junte-se a nós nesta jornada educacional, onde a descoberta e o conhecimento estão ao alcance de todos!
</p>

  </div>
  <img
    src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/230119-google_hero-teachers.width-1200.format-webp.webp"
    alt="Imagem de professores"
    className="w-full max-h-96 object-cover rounded-lg lg:w-1/2 lg:pl-4"
  />
</section>


      {/* Seção 2: Imagem à esquerda, Texto à direita */}
      <section className="my-8 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
      <img
    src="https://img.freepik.com/vector-premium/concepto-ilustracion-analisis-mercado-valores_701961-2507.jpg?w=2000"
    alt="Imagem de professores"
    className="w-full max-h-96 object-cover rounded-lg lg:w-1/2 lg:pl-4"
  />
        <div className="text-center lg:text-left lg:w-1/2 lg:pl-4">
        <h2 className="text-4xl font-extrabold text-green-800 mb-4">Nosso Compromisso</h2>
<p className="text-gray-600">
  Estamos comprometidos em proporcionar uma experiência educativa excepcional. Nossa missão vai além de oferecer experimentos gratuitos; é um compromisso com a qualidade, apoiando educadores e alunos em sua jornada de descobertas científicas. Acreditamos que a educação científica deve ser acessível, inspiradora e transformadora. Ao unir forças, professores e alunos podem explorar o fascinante mundo da ciência de maneira envolvente e significativa. Junte-se a nós nessa jornada de aprendizado e descoberta!
</p>
 </div>
      </section>


       {/* Seção 1: Texto à esquerda, Imagem à direita */}
       <section className="my-8 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
        <div className="text-center lg:text-left lg:w-1/2 lg:pr-4">
        <h2 className="text-4xl font-extrabold text-green-800 mb-4">Envie seu experimento</h2>
<p className="text-gray-600">
  Faça parte da nossa comunidade de aprendizado colaborativo! Encorajamos você a compartilhar seu próprio experimento conosco. Envie todos os detalhes, incluindo procedimentos, materiais necessários e suas experiências relacionadas ao experimento para o nosso e-mail: <span className="text-blue-600">email@gmail.com</span>. Não se esqueça de incluir imagens em anexo para ilustrar cada passo do processo. Estamos ansiosos para destacar e compartilhar sua contribuição em nossa plataforma, inspirando outros educadores e alunos na jornada científica!
</p>
</div>
        <img
    src="https://img.freepik.com/vector-premium/mujer-negocios-alta-productividad_701961-2085.jpg?size=626&ext=jpg"
    alt="Imagem de professores"
    className="w-full max-h-96 object-cover rounded-lg lg:w-1/2 lg:pl-4"
  />
      </section>
    </main>
  );
}
