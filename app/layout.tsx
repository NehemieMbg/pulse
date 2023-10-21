import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Navbar from './components/navbar/Navbar';
import ReduxProvider from './provider/Provider';
import Backdrop from './components/ui/Backdrop/Backdrop';
import BottomNavigation from './components/bottom-navigation/BottomNavigation';
import AuthProvider from './context/AuthContext';
import NewPost from './components/new_post/NewPost/NewPost';

const roboto = Roboto({
  weight: '300',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Home / Pulse',
  description: 'Home',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <ReduxProvider>
          <body className={roboto.className}>
            <header>
              <Navbar />
              <Backdrop />
            </header>
            <main>
              <NewPost />

              {children}
            </main>
            <footer>
              <BottomNavigation />
            </footer>
          </body>
        </ReduxProvider>
      </AuthProvider>
    </html>
  );
}
