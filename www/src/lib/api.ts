// API Client for SonicJS Backend
// Fetches content from the CMS

const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8788'

export interface Article {
  id: string
  data: {
    title: string
    slug: string
    excerpt?: string
    content: string
    featured_image?: string
    author: string
    published_at?: string
    status: 'draft' | 'published' | 'archived'
    tags?: string
  }
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  data: {
    title: string
    slug: string
    description?: string
    content: string
    featured_image?: string
    project_url?: string
    github_url?: string
    tech_stack?: string
    category: 'web-app' | 'api' | 'library' | 'tool' | 'experiment'
    is_featured: boolean
    published_at?: string
    status: 'draft' | 'published' | 'archived'
  }
  created_at: string
  updated_at: string
}

/**
 * Fetch all published articles
 */
export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${API_URL}/api/collections/blog_posts/content`)
    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`)
    }
    const data = await response.json()
    
    // Filter to published only and sort by date
    return (data.data || [])
      .filter((article: Article) => article.data?.status === 'published')
      .sort((a: Article, b: Article) => {
        const dateA = new Date(a.data?.published_at || a.created_at).getTime()
        const dateB = new Date(b.data?.published_at || b.created_at).getTime()
        return dateB - dateA
      })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

/**
 * Fetch a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const articles = await getArticles()
    return articles.find(article => article.data?.slug === slug) || null
  } catch (error) {
    console.error(`Error fetching article ${slug}:`, error)
    return null
  }
}

/**
 * Fetch all published projects
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_URL}/api/collections/projects/content`)
    if (!response.ok) {
      // If projects collection doesn't exist yet, return empty array gracefully
      if (response.status === 404) {
        console.warn('Projects collection not found - create it in the admin')
        return []
      }
      throw new Error(`Failed to fetch projects: ${response.statusText}`)
    }
    const data = await response.json()
    
    // Filter to published only and sort by date
    return (data.data || [])
      .filter((project: Project) => project.data?.status === 'published')
      .sort((a: Project, b: Project) => {
        const dateA = new Date(a.data?.published_at || a.created_at).getTime()
        const dateB = new Date(b.data?.published_at || b.created_at).getTime()
        return dateB - dateA
      })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

/**
 * Fetch featured projects for homepage
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await getProjects()
    return projects.filter(project => project.data?.is_featured === true).slice(0, 3)
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}

/**
 * Fetch a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projects = await getProjects()
    return projects.find(project => project.data?.slug === slug) || null
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error)
    return null
  }
}

/**
 * Format date for display
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Get excerpt from content
 */
export function getExcerpt(content: string, length: number = 150): string {
  const text = content.replace(/<[^>]*>/g, '') // Strip HTML
  return text.length > length ? text.substring(0, length) + '...' : text
}
