import { z } from 'zod';

/**
 * Create Issue Validation schema
 */
export const createIssueSchema = z.object({
   title: z.string().min(1, 'Title is required.').max(255),
   description: z.string({ required_error: 'Description is required' }).min(5, 'Description must be at least 5 characters long.')
});
