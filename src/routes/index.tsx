import { createResource, createSignal, For } from "solid-js";
import KelasKata from "~/components/KelasKata";
import SearchIcon from '../assets/icons/search.svg?component-solid'

interface IResponse {
  status: boolean
  message?: string
  data?: {
    kata: string
    data: {
      lema: string
      arti: {
        deskripsi: string
        kelasKata: string
      }[]
    }[]
  }
}

const getByKeyword = async (keyword: string) => {
  if (!keyword) return null
  const result = await fetch(`${import.meta.env.VITE_API_URL}/kbbi/${keyword}`)
  const json: IResponse = await result.json()
  return json
}

export default function Home() {
  const [keyword, setKeyword] = createSignal('bianglala')
  const [data] = createResource(keyword, getByKeyword)

  return (
    <main>
      < div >
        <div class='relative'>
          <input class="rounded-lg bg-slate-200 text-gray-800 w-full px-4 py-3 border-gray-600 outline-0 transition"
            type="text"
            placeholder='Cari kata ...'
            value={keyword()}
            onChange={e => setKeyword(e.currentTarget.value)}
          />
          <SearchIcon
            class="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4 w-6"
          />
        </div>
      </div >
      <div class="mt-6">
        {!data()?.status ? (
          <p class="text-center mt-4 text-red-500 text-sm">{data()?.message}</p>
        ) : (
          <For each={data()?.data?.data ?? []}>
            {(kbbi) => (
              <div>
                <h2 class="font-bold text-gray-800 text-4xl my-4">{kbbi.lema}</h2>
                <ol class='ml-4'>
                  <For each={kbbi.arti}>
                    {(arti, i) => (
                      <div class="flex space-x-1">
                        <p>{i() + 1}.</p>
                        <KelasKata kelasKata={arti.kelasKata} />
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
    </main >
  );
}
