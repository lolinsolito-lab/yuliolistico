import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Service, TreatmentType } from '../types';
import { SERVICES as FALLBACK_SERVICES } from '../constants'; // Fallback just in case

export const useServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('active', true)
                .order('order', { ascending: true });

            if (error) throw error;

            if (data && data.length > 0) {
                // Map Supabase snake_case to app camelCase
                const mappedServices: Service[] = data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    subtitle: item.subtitle,
                    category: item.category as TreatmentType,
                    description: item.description,
                    soul_description: item.soul_description,
                    benefits: item.benefits,
                    program_details: item.program_details,
                    duration: item.duration,
                    price: item.price,
                    imageUrl: item.image_url,
                    active: item.active
                }));
                setServices(mappedServices);
            } else {
                // If DB is empty, use fallback (during migration phase)
                console.warn("⚠️ No services found in DB. Using fallback.");
                setServices(FALLBACK_SERVICES);
            }
        } catch (err: any) {
            console.error('Error fetching services:', err);
            setError(err.message);
            // Fallback on error too? Maybe safer for now.
            setServices(FALLBACK_SERVICES);
        } finally {
            setLoading(false);
        }
    };

    return { services, loading, error, refetch: fetchServices };
};
