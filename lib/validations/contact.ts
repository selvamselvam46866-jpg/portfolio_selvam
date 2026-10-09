import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, { message: 'Name must be at least 2 characters.' }).max(100, { message: 'Name cannot exceed 100 characters.' }),
  email: z.string().trim().email({ message: 'Please enter a valid email address.' }).max(150),
  subject: z.string().trim().min(3, { message: 'Subject must be at least 3 characters.' }).max(150),
  message: z.string().trim().min(10, { message: 'Message must be at least 10 characters.' }).max(3000, { message: 'Message cannot exceed 3000 characters.' }),
  // Honeypot field for bot spam protection - must remain empty
  company_website_trap: z.string().max(0, { message: 'Spam detected.' }).optional().or(z.literal('')),
});

export type ContactFormData = z.infer<typeof contactSchema>;
