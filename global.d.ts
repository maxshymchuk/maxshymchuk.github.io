type Nullable<T> = T | null;

type ValueOf<T> = T[keyof T];

type Person = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: Nullable<string>;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
};

type User = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: Nullable<string>;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: Nullable<string>;
    company: Nullable<string>;
    blog: Nullable<string>;
    location: Nullable<string>;
    email: Nullable<string>;
    hireable: Nullable<boolean>;
    bio: Nullable<string>;
    twitter_username: Nullable<string>;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
};

type Repo = {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: Person;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url: Nullable<string>;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: Nullable<string>;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: Array<string>;
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
};

type Asset = {
    url: string;
    id: number;
    node_id: string;
    name: string;
    label: Nullable<string>;
    uploader: Person;
    content_type: string;
    state: string;
    size: number;
    download_count: number;
    created_at: string;
    updated_at: string;
    browser_download_url: string;
};

type Release = {
    url: string;
    assets_url: string;
    upload_url: string;
    html_url: string;
    id: number;
    author: Person;
    node_id: string;
    tag_name: string;
    target_commitish: string;
    name: string;
    draft: boolean;
    prerelease: boolean;
    created_at: string;
    published_at: string;
    assets: Array<Asset>;
    tarball_url: string;
    zipball_url: string;
    body: string;
};

type GitFile = {
    filename: string;
    type: string;
    language: string;
    raw_url: string;
    size: number;
    truncated: boolean;
    content: string;
};

type HistoryItem = {
    user: Person;
    version: string;
    committed_at: string;
    change_status: {
        total: number;
        additions: number;
        deletions: number;
    };
    url: string;
};

type Gist = {
    url: string;
    forks_url: string;
    commits_url: string;
    id: string;
    node_id: string;
    git_pull_url: string;
    git_push_url: string;
    html_url: string;
    files: { [key: string]: GitFile };
    public: boolean;
    created_at: string;
    updated_at: string;
    description: string;
    comments: number;
    user: Nullable<Person>;
    comments_url: string;
    owner: Person;
    forks: Array<unknown>;
    history: Array<HistoryItem>;
    truncated: boolean;
};

type Meta = {
    timestamp: number;
    snapshot: string;
};

type MappedRepo = {
    name: string;
    description: string;
    stars: number;
    site: Nullable<string>;
    release: Nullable<string>;
    page: string;
    topics: Array<string>;
    archived: boolean;
};

type MappedUser = {
    login: string;
    name: Nullable<string>;
    bio: Nullable<string>;
    repos_url: string;
};

type Links = 'github' | 'linkedin' | 'telegram' | 'notion' | 'email';

type Custom = {
    links: Partial<Record<Links, string>>;
};

type UserData = {
    user: MappedUser;
    repositories: Array<MappedRepo>;
    custom: Custom;
};

type Data = {
    meta: Meta;
    data: UserData;
};
