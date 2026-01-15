-- Migration: Fix pages collection slug field type
-- Description: Update the pages collection slug field from 'text' to 'slug' type
-- This allows the slug field to be properly recognized and edited in the admin UI
-- Created: 2026-01-13

-- Update the pages collection slug field type from 'text' to 'slug'
UPDATE content_fields 
SET field_type = 'slug',
    field_options = json_set(
      COALESCE(field_options, '{}'),
      '$.type', 'slug',
      '$.format', 'slug'
    )
WHERE field_name = 'slug' 
  AND collection_id = 'pages-collection'
  AND field_type = 'text';
