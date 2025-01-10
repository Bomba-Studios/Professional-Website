import { createSignal, onMount } from 'solid-js';
import emailjs from '@emailjs/browser';
import { toast } from 'solid-toast';

export default function ContactForm() {
    let formRef;
    const [isSending, setIsSending] = createSignal(false);
    const [formValid, setFormValid] = createSignal(false);
    const [formSent, setFormSent] = createSignal(false);
    const [isInitialized, setIsInitialized] = createSignal(false);

    onMount(() => {
        const lastSent = localStorage.getItem('formLastSent');
        if (lastSent && Date.now() - parseInt(lastSent) < 3600000) {
            setFormSent(true);
        }
        setIsInitialized(true);
    });

    const generateRequestNumber = () => {
        return 'REQ-' + Date.now();
    };

    const getCurrentDate = () => {
        const date = new Date();
        return date.toISOString();
    };

    const sendEmail = async (event) => {
        event.preventDefault();
        setIsSending(true);

        formRef.request_number.value = generateRequestNumber();
        formRef.date.value = getCurrentDate();

        const promise = emailjs.sendForm(
            import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
            import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
            formRef,
            import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
        );

        toast.promise(promise, {
            loading: 'Enviando mensaje...',
            success: () => (
                <div class="toast-custom">
                    <p>¡Correo enviado correctamente!</p>
                </div>
            ),
            error: () => (
                <div class="toast-custom">
                    <p>Hubo un error al enviar el correo.</p>
                </div>
            ),
        });

        try {
            await promise;
            localStorage.setItem('formLastSent', Date.now().toString());
            setFormSent(true);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        } finally {
            setIsSending(false);
        }
    };

    const handleInputChange = () => {
        setFormValid(formRef.checkValidity());
    };

    const formFields = [
        {
            name: "name",
            type: "text",
            placeholder: "Nombre*",
            required: true,
        },
        {
            name: "email",
            type: "email",
            placeholder: "tu@email.com*",
            required: true,
        },
        {
            name: "phone",
            type: "tel",
            placeholder: "WhatsApp o teléfono*",
            required: true,
        },
    ];

    return (
        <>
            {!isInitialized() ? (
                <div class="flex items-center justify-center h-full min-h-[400px] text-center">
                    <p class="text-gray-500">Cargando...</p>
                </div>
            ) : formSent() ? (
                <div class="flex flex-col items-center justify-center md:h-full md:min-h-[400px] text-center -mt-20 md:mt-0">
                    <dotlottie-player
                        src="https://lottie.host/9a6b7271-b40e-4742-818d-55de19c03c5e/A47zGNFGmI.lottie"
                        background="transparent"
                        speed="1"
                        style="width: 300px; height: 300px"
                        autoplay
                    ></dotlottie-player>
                    <p class="text-xl md:text-2xl leading-[1.1em] font-bold -mt-16 mb-16">
                        ¡Mensaje enviado exitosamente! En breve nos contactaremos contigo.
                    </p>
                </div>
            ) : (
                <form
                    ref={(el) => (formRef = el)}
                    onSubmit={sendEmail}
                    method="POST"
                >
                    <input type="hidden" name="date" />
                    <input type="hidden" name="request_number" />

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {formFields.map((field, index) => (
                            <div
                                class={`${index === 2 ? 'sm:col-span-2' : ''}`}
                                key={field.name}
                            >
                                <input
                                    type={field.type}
                                    name={field.name}
                                    id={field.name}
                                    required={field.required}
                                    placeholder={field.placeholder}
                                    class="form-input"
                                    onInput={handleInputChange}
                                />
                            </div>
                        ))}
                    </div>
                    <textarea
                        name="message"
                        placeholder="Cuéntanos sobre tu proyecto...*"
                        required
                        class="form-textarea-input mt-6"
                        onInput={handleInputChange}
                    ></textarea>
                    <button
                        aria-label="Enviar Mensaje"
                        type="submit"
                        class={`py-4 px-12 flex mx-auto md:mx-0 md:items-center justify-center mt-5 mb-5
                            ${isSending() || !formValid()
                                ? 'btn-primary-disabled'
                                : 'btn-primary'}`}
                        disabled={isSending() || !formValid()}
                    >
                        {isSending() ? 'Enviando...' : 'Enviar Mensaje →'}
                    </button>
                </form>
            )}
            <script
                src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
                type="module"></script>
        </>
    );
}

