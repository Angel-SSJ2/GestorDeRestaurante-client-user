import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterForm";

export const AuthPage = () => {
    const [view, setView] = useState("login");

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4 relative"
            style={{ 
                backgroundImage: "url('/src/assets/img/fondo.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Overlay para oscurecer un poco el fondo y destacar la tarjeta */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

            <div className="w-full z-10 max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10 transform transition-all duration-500">
                
                {/* LOGO Y BIENVENIDA */}
                <div className="flex flex-col items-center mb-8">
                    <img
                        src="/src/assets/img/Logo_Restaurante.png"
                        alt="UrbanCentral Logo"
                        className="h-20 w-auto mb-4 drop-shadow-md"
                    />
                    <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight text-center">
                        {view === "login" ? "Bienvenido a UrbanCentral" : "Únete a UrbanCentral"}
                    </h1>
                    <p className="text-sm text-blue-900 text-center mt-2 font-medium">
                        {view === "login" 
                            ? "Reserva tu mesa favorita en segundos" 
                            : "Crea tu cuenta y comienza a explorar"}
                    </p>
                </div>

                {/* FORMULARIOS */}
                <div className="transition-all duration-300 ease-in-out">
                    {view === "login" ? (
                        <LoginForm onRegister={() => setView("register")} />
                    ) : (
                        <RegisterForm onBack={() => setView("login")} />
                    )}
                </div>

            </div>
        </div>
    );
};
