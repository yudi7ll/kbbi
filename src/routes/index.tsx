import { createResource, createSignal, For } from "solid-js";
import search from '../assets/icons/search.svg'

interface IResponse {
  data?: {
    lema: string
    arti: {
      deskripsi: string
      kelas_kata: string
    }[]
  }[]
  message: string
  status: boolean
}

const getByKeyword = async (keyword: string) => {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/cari/${keyword}`)
  return await result.json() as IResponse
}

export default function Home() {
  const [keyword, setKeyword] = createSignal('kata')
  const [data] = createResource(keyword, getByKeyword)

  return (
    <main>
      <div>
        <div class='relative'>
          <input class="rounded-lg bg-slate-200 text-gray-800 w-full px-4 py-3 border-gray-600 outline-0 transition"
            type="text"
            placeholder='Cari kata ...'
            value={keyword()}
            onChange={e => setKeyword(e.currentTarget.value)}
          />
          <img
            class="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4 w-6"
            src={search}
            alt="search icon"
          />
        </div>
      </div>
      <div>
        {!data()?.status ? (
          <p class="text-center mt-4 text-red-500 text-sm">{data()?.message}</p>
        ) : (
          <For each={data()?.data ?? []}>
            {(kbbi) => (
              <div>
                <h2 class="font-bold text-gray-800 text-5xl my-4">{kbbi.lema}</h2>
                <ol class='ml-4'>
                  <For each={kbbi.arti}>
                    {(arti, i) => (
                      <div class="flex space-x-1">
                        <p>{i() + 1}.</p>
                        <p>{arti.deskripsi}</p>
                      </div>
                    )}
                  </For>
                </ol>
              </div>
            )}
          </For>
        )}
      </div>
    </main>
  );
}
