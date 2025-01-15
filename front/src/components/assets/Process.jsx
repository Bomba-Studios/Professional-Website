import { onCleanup, createSignal, onMount } from 'solid-js';
import { MessageIcon, ArtIcon, LogoIcon, RocketIcon, ChevronRightIcon } from "../assets/Icons";
import Modal from "./Modal";

const process = [
  {
    number: 1,
    title: "Consulta Inicial",
    description: "Conversamos sobre tu proyecto y definimos los objetivos.",
    icon: MessageIcon,
    modal: false,
  },
  {
    id: "mockup",
    number: 2,
    title: "Diseño",
    description:
      "Creamos mockups y prototipos para visualizar tu sitio web.",
    icon: ArtIcon,
    linkText: "¿Qué es un Mockup?",
    modalDescription: "Un mockup es una representación estática del diseño de tu sitio web, mientras que un prototipo es interactivo y permite simular cómo funcionará. Ambos te ayudan a visualizar el resultado final y realizar ajustes antes de construir el sitio, ahorrando tiempo y dinero.",
    modal: true,
  },
  {
    id: "clean-code",
    number: 3,
    title: "Desarrollo",
    description: "Construimos tu sitio web con código limpio y optimizado.",
    icon: LogoIcon,
    linkText: "¿Qué es Código Limpio?",
    modalDescription: "El código limpio es una forma de programar que prioriza la claridad, la eficiencia y la organización. Esto asegura que el sitio funcione sin problemas, sea más rápido y pueda ser mejorado fácilmente en el futuro.",
    modal: true,
  },
  {
    number: 4,
    title: "Lanzamiento",
    description: "Te ayudamos a poner en marcha tu sitio web.",
    icon: RocketIcon,
    modal: false,
  },
];

const Process = () => {
  const [activeStep, setActiveStep] = createSignal(1);

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = parseInt(entry.target.getAttribute('data-step') || '1');
            setActiveStep(step);
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px',
      }
    );

    document.querySelectorAll('.timeline-step').forEach((step) => {
      observer.observe(step);
    });

    onCleanup(() => observer.disconnect());
  });

  return (
    <>
      <div class="relative mx-auto px-3 md:px-0">
        <div class="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 to-gray-300">
          <div
            class="absolute top-0 left-0 w-full bg-gradient-to-b from-primary-400 to-primary-600 transition-all duration-500"
            style={{ height: `${(activeStep() / process.length) * 100}%` }}
          />
        </div>

        <div class="space-y-12 lg:space-y-16">
          {process.map((step) => (
            <div
              class={`timeline-step transition-all duration-700 ease-out relative pl-12 lg:pl-0 group ${step.number <= activeStep() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              data-step={step.number}
              key={step.number}
            >

              <div
                class={`lg:grid lg:grid-cols-2 lg:gap-8 ${step.number % 2 === 0 ? 'lg:direction-rtl' : ''}`}
              >
                <div
                  class={`absolute lg:relative left-0 lg:left-auto ${step.number % 2 === 0
                    ? 'lg:order-2 lg:flex lg:justify-start'
                    : 'lg:order-1 lg:flex lg:justify-end'
                    }`}
                >
                  <div
                    class={`absolute lg:relative lg:inline-flex -translate-x-1/2 lg:translate-x-0 w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full border-2 sm:border-3 border-gray-200 flex items-center justify-center transition-all duration-500 shadow-md md:group-hover:scale-110 ${step.number <= activeStep() ? 'border-primary-600 ring-2 ring-primary-100' : ''}`}
                  >
                    <div class="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center transform transition-transform md:group-hover:rotate-12">
                      <step.icon />
                    </div>
                    <div class="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-primary-600 rounded-full flex items-center justify-center text-[10px] sm:text-xs text-white font-bold shadow-lg transform translate-x-1/2 -translate-y-1/2 leading-[1.1em]">
                      {step.number}
                    </div>
                  </div>
                </div>

                <div
                  class={`lg:w-full ${step.number % 2 === 0 ? 'lg:order-1 lg:pr-16' : 'lg:order-2 lg:pl-16'
                    }`}
                >
                  <div class="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-transform duration-300 md:hover:-translate-y-1 md:hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-gray-100">
                    <h3 class="text-lg sm:text-xl font-bold text-gray-900 leading-[1.1em]">{step.title}</h3>
                    <p class="text-sm sm:text-base text-gray-600 leading-[1.1em]">{step.description}</p>
                    <button
                      aria-haspopup="dialog"
                      aria-expanded="false"
                      aria-controls={`modal-${step.id}`}
                      data-hs-overlay={`#modal-${step.id}`}
                      class={`text-primary-600 leading-[1.1em] text-sm sm:text-base flex items-center ${step.modal ? 'mt-2' : 'hidden'}`}
                    >
                      {step.linkText}
                      <ChevronRightIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {
        process.map(
          (step) =>
            step.modal && (
              <Modal
                id={step.id}
                title={step.linkText}
                description={step.modalDescription}
              />
            ),
        )
      }

    </>
  );
};
export default Process;
