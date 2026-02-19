import { supabase } from '../lib/supabaseClient';
import { SERVICES, BRAND_COLORS } from '../constants';
import { JOURNAL_POSTS } from '../data/journalPosts';
import { COLLABORATIONS } from '../data/collaborations';

export const migrateData = async () => {
    console.log("🦅 Inizio Migrazione Dati...");
    const results = {
        services: 0,
        posts: 0,
        settings: 0,
        errors: [] as string[]
    };

    try {
        // 1. SERVICES
        console.log("... Migrating Services");
        const formattedServices = SERVICES.map((s, index) => ({
            title: s.title,
            category: s.category, // MANUAL, TOOLS, RITUAL
            description: s.description,
            duration: s.duration,
            price: s.price,
            image_url: s.imageUrl,
            active: true,
            order: index // Maintain order
        }));

        const { data: servicesData, error: servicesError } = await supabase
            .from('services')
            .insert(formattedServices)
            .select();

        if (servicesError) throw new Error(`Services Error: ${servicesError.message}`);
        results.services = servicesData.length;

        // 2. POSTS (Journal)
        console.log("... Migrating Journal");
        const formattedPosts = JOURNAL_POSTS.map(p => ({
            title: p.title,
            content: p.preview, // Using preview as content for now
            category: p.category,
            image_url: p.image,
            published: true
        }));

        const { data: postsData, error: postsError } = await supabase
            .from('posts')
            .insert(formattedPosts)
            .select();

        if (postsError) throw new Error(`Posts Error: ${postsError.message}`);
        results.posts = postsData.length;

        // 3. SITE SETTINGS
        console.log("... Migrating Settings");
        const settingsPayload = [
            { key: 'collaborations', value: JSON.stringify(COLLABORATIONS), description: 'Lista Collaborazioni' },
            { key: 'brand_colors', value: JSON.stringify(BRAND_COLORS), description: 'Palette Colori' },
            { key: 'contacts', value: JSON.stringify({ email: 'yuliolistico@gmail.com', phone: '320 198 26 29' }), description: 'Contatti Pubblici' }
        ];

        const { error: settingsError } = await supabase
            .from('site_settings')
            .upsert(settingsPayload);

        if (settingsError) throw new Error(`Settings Error: ${settingsError.message}`);
        results.settings = settingsPayload.length;

    } catch (error: any) {
        console.error("Migration Failed:", error);
        results.errors.push(error.message);
    }

    return results;
};
