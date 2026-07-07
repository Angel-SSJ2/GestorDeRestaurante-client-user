import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useClientStore } from '../../stores/clientStore';
import { useNavigate } from 'react-router-dom';

export const CreateReservationModal = ({ isOpen, onClose, restaurant }) => {
    const { fetchTables, tables, loadingTables, makeReservation } = useClientStore();
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && restaurant) {
            fetchTables(restaurant._id);
            reset(); // Reset form when modal opens
        }
    }, [isOpen, restaurant, fetchTables, reset]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const reservationData = {
            restaurant: restaurant._id,
            table: data.table,
            date: data.date.toISOString(),
            guests: Number(data.guests)
        };

        const res = await makeReservation(reservationData);
        setIsSubmitting(false);

        if (res.success) {
            onClose();
            navigate('/reservations');
        }
    };

    if (!isOpen || !restaurant) return null;

    // Get current datetime string for min attribute (YYYY-MM-DDThh:mm)
    const minDate = new Date();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-800">Reservar en {restaurant.name}</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    <form id="reservation-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        
                        {/* Fecha y Hora */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Fecha y Hora
                            </label>
                            <Controller
                                control={control}
                                name="date"
                                rules={{ required: "La fecha y hora son obligatorias" }}
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText="Seleccione fecha y hora"
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={30}
                                        timeCaption="Hora"
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        minDate={minDate}
                                        className={`w-full px-4 py-2 text-sm bg-gray-50 border ${errors.date ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[--main-blue] focus:bg-white outline-none transition-all cursor-pointer`}
                                    />
                                )}
                            />
                            {errors.date && <span className="text-red-500 text-xs mt-1 block">{errors.date.message}</span>}
                        </div>

                        {/* Personas */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Número de Personas
                            </label>
                            <input
                                type="number"
                                min="1"
                                placeholder="Ej: 2"
                                className={`w-full px-4 py-2 text-sm bg-gray-50 border ${errors.guests ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[--main-blue] focus:bg-white outline-none transition-all`}
                                {...register("guests", { 
                                    required: "Debes especificar el número de personas",
                                    min: { value: 1, message: "Mínimo 1 persona" }
                                })}
                            />
                            {errors.guests && <span className="text-red-500 text-xs mt-1 block">{errors.guests.message}</span>}
                        </div>

                        {/* Selección de Mesa */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Selecciona una Mesa
                            </label>
                            {loadingTables ? (
                                <div className="text-sm text-gray-500 py-2 flex items-center gap-2">
                                    <div className="animate-spin w-4 h-4 border-2 border-[--main-blue] border-t-transparent rounded-full"></div>
                                    Cargando mesas disponibles...
                                </div>
                            ) : tables.length === 0 ? (
                                <div className="text-sm text-red-500 py-2">
                                    Este restaurante no tiene mesas registradas actualmente.
                                </div>
                            ) : (
                                <>
                                    <select
                                        className={`w-full px-4 py-2 text-sm bg-gray-50 border ${errors.table ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[--main-blue] focus:bg-white outline-none transition-all`}
                                        {...register("table", { required: "Debes seleccionar una mesa" })}
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Seleccione una mesa...</option>
                                        {tables.map(table => (
                                            <option key={table._id} value={table._id}>
                                                Mesa {table.number} - Capacidad: {table.capacity} pers.
                                            </option>
                                        ))}
                                    </select>
                                    {errors.table && <span className="text-red-500 text-xs mt-1 block">{errors.table.message}</span>}
                                </>
                            )}
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 bg-gray-100 rounded-xl transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        form="reservation-form"
                        disabled={isSubmitting || loadingTables || tables.length === 0}
                        className="px-5 py-2 text-sm font-semibold text-white bg-[#004e89] hover:bg-[#2b323f] rounded-xl transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Confirmando...
                            </>
                        ) : "Confirmar Reserva"}
                    </button>
                </div>
            </div>
        </div>
    );
};
