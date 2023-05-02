// @refresh reload
import { Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import Logo from './assets/logo.svg?component-solid'

export default function Root() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";
  return (
    <Html lang="en">
      <Head>
        <Title>KBBI | Kamus Besar Bahasa Indonesia</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <div class="max-w-4xl mx-auto">
              <nav class="my-8 flex items-center justify-between">
                <div>
                  <a href="/">
                    <Logo class="w-12 h-auto" />
                  </a>
                </div>
                <div class="space-x-4 flex items-center">
                  <a class="font-bold text-gray-700" href="/register">Daftar</a>
                  <a class="font-bold text-gray-700" href="/login">Masuk</a>
                </div>
              </nav>
              <Routes>
                <FileRoutes />
              </Routes>
            </div>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
