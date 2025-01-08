import { createSignal } from 'solid-js';
import emailjs from '@emailjs/browser';
import { toast } from 'solid-toast';

export default function ContactForm() {
    let formRef;
    const [isSending, setIsSending] = createSignal(false);
    const [formValid, setFormValid] = createSignal(false);

    // Generar un número de solicitud único
    const generateRequestNumber = () => {
        return 'REQ-' + Date.now();  // Genera un número único basado en el timestamp
    };

    // Obtener la fecha actual
    const getCurrentDate = () => {
        const date = new Date();
        return date.toISOString(); // Formato de fecha ISO
    };

    const sendEmail = async (event) => {
        event.preventDefault();
        setIsSending(true);

        // Agregar fecha y número de solicitud al formulario
        formRef.request_number.value = generateRequestNumber();  // Número de solicitud
        formRef.date.value = getCurrentDate(); // Fecha de envío

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
            formRef.reset();
            setFormValid(false);
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
        <form
            ref={(el) => (formRef = el)}
            onSubmit={sendEmail}
            method="POST"
            class="space-y-6"
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
                class="w-full h-56 px-4 py-3 rounded-xl bg-gray-100 font-medium resize-none focus:outline-primary-600 focus:font-light focus:italic"
                onInput={handleInputChange}
            ></textarea>
            <button aria-label='Enviar Mensaje'
                type="submit"
                class={`py-4 px-12 flex mx-auto md:mx-0 md:items-center justify-center
                    ${isSending() || !formValid()
                        ? 'btn-primary-disabled'
                        : 'btn-primary'}`}
                disabled={isSending() || !formValid()}
            >
                {isSending() ? 'Enviando...' : 'Enviar Mensaje →'}
            </button>
        </form>
    );
}
