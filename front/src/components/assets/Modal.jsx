const Modal = (props) => {
    return (
        <div
            id={`modal-${props.id}`}
            class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
            role="dialog"
            tabindex="-1"
            aria-labelledby={`modal-label-${props.id}`}
        >
            <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                <div class="w-full flex flex-col bg-slate-100 border shadow-sm rounded-xl pointer-events-auto">
                    <div class="flex justify-between items-center py-3 px-4 border-b border-slate-300">
                        <h3 id={`modal-label-${props.id}`} class="font-bold">
                            {props.title}
                        </h3>
                        <button
                            type="button"
                            class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent text-primary-800 hover:bg-primary-600/10 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                            aria-label="Cerrar"
                            data-hs-overlay={`#modal-${props.id}`}
                        >
                            <span class="sr-only">Cerrar</span>
                            <svg
                                class="shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="p-4 overflow-y-auto">
                        <p class="text-gray-800">{props.description}</p>
                    </div>
                    <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-slate-300">
                        <button
                            type="button"
                            class="btn-ghost"
                            data-hs-overlay={`#modal-${props.id}`}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;