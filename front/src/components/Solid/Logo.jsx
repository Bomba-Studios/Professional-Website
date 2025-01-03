export function Logo() {
    return (
        <div class="flex items-center space-x-3 h-8" >
            <svg xmlns="http://www.w3.org/2000/svg" class="text-primary-600 stroke-2" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" > <path d="M7 8l-4 4l4 4" /> <path d="M17 8l4 4l-4 4" /> <path d="M14 4l-4 16" /> </svg>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600">
                WebCraft
            </span>
        </div>
    );
}