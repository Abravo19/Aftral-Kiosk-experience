export type Locale = 'fr' | 'en';

type TranslationKeys = {
    // Navigation
    'nav.home': string;
    'nav.training': string;
    'nav.news': string;
    'nav.agenda': string;
    'nav.back': string;
    'nav.contact': string;
    'nav.receive_info': string;

    // Home
    'home.welcome': string;
    'home.welcome_aftral': string;
    'home.subtitle': string;
    'home.this_week': string;
    'home.see_all': string;
    'home.job_sheets': string;
    'home.job_sheets_desc': string;
    'home.discover': string;
    'home.quiz': string;
    'home.quiz_desc': string;
    'home.start': string;
    'home.special_offer': string;
    'home.featured': string;

    // Profiles
    'profile.student': string;
    'profile.student_desc': string;
    'profile.parent': string;
    'profile.parent_desc': string;
    'profile.employee': string;
    'profile.employee_desc': string;
    'profile.company': string;
    'profile.company_desc': string;

    // Catalog
    'catalog.title': string;
    'catalog.profile': string;
    'catalog.full_catalog': string;
    'catalog.all': string;
    'catalog.view_program': string;
    'catalog.special_offer': string;
    'catalog.see_offer': string;
    'catalog.certifying': string;

    // Events
    'events.title': string;
    'events.subtitle': string;
    'events.register': string;
    'events.share': string;
    'events.no_events': string;

    // Contact
    'contact.title': string;
    'contact.subtitle': string;
    'contact.name': string;
    'contact.name_placeholder': string;
    'contact.phone': string;
    'contact.phone_placeholder': string;
    'contact.subject': string;
    'contact.send': string;
    'contact.sent_title': string;
    'contact.sent_desc': string;
    'contact.new_request': string;

    // Job Sheets
    'jobs.title': string;
    'jobs.subtitle': string;
    'jobs.back_to_list': string;
    'jobs.missions': string;
    'jobs.skills': string;
    'jobs.training_paths': string;
    'jobs.not_found': string;
    'jobs.not_found_desc': string;

    // Map
    'map.title': string;
    'map.subtitle': string;
    'map.you_are_here': string;
    'map.close': string;
    'map.walking_time': string;

    // QR
    'qr.scan_phone': string;
    'qr.scan_save': string;
    'qr.share': string;

    // Screensaver
    'screensaver.touch': string;

    // Help
    'help.need_help': string;
    'help.agent_notified': string;
    'help.agent_coming': string;

    // Accessibility
    'a11y.font_size': string;
    'a11y.high_contrast': string;

    // Common
    'common.loading': string;
    'common.error': string;
    'common.close': string;
};

type Translations = Record<Locale, TranslationKeys>;

export const translations: Translations = {
    fr: {
        'nav.home': 'Accueil',
        'nav.training': 'Formation',
        'nav.news': 'Actus',
        'nav.agenda': 'Agenda',
        'nav.back': 'Retour',
        'nav.contact': 'Contact',
        'nav.receive_info': 'Recevoir\nInfos',

        'home.welcome': 'Bienvenue chez',
        'home.welcome_aftral': 'AFTRAL',
        'home.subtitle': 'Touchez votre profil pour commencer l\'expérience',
        'home.this_week': 'Cette semaine',
        'home.see_all': 'Voir tout',
        'home.job_sheets': 'Fiches Métiers',
        'home.job_sheets_desc': 'Missions et salaires du secteur.',
        'home.discover': 'Découvrir',
        'home.quiz': 'Quiz Orientation',
        'home.quiz_desc': 'Faites le test en 2 min.',
        'home.start': 'Commencer',
        'home.special_offer': 'Offre Spéciale',
        'home.featured': 'À la une',

        'profile.student': 'Étudiant / Alternant',
        'profile.student_desc': 'Je cherche une formation',
        'profile.parent': 'Parent',
        'profile.parent_desc': 'Pour l\'avenir de mon enfant',
        'profile.employee': 'Salarié / Reconversion',
        'profile.employee_desc': 'Je veux évoluer',
        'profile.company': 'Entreprise',
        'profile.company_desc': 'Former mes équipes',

        'catalog.title': 'Nos Formations',
        'catalog.profile': 'Profil',
        'catalog.full_catalog': 'Catalogue complet',
        'catalog.all': 'Tout',
        'catalog.view_program': 'Voir le programme',
        'catalog.special_offer': 'Offre Spéciale',
        'catalog.see_offer': 'Voir l\'offre',
        'catalog.certifying': 'Certifiant',

        'events.title': 'Agenda',
        'events.subtitle': 'Prochains événements et job datings',
        'events.register': 'S\'inscrire',
        'events.share': 'Partager',
        'events.no_events': 'Aucun événement cette semaine',

        'contact.title': 'Être rappelé',
        'contact.subtitle': 'Laissez vos coordonnées, nous vous contactons rapidement.',
        'contact.name': 'Votre Nom',
        'contact.name_placeholder': 'Ex: Jean Dupont',
        'contact.phone': 'Numéro de téléphone',
        'contact.phone_placeholder': '06 12 34 56 78',
        'contact.subject': 'Sujet',
        'contact.send': 'Envoyer',
        'contact.sent_title': 'Demande enregistrée !',
        'contact.sent_desc': 'Un conseiller AFTRAL vous rappellera sous 24h.',
        'contact.new_request': 'Nouvelle demande',

        'jobs.title': 'Fiches Métiers',
        'jobs.subtitle': 'Découvrez les opportunités du secteur Transport & Logistique.',
        'jobs.back_to_list': 'Retour à la liste',
        'jobs.missions': 'Missions principales',
        'jobs.skills': 'Compétences clés',
        'jobs.training_paths': 'Formations AFTRAL',
        'jobs.not_found': 'Vous ne trouvez pas votre métier ?',
        'jobs.not_found_desc': 'Nos conseillers sont là pour vous guider.',

        'map.title': 'Plan du Centre',
        'map.subtitle': 'Touchez une zone pour voir les détails.',
        'map.you_are_here': 'Vous êtes ici (Accueil)',
        'map.close': 'Fermer',
        'map.walking_time': 'min à pied',

        'qr.scan_phone': 'Scannez avec votre téléphone',
        'qr.scan_save': 'Scannez pour enregistrer cette information',
        'qr.share': 'Partager',

        'screensaver.touch': 'Toucher l\'écran pour commencer',

        'help.need_help': 'Besoin d\'aide ?',
        'help.agent_notified': 'Un agent a été notifié',
        'help.agent_coming': 'Il arrive sous peu. Merci de patienter.',

        'a11y.font_size': 'Taille du texte',
        'a11y.high_contrast': 'Contraste élevé',

        'common.loading': 'Chargement...',
        'common.error': 'Erreur',
        'common.close': 'Fermer',
    },
    en: {
        'nav.home': 'Home',
        'nav.training': 'Training',
        'nav.news': 'News',
        'nav.agenda': 'Events',
        'nav.back': 'Back',
        'nav.contact': 'Contact',
        'nav.receive_info': 'Get\nInfo',

        'home.welcome': 'Welcome to',
        'home.welcome_aftral': 'AFTRAL',
        'home.subtitle': 'Tap your profile to start the experience',
        'home.this_week': 'This week',
        'home.see_all': 'See all',
        'home.job_sheets': 'Career Profiles',
        'home.job_sheets_desc': 'Explore careers in Transport & Logistics.',
        'home.discover': 'Explore',
        'home.quiz': 'Career Quiz',
        'home.quiz_desc': 'Take the 2-minute quiz.',
        'home.start': 'Start',
        'home.special_offer': 'Special Offer',
        'home.featured': 'Featured',

        'profile.student': 'Student / Apprentice',
        'profile.student_desc': 'I\'m looking for training',
        'profile.parent': 'Parent',
        'profile.parent_desc': 'For my child\'s future',
        'profile.employee': 'Employee / Career Change',
        'profile.employee_desc': 'I want to grow',
        'profile.company': 'Company',
        'profile.company_desc': 'Train my teams',

        'catalog.title': 'Our Programs',
        'catalog.profile': 'Profile',
        'catalog.full_catalog': 'Full catalog',
        'catalog.all': 'All',
        'catalog.view_program': 'View program',
        'catalog.special_offer': 'Special Offer',
        'catalog.see_offer': 'See offer',
        'catalog.certifying': 'Certified',

        'events.title': 'Events',
        'events.subtitle': 'Upcoming events and job fairs',
        'events.register': 'Register',
        'events.share': 'Share',
        'events.no_events': 'No events this week',

        'contact.title': 'Request a call',
        'contact.subtitle': 'Leave your details and we\'ll contact you shortly.',
        'contact.name': 'Your Name',
        'contact.name_placeholder': 'e.g. John Smith',
        'contact.phone': 'Phone number',
        'contact.phone_placeholder': '+33 6 12 34 56 78',
        'contact.subject': 'Subject',
        'contact.send': 'Send',
        'contact.sent_title': 'Request submitted!',
        'contact.sent_desc': 'An AFTRAL advisor will call you within 24h.',
        'contact.new_request': 'New request',

        'jobs.title': 'Career Profiles',
        'jobs.subtitle': 'Discover opportunities in Transport & Logistics.',
        'jobs.back_to_list': 'Back to list',
        'jobs.missions': 'Key responsibilities',
        'jobs.skills': 'Core skills',
        'jobs.training_paths': 'AFTRAL Programs',
        'jobs.not_found': 'Can\'t find your career?',
        'jobs.not_found_desc': 'Our advisors are here to help.',

        'map.title': 'Center Map',
        'map.subtitle': 'Tap a zone for details.',
        'map.you_are_here': 'You are here (Reception)',
        'map.close': 'Close',
        'map.walking_time': 'min walk',

        'qr.scan_phone': 'Scan with your phone',
        'qr.scan_save': 'Scan to save this information',
        'qr.share': 'Share',

        'screensaver.touch': 'Touch the screen to start',

        'help.need_help': 'Need help?',
        'help.agent_notified': 'An agent has been notified',
        'help.agent_coming': 'They will be with you shortly. Please wait.',

        'a11y.font_size': 'Text size',
        'a11y.high_contrast': 'High contrast',

        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.close': 'Close',
    },
};

export type TranslationKey = keyof TranslationKeys;
