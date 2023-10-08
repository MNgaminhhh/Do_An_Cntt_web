import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeContextProvider } from '@/context/themeContext'
import ThemeProvider from '@/provider/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home',
  description: 'home page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeContextProvider>
          <ThemeProvider>
            <div className="container">
              <div className="wrapper">
                <Header></Header>
                  {children}
                <Footer></Footer>
              </div>
            </div>
          </ThemeProvider>
        </ThemeContextProvider>
      </body>
    </html>
  )
}
