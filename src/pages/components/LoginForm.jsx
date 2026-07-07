import { useForm } from "react-hook-form";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({ onRegister }) => {
    const navigate = useNavigate();
    const { login, loading } = useAuthStore();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const res = await login(data);
        if (res.success) {
            navigate("/");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-fadeIn">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    placeholder="ejemplo@correo.com"
                    className={`w-full px-4 py-2.5 text-sm bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[--main-blue] focus:bg-white outline-none transition-all`}
                    {...register("email", { required: "El correo es obligatorio" })}
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className={`w-full px-4 py-2.5 text-sm bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[--main-blue] focus:bg-white outline-none transition-all`}
                    {...register("password", { required: "La contraseña es obligatoria" })}
                />
                {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-900 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
                {loading ? "Entrando..." : "Iniciar Sesión"}
            </button>

            <div className="pt-2 text-center text-sm text-gray-600">
                ¿Aún no tienes cuenta?{" "}
                <button
                    type="button"
                    onClick={onRegister}
                    className="text-blue-700 font-semibold hover:underline"
                >
                    Regístrate aquí
                </button>
            </div>
        </form>
    );
};
