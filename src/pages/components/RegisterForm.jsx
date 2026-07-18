import { useForm } from "react-hook-form";
import { useAuthStore } from "../../stores/authStore";

export const RegisterForm = ({ onBack }) => {
    const { register: registerAction, loading } = useAuthStore();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const onSubmit = async (data) => {
        const res = await registerAction(data);
        if (res.success) {
            onBack();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                        type="text"
                        placeholder="Juan"
                        className={`w-full px-4 py-2.5 text-sm bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[--main-blue] outline-none transition-all`}
                        {...register("name", { required: "Campo requerido" })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                    <input
                        type="text"
                        placeholder="Pérez"
                        className={`w-full px-4 py-2.5 text-sm bg-gray-50 border ${errors.surname ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[--main-blue] outline-none transition-all`}
                        {...register("surname", { required: "Campo requerido" })}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Usuario</label>
                <input
                    type="text"
                    placeholder="juanperez"
                    className={`w-full px-4 py-2.5 text-sm bg-gray-50 border ${errors.username ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[--main-blue] outline-none transition-all`}
                    {...register("username", { required: "Campo requerido" })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input
                    type="email"
                    placeholder="juan@correo.com"
                    className={`w-full px-4 py-2.5 text-sm bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[--main-blue] outline-none transition-all`}
                    {...register("email", { required: "Campo requerido" })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                    type="tel"
                    placeholder="+123456789"
                    className={`w-full px-4 py-2.5 text-sm bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[--main-blue] outline-none transition-all`}
                    {...register("phone", { required: "Campo requerido" })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className={`w-full px-4 py-2.5 text-sm bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[--main-blue] outline-none transition-all`}
                    {...register("password", { required: "Campo requerido", minLength: { value: 6, message: "Mínimo 6 caracteres" } })}
                />
                {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-900 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98] mt-2"
            >
                {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </button>

            <div className="pt-1 text-center text-sm text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <button
                    type="button"
                    onClick={onBack}
                    className="text-blue-700 font-semibold hover:underline"
                >
                    Inicia sesión
                </button>
            </div>
        </form>
    );
};
