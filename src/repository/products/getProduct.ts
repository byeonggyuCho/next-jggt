import { SupabaseClient } from '@supabase/supabase-js'
import camelcaseKeys from 'camelcase-keys'

import { Product } from '@/types'

export async function getProduct(
  supabase: SupabaseClient,
  id: string,
): Promise<{
  data: Product
}> {
  if (process.env.USE_MOCK_DATA === 'true') {
    const { getMockProductData } = await import('@/utils/mock')
    const data: Product = getMockProductData({ id })
    return { data }
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single()

  if (error) {
    throw error
  }

  return { data: camelcaseKeys(data, { deep: true }) }
}
