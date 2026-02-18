// 👑 INSOLITO EMPIRE INTEGRATIONS
// Central control for VirtualTwin (AI) and Luminel (Booking)

export const EMPIRE_CONFIG = {
    // LUMINEL MANAGER (Booking Engine)
    // Sostituisci con il tuo link reale quando pronto (es. https://booking.luminel.app/yuli-olistico)
    LUMINEL_URL: "https://luminel-manager.vercel.app/demo-booking-widget",

    // VIRTUAL TWIN (AI Clone)
    // Sostituisci con il tuo ID o Script URL reale
    VIRTUAL_TWIN_ID: "yuli-clone-01",
    VIRTUAL_TWIN_SCRIPT_URL: "https://virtualtwin.vercel.app/widget/v1/bundle.js"
};

export const INTEGRATION_SETTINGS = {
    // Se true, apre il booking in un modale (Smart Seamless). Se false, apre nuova tab.
    USE_BOOKING_MODAL: true,

    // Se true, carica il widget AI.
    ENABLE_AI_CLONE: true
};
