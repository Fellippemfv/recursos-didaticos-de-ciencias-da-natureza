import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaUserGraduate } from "react-icons/fa";

export default function Contact() {
  const members = [
    {
      name: "Prof. Fellippe Matheus",
      image: "https://avatars.githubusercontent.com/u/67835741?v=4", // 💡 Coloque suas imagens em /public/team
      formation: [
        "Graduado em Licenciatura Plena em Ciências Naturais Pela Universidade Federal do Amazonas - UFAM",
        "Pós Graduação em Educação de Jovens e Adultos Pelo Centro Universitário Leonardo da Vinci - Uniasselvi",
        "Mestrando do Programa de Pós Graduação em Ensino de Ciências e Matemática Pela Universidade Federal do Amazonas - PPGECIM UFAM",
      ],
      email: "prof.fellippe@gmail.com",
    },
   /*  {
      name: "Prof. Fellippe Matheus",
      image: "https://avatars.githubusercontent.com/u/67835741?v=4", // 💡 Coloque suas imagens em /public/team
      formation: [
        "Graduado em Licenciatura Plena em Ciências Naturais Pela Universidade Federal do Amazonas - UFAM",
        "Pós Graduação em Educação de Jovens e Adultos Pela Uniasselvi",
        "Mestrando do Programa de Pós Graduação em Ensino de Ciências e Matemática Pela Universidade Federal do Amazonas - PPGECIM UFAM",
      ],
      email: "prof.fellippe@gmail.com",
    }, */
    
  ];

  return (
  <section className="bg-[#f9fbfc] py-20 px-4">
  {/* Contextualização */}
  <div className="max-w-5xl mx-auto text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
      Entre em <span className="text-cyan-500">contato</span>
    </h2>
    <p className="mt-4 text-gray-600 text-lg ">
      Se você está em busca de aulas dinâmicas, palestras inspiradoras ou parcerias em projetos educacionais, entre em contato! estamos à disposição para contribuir com iniciativas que valorizem o ensino e promovam a aprendizagem de forma acessível, criativa e significativa. Fique à vontade para entrar em contato, será um prazer dialogar e compartilhar ideias!
    </p>
  </div>

  {/* Cards dos membros */}
  <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-10">
    {members.map((member, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-6 p-6 min-w-[280px] md:w-[70%]"
      >
        <div className="w-40 h-40 relative rounded-full overflow-hidden border-4 border-cyan-200 shadow-md">
          <img src={member.image} alt={member.name} />
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <FaUserGraduate className="text-cyan-500" />
            {member.name}
          </h3>

          <ul className="list-disc list-inside text-gray-700 mb-4">
            {member.formation.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p>Quer entrar em contato? Envie um email para:</p>
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <FaEnvelope />
            {member.email}
          </a>
        </div>
      </div>
    ))}
  </div>
</section>

  );
}
