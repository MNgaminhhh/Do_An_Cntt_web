import './globals.css'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { Inter } from 'next/font/google'
import { ThemeContextProvider } from '@/context/themeContext'
import ThemeProvider from '@/provider/ThemeProvider'
import AuthProvider from '@/provider/AuthProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Home',
  description: 'home page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
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
        </AuthProvider>
      </body>
    </html>
  )
}
