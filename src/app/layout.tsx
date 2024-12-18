import { DsfrHead } from '@codegouvfr/react-dsfr/next-appdir/DsfrHead'
import { DsfrProvider } from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider'
import { getHtmlAttributes } from '@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes'
import Link from 'next/link'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'

import { defaultColorScheme, StartDsfr } from '~/app/start-dsfr'
import { FooterComponent } from '~/components/ui/footer/footer'
import styles from './layout.module.css'
import { HeaderComponent } from '~/components/ui/header/header'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { TanstackQueryClientProvider } from '~/providers/tanstack-client'
import '~/globals.css'
import { NextAppDirEmotionCacheProvider } from 'tss-react/next'
export const generateMetadata = async () => {
  const t = await getTranslations('metadata')
  return {
    description: t('description'),
    title: t('title'),
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html {...getHtmlAttributes({ defaultColorScheme, lang: locale })}>
      <head>
        <StartDsfr />
        <DsfrHead Link={Link} preloadFonts={['Marianne-Regular', 'Marianne-Medium', 'Marianne-Bold']} />
      </head>
      <body>
        <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
          <NextIntlClientProvider messages={messages}>
            <DsfrProvider lang={locale}>
              <TanstackQueryClientProvider>
                <NuqsAdapter>
                  <HeaderComponent />
                  <main className={styles.container}>{children}</main>
                  <FooterComponent />
                </NuqsAdapter>
              </TanstackQueryClientProvider>
            </DsfrProvider>
          </NextIntlClientProvider>
        </NextAppDirEmotionCacheProvider>
      </body>
    </html>
  )
}
