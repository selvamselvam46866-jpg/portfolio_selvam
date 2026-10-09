'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Helper to assert current user is authorized admin
async function assertAdmin() {
  const supabase = await createServerSupabaseClient();
  const adminEmail = process.env.ADMIN_EMAIL || 'selvamselvam46866@gmail.com';

  if (!supabase) {
    throw new Error('Supabase is not configured yet. Please configure your environment variables.');
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Unauthorized: Authentication required.');
  }

  if (user.email !== adminEmail) {
    throw new Error('Forbidden: You are not authorized as the administrator.');
  }

  return { supabase, user };
}

// 1. PROFILE
export async function updateProfile(profileData: any) {
  const { supabase } = await assertAdmin();
  const { error } = await supabase
    .from('profiles')
    .update({
      ...profileData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', profileData.id);

  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/profile');
  return { success: true };
}

// 2. PROJECTS
export async function upsertProject(projectData: any) {
  const { supabase } = await assertAdmin();
  const isUpdate = Boolean(projectData.id);

  const payload = {
    ...projectData,
    updated_at: new Date().toISOString(),
  };

  const { error } = isUpdate
    ? await supabase.from('projects').update(payload).eq('id', projectData.id)
    : await supabase.from('projects').insert([payload]);

  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/projects');
  return { success: true };
}

export async function deleteProject(id: string) {
  const { supabase } = await assertAdmin();
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/projects');
  return { success: true };
}

// 3. SKILLS
export async function upsertSkillGroup(groupData: any) {
  const { supabase } = await assertAdmin();
  const isUpdate = Boolean(groupData.id);

  const { error } = isUpdate
    ? await supabase.from('skill_groups').update(groupData).eq('id', groupData.id)
    : await supabase.from('skill_groups').insert([groupData]);

  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/skills');
  return { success: true };
}

export async function deleteSkillGroup(id: string) {
  const { supabase } = await assertAdmin();
  const { error } = await supabase.from('skill_groups').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/skills');
  return { success: true };
}

export async function upsertSkill(skillData: any) {
  const { supabase } = await assertAdmin();
  const isUpdate = Boolean(skillData.id);

  const { error } = isUpdate
    ? await supabase.from('skills').update(skillData).eq('id', skillData.id)
    : await supabase.from('skills').insert([skillData]);

  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/skills');
  return { success: true };
}

export async function deleteSkill(id: string) {
  const { supabase } = await assertAdmin();
  const { error } = await supabase.from('skills').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/skills');
  return { success: true };
}

// 4. EXPERIENCES
export async function upsertExperience(experienceData: any) {
  const { supabase } = await assertAdmin();
  const isUpdate = Boolean(experienceData.id);

  const { error } = isUpdate
    ? await supabase.from('experiences').update(experienceData).eq('id', experienceData.id)
    : await supabase.from('experiences').insert([experienceData]);

  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/experience');
  return { success: true };
}

export async function deleteExperience(id: string) {
  const { supabase } = await assertAdmin();
  const { error } = await supabase.from('experiences').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/experience');
  return { success: true };
}

// 5. EDUCATION
export async function upsertEducation(educationData: any) {
  const { supabase } = await assertAdmin();
  const isUpdate = Boolean(educationData.id);

  const { error } = isUpdate
    ? await supabase.from('education').update(educationData).eq('id', educationData.id)
    : await supabase.from('education').insert([educationData]);

  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/education');
  return { success: true };
}

export async function deleteEducation(id: string) {
  const { supabase } = await assertAdmin();
  const { error } = await supabase.from('education').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/education');
  return { success: true };
}

// 6. CERTIFICATIONS
export async function upsertCertification(certData: any) {
  const { supabase } = await assertAdmin();
  const isUpdate = Boolean(certData.id);

  const { error } = isUpdate
    ? await supabase.from('certifications').update(certData).eq('id', certData.id)
    : await supabase.from('certifications').insert([certData]);

  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/certifications');
  return { success: true };
}

export async function deleteCertification(id: string) {
  const { supabase } = await assertAdmin();
  const { error } = await supabase.from('certifications').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/certifications');
  return { success: true };
}

// 7. HOBBIES
export async function upsertHobby(hobbyData: any) {
  const { supabase } = await assertAdmin();
  const isUpdate = Boolean(hobbyData.id);

  const { error } = isUpdate
    ? await supabase.from('hobbies').update(hobbyData).eq('id', hobbyData.id)
    : await supabase.from('hobbies').insert([hobbyData]);

  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/hobbies');
  return { success: true };
}

export async function deleteHobby(id: string) {
  const { supabase } = await assertAdmin();
  const { error } = await supabase.from('hobbies').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/hobbies');
  return { success: true };
}

// 8. SITE SETTINGS
export async function updateSiteSettings(settingsData: any) {
  const { supabase } = await assertAdmin();
  const { error } = await supabase
    .from('site_settings')
    .update({
      ...settingsData,
      updated_at: new Date().toISOString(),
    })
    .eq('id', settingsData.id);

  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin/settings');
  return { success: true };
}

// 9. MESSAGES
export async function markMessageRead(id: string, isRead: boolean) {
  const { supabase } = await assertAdmin();
  const { error } = await supabase.from('messages').update({ is_read: isRead }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/messages');
  return { success: true };
}

export async function deleteMessage(id: string) {
  const { supabase } = await assertAdmin();
  const { error } = await supabase.from('messages').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/messages');
  return { success: true };
}
