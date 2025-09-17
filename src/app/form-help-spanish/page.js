export const metadata = {
  title: "Ayuda con Formularios en Español - Inmigración, Impuestos | Form Buddy AI",
  description: "Comprende formularios complejos con explicaciones claras en español. Ayuda con I-485, I-130, N-400, impuestos, seguros médicos y más. Narración de voz nativa en español.",
  keywords: "formularios en español, ayuda inmigración español, formularios hispanos, I-485 español, N-400 español, impuestos en español, form buddy español, asistencia formularios",
  alternates: {
    canonical: 'https://formbuddyai.com/form-help-spanish',
  },
  openGraph: {
    title: 'Ayuda con Formularios en Español - Inmigración, Impuestos',
    description: 'Comprende formularios complejos con explicaciones claras en español. Ayuda con inmigración, impuestos, seguros médicos y más.',
    url: 'https://formbuddyai.com/form-help-spanish',
    images: [
      {
        url: '/ico.png',
        width: 1200,
        height: 630,
        alt: 'Form Buddy AI - Ayuda en Español',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayuda con Formularios en Español - Inmigración, Impuestos',
    description: 'Comprende formularios complejos con explicaciones claras en español. Narración de voz nativa.',
    images: ['/ico.png'],
  },
};

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function FormHelpSpanishPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/flags/es.webp"
                alt="Spanish flag"
                width={96}
                height={64}
                className="rounded-lg shadow-md"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-poppins">
              Ayuda con Formularios en Español
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprende cualquier formulario con explicaciones claras en español. Obtén ayuda con inmigración, impuestos, seguros médicos y más con narración de voz nativa.
            </p>
            <Link href="/upload">
              <button className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                Subir Mi Formulario
              </button>
            </Link>
          </div>
        </section>

        {/* Common Forms for Spanish Speakers */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Formularios Populares para Hispanos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  form: "Formulario I-485",
                  title: "Solicitud de Residencia Permanente",
                  description: "Aplicar para la tarjeta verde mientras estás en Estados Unidos"
                },
                {
                  form: "Formulario N-400",
                  title: "Solicitud de Naturalización",
                  description: "Aplicar para la ciudadanía estadounidense"
                },
                {
                  form: "Declaración de Impuestos",
                  title: "Formularios 1040 y W-4",
                  description: "Completar declaraciones de impuestos y solicitud de ITIN"
                },
                {
                  form: "Inscripción Escolar",
                  title: "Documentos de Matrícula",
                  description: "Inscribir a los niños en escuelas públicas y programas"
                },
                {
                  form: "Seguros Médicos",
                  title: "Healthcare.gov y Medicaid",
                  description: "Inscribirse en planes de salud y programas gubernamentales"
                },
                {
                  form: "Licencia de Conducir",
                  title: "DMV y Documentos de Identificación",
                  description: "Obtener licencia de conducir e identificación estatal"
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="text-[#2196F3] font-bold text-lg mb-2">{item.form}</div>
                  <h3 className="font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works in Spanish */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Cómo Funciona la Ayuda en Español
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Sube tu Formulario</h3>
                <p className="text-gray-600">Toma una foto o sube tu documento en cualquier idioma</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Explicaciones en Español</h3>
                <p className="text-gray-600">Recibe explicaciones claras con narración de voz en español</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Completa con Confianza</h3>
                <p className="text-gray-600">Llena tus formularios correctamente sin errores</p>
              </div>
            </div>
          </div>
        </section>

        {/* Spanish Community Features */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              ¿Por qué Elegir Form Buddy en Español?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12l2 7-2 7H3V5zm0 0l7 7-7 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Español Nativo</h3>
                  <p className="text-gray-600">Explicaciones naturales en tu idioma materno, no traducciones robóticas</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Contexto Cultural</h3>
                  <p className="text-gray-600">Entendemos las necesidades específicas de la comunidad hispana</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Audio en Español</h3>
                  <p className="text-gray-600">Escucha las explicaciones con voz clara y pronunciación correcta</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Privacidad Protegida</h3>
                  <p className="text-gray-600">Tus documentos personales están seguros y se eliminan automáticamente</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Historias de Éxito de Nuestra Comunidad
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#2196F3] rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Ana Morales</h4>
                    <p className="text-sm text-gray-600">Los Ángeles, CA</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Gracias a Form Buddy pude completar mi solicitud de ciudadanía sin errores. Las explicaciones en español me ayudaron mucho."
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#2196F3] rounded-full flex items-center justify-center text-white font-bold">
                    C
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Carlos Ruiz</h4>
                    <p className="text-sm text-gray-600">Houston, TX</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Los formularios de impuestos eran muy complicados, pero con las explicaciones de audio en español todo fue más fácil."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Immigration Help Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Ayuda Especializada en Inmigración
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Formularios de Inmigración Más Populares
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>I-485:</strong> Ajuste de estatus a residente permanente</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>I-130:</strong> Petición para familiares</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>N-400:</strong> Solicitud de naturalización</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-600">✓</span>
                      <span><strong>I-765:</strong> Autorización de trabajo</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    Ayudamos a miles de familias hispanas cada mes con sus trámites de inmigración
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Listo para Obtener Ayuda en Español?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Únete a miles de hispanos que han completado sus formularios exitosamente
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <button className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Comenzar Ahora
                </button>
              </Link>
              <Link href="/#pricing">
                <button className="border-2 border-[#2196F3] text-[#2196F3] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#2196F3] hover:text-white transition-all duration-300">
                  Ver Planes Pro
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}