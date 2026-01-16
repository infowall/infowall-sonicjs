-- Migration: Fix slug field options
-- Description: Update slug fields to include proper field_options JSON with type and format
-- Created: 2026-01-16

-- Update pages collection slug field to include field_options
UPDATE content_fields 
SET field_type = 'slug',
    field_options = json_set(
      COALESCE(field_options, '{}'),
      '$.type', 'slug',
      '$.format', 'slug'
    )
WHERE field_name = 'slug' 
  AND collection_id = 'pages-collection'
  AND (field_type = 'text' OR field_type = 'slug');

-- Update blog posts slug field if it exists
UPDATE content_fields 
SET field_type = 'slug',
    field_options = json_set(
      COALESCE(field_options, '{}'),
      '$.type', 'slug',
      '$.format', 'slug'
    )
WHERE field_name = 'slug' 
  AND collection_id = 'blog-posts-collection'
  AND (field_type = 'text' OR field_type = 'slug');

-- Update news slug field if it exists
UPDATE content_fields 
SET field_type = 'slug',
    field_options = json_set(
      COALESCE(field_options, '{}'),
      '$.type', 'slug',
      '$.format', 'slug'
    )
WHERE field_name = 'slug' 
  AND collection_id = 'news-collection'
  AND (field_type = 'text' OR field_type = 'slug');

-- Also add format to schema-based slug fields
UPDATE collections 
SET schema = json_set(
  schema,
  '$.properties.slug.format', 'slug'
)
WHERE (id = 'pages-collection' 
   OR id = 'blog-posts-collection' 
   OR id = 'news-collection')
  AND json_extract(schema, '$.properties.slug.type') = 'slug'
  AND json_extract(schema, '$.properties.slug.format') IS NULL;
