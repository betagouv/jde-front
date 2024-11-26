import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

export enum AvailableLocales {
  EN = 'en',
  FR = 'fr',
}

export default getRequestConfig(async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || AvailableLocales.FR
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
