export interface GetPlansResponse {
    status:     number;
    success:    boolean;
    message:    string;
    data:       Plan[];
    pagination: Pagination;
}

export interface Plan {
    id:             number;
    name:           string;
    description:    string;
    name_en:        string;
    description_en: null;
    monthly_price:  number;
    annual_price:   number;
    settings:       Settings;
    is_free:        number;
    is_active:      boolean;
    is_featured:    boolean;
    order:          number;
    created_at:     Date;
    updated_at:     Date;
    users_count:    number;
}

export interface Settings {
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
