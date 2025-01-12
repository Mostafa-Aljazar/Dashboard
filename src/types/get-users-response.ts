export interface GetUsersResponse {
    status:     number;
    success:    boolean;
    message:    string;
    data:       User[];
    pagination: Pagination;
}

export interface User {
    id:              number;
    name:            string;
    username:        string;
    email:           string;
    type:            string;
    plan:            Plan;
    plan_expired_at: Date;
    plan_settings:   PlanSettings;
    is_active:       number;
    created_at:      Date;
}

export interface Plan {
    id:      number;
    name:    string;
    name_en: string;
}

export interface PlanSettings {
    seo:                      boolean;
    fonts:                    boolean;
    file_size:                number;
    subscribe:                boolean;
    image_size:               number;
    video_size:               number;
    ai_bio_link:              boolean;
    products_limit:           number;
    qr_codes_limit:           number;
    bio_pages_limit:          number;
    bio_blocks_limit:         number;
    sensitive_content:        boolean;
    custom_backgrounds:       boolean;
    removable_branding:       boolean;
    advanced_statistics:      boolean;
    password_protection:      boolean;
    prioritize_schedule:      boolean;
    analytics_integrations:   boolean;
    custom_footer_branding:   boolean;
    customer_domains_limit:   number;
    links_statistics_limit:   number;
    enabled_bio_link_blocks:  { [key: string]: boolean };
    payment_processors_limit: number;
}

export interface Pagination {
    total:        number;
    per_page:     number;
    current_page: number;
    last_page:    number;
}
